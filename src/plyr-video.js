const allPlayers = [];
const lazyVideos = new Map();

const videoModes = {
  preview: {
    muted: true,
    clickToPlay: false,
    showOverlay: true,
    controls: ['play', 'progress', 'mute'],
    hideControls: true,
  },
  direct: {
    muted: false,
    clickToPlay: true,
    showOverlay: false,
    controls: ['play', 'progress', 'mute', 'fullscreen'],
    hideControls: false,
  },
  silent: {
    muted: true,
    clickToPlay: true,
    showOverlay: false,
    controls: ['play', 'progress'],
    hideControls: false,
  },
};

// Public API
window.VideoSystem = {
  init: initVideos,
  initSwiper: initSwiperVideos,
  playActiveSlide: playActiveSlideVideo,
  pauseAll: pauseAllVideos,
  modes: videoModes,
  preload: preloadVideo,
};

// Main initialization function
function initVideos(selector = '.plyr_video', mode = 'preview', lazy = true) {
  if (lazy) {
    setupLazyLoading(selector, mode);
  } else {
    $(selector).each(function () {
      initSingleVideo($(this), mode);
    });
  }
}

// Lazy loading setup with intersection observer
function setupLazyLoading(selector, mode) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const $video = $(entry.target);
          const storedMode = lazyVideos.get(entry.target) || mode;
          initSingleVideo($video, storedMode);
          observer.unobserve(entry.target);
          lazyVideos.delete(entry.target);
        }
      });
    },
    { rootMargin: '100px', threshold: 0.1 }
  );

  $(selector).each(function () {
    if (!$(this).data('plyr-initialized')) {
      const customMode = $(this).parent().attr('data-video-mode') || mode;
      lazyVideos.set(this, customMode);
      observer.observe(this);
    }
  });
}

// Preload specific video
function preloadVideo(selector, mode = 'preview') {
  const $video = $(selector);
  if ($video.length && !$video.data('plyr-initialized')) {
    initSingleVideo($video, mode);
  }
}

// Set video attributes from data attributes
function setupVideoAttributes($video) {
  if ($video.data('attrs-set')) return;

  const $parent = $video.parent();
  const videoSrc = $parent.attr('data-video-src');
  const posterSrc = $parent.attr('data-poster-src');

  if (posterSrc) $video.attr('poster', posterSrc);
  if (videoSrc) $video.attr('src', videoSrc);
  $video.attr('preload', 'metadata');
  $video.data('attrs-set', true);
}

// Initialize single video player
function initSingleVideo($video, mode = 'preview') {
  if ($video.data('plyr-initialized')) return;

  setupVideoAttributes($video);

  const $parent = $video.parent();
  const customMode = $parent.attr('data-video-mode') || mode;
  const config = videoModes[customMode] || videoModes.preview;

  const player = new Plyr($video[0], {
    controls: config.controls,
    clickToPlay: config.clickToPlay,
    muted: config.muted,
    resetOnEnd: true,
  });

  player.on('ready', () => {
    player.muted = config.muted;
    if (config.hideControls) {
      $parent.find('.plyr__controls').hide();
    }
  });

  allPlayers.push(player);
  $video.data('plyr-initialized', true);
  $video.data('video-mode', customMode);

  initControls($parent, player, config);
}

// Initialize videos in Swiper slides
function initSwiperVideos(swiperInstance, mode = 'preview', lazy = true, autoPlayActive = false) {
  if (lazy) {
    setupSwiperLazyLoading(swiperInstance, mode, autoPlayActive);
  } else {
    // Load all videos immediately
    $(swiperInstance.slides)
      .find('.plyr_video')
      .each(function () {
        setupVideoAttributes($(this));
        initSingleVideo($(this), mode);
      });
  }
}

// Setup lazy loading for Swiper videos
function setupSwiperLazyLoading(swiperInstance, mode, autoPlayActive) {
  const loadSlideVideo = ($slide) => {
    if (!$slide.length) return;
    const $video = $slide.find('.plyr_video');
    if ($video.length && !$video.data('plyr-initialized')) {
      setupVideoAttributes($video);
      preloadVideo($video, mode);
    }
  };

  const playActiveSlidePreview = (swiper) => {
    if (!autoPlayActive) return;

    console.log(swiper);

    const activeSlide = $(swiper.slides[swiper.activeIndex]);
    const $video = activeSlide.find('.plyr_video');

    if ($video.length) {
      handleVideoPlayback($video, mode);
    }
  };

  // Swiper event handlers
  swiperInstance.on('slideChange', function () {
    const activeSlide = $(this.slides[this.activeIndex]);
    const nextSlide = $(this.slides[this.activeIndex + 1]);
    const prevSlide = $(this.slides[this.activeIndex - 1]);

    [activeSlide, nextSlide, prevSlide].forEach(loadSlideVideo);

    if (autoPlayActive) {
      playActiveSlidePreview(this);
    }
  });

  swiperInstance.on('afterInit', function () {
    // Setup video attributes for all slides
    $(this.slides).each(function () {
      const $video = $(this).find('.plyr_video');
      if ($video.length) {
        setupVideoAttributes($video);
      }
    });

    // Preload first slide video
    const $firstSlideVideo = $(this.slides[this.activeIndex]).find('.plyr_video');
    if ($firstSlideVideo.length) {
      preloadVideo($firstSlideVideo, mode);
    }

    playActiveSlidePreview(this);
  });

  // Handle already initialized swiper
  if (swiperInstance.initialized) {
    $(swiperInstance.slides).each(function () {
      const $video = $(this).find('.plyr_video');
      if ($video.length) {
        setupVideoAttributes($video);
      }
    });

    const $firstSlideVideo = $(swiperInstance.slides[swiperInstance.activeIndex]).find(
      '.plyr_video'
    );
    if ($firstSlideVideo.length) {
      preloadVideo($firstSlideVideo, mode);
    }

    playActiveSlidePreview(swiperInstance);
  }
}

// Handle video playback with proper initialization
function handleVideoPlayback($video, mode) {
  if (!$video.data('plyr-initialized')) {
    setupVideoAttributes($video);
    preloadVideo($video, mode);

    const checkPlayerReady = (attempts = 0) => {
      if (attempts > 20) return;

      const player = allPlayers.find((p) => p.media === $video[0]);
      if (player && player.ready) {
        if (mode === 'preview') {
          pauseAllVideos();
          player.muted = true;
          player.play().catch(() => {});
        }
      } else {
        setTimeout(() => checkPlayerReady(attempts + 1), 50);
      }
    };

    setTimeout(() => checkPlayerReady(), 200);
  } else {
    const player = allPlayers.find((p) => p.media === $video[0]);
    if (player && mode === 'preview') {
      pauseAllVideos($video);
      player.muted = true;
      player.play().catch(() => {});
    }
  }
}

// Play video in full mode (unmuted)
function playFullVideo(player) {
  player.muted = false;
  player.restart();
  player.play();
}

// Initialize video controls and interactions
function initControls($parent, player, config) {
  const component = $parent.closest('[data-plyr="component"]');
  const overlay = component.find('[data-plyr="overlay"]');

  if (!config.showOverlay) {
    overlay.hide();
    return;
  }

  // Overlay click handler
  overlay.on('click', function () {
    overlay.hide();
    playFullVideo(player);
    $parent.find('.plyr__controls').show();
  });

  // Hover play functionality
  if (component.attr('data-plyr-play') === 'hover') {
    component.on('mouseenter', function () {
      player.play();
      if (config.showOverlay) overlay.hide();
      player.muted = true;
      $parent.find('.plyr__controls').show();
    });

    component.on('mouseleave', function () {
      player.pause();
      if (config.showOverlay) overlay.show();
      player.restart();
      player.muted = true;
      if (config.hideControls) {
        $parent.find('.plyr__controls').hide();
      }
    });
  }

  // Click to play/pause (excluding controls and overlay)
  $parent.on('click', function (e) {
    if (
      !$(e.target).closest('.plyr__controls').length &&
      !$(e.target).closest('[data-plyr="overlay"]').length
    ) {
      if (player.playing) {
        player.pause();
      } else {
        player.play();
      }
    }
  });
}

// Pause all videos with optional context
function pauseAllVideos(context = null, excludePreview = false) {
  if (context) {
    const $section = $(context).closest('section');
    const sectionPlayers = [];

    $section.find('.plyr_video').each(function () {
      if ($(this).data('plyr-initialized')) {
        const player = allPlayers.find((p) => p.media === this);
        if (player) {
          const videoMode = $(this).data('video-mode');
          if (!excludePreview || videoMode !== 'preview') {
            sectionPlayers.push(player);
          }
        }
      }
    });

    sectionPlayers.forEach((player) => {
      player.pause();
      player.restart();
      player.muted = true;
    });

    if (!excludePreview) {
      $section.find('[data-plyr="overlay"]').show();
      $section.find('.plyr__controls').hide();
    }
  } else {
    allPlayers.forEach((player) => {
      const $video = $(player.media);
      const videoMode = $video.data('video-mode');

      if (!excludePreview || videoMode !== 'preview') {
        player.pause();
        player.restart();
        player.muted = true;
      }
    });

    if (!excludePreview) {
      $('[data-plyr="overlay"]').show();
      $('.plyr__controls').hide();
    }
  }
}

// Play video in active slide
function playActiveSlideVideo(activeSlide, state) {
  const $video = $(activeSlide).find('.plyr_video').first();
  if (!$video.length) return;

  // Initialize video if not already done
  if (!$video.data('plyr-initialized')) {
    const mode = $video.parent().attr('data-video-mode') || 'preview';
    initSingleVideo($video, mode);
  }

  const player = allPlayers.find((p) => p.media === $video[0]);
  if (!player) return;

  pauseAllVideos(activeSlide);
  player.play();

  // If state is true, play in full mode
  if (state) {
    playFullVideo(player);
    $(activeSlide).find('.plyr__controls').show();
  }
}

// Auto-initialize on document ready
$(document).ready(() => initVideos());
