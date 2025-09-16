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

const playStates = {
  STOPPED: 'stopped',
  PREVIEW: 'preview',
  FULL: 'full',
};

window.VideoSystem = {
  init: initVideos,
  initSwiper: initSwiperVideos,
  playPreview: playVideoPreview,
  playFull: playVideoFull,
  pauseSingle: pauseSingleVideo,
  pauseAll: pauseAllVideos,
  modes: videoModes,
  preload: preloadVideo,
};

function initVideos(selector = '.plyr_video', mode = 'preview', lazy = true) {
  if (lazy) {
    setupLazyLoading(selector, mode);
  } else {
    $(selector).each(function () {
      initSingleVideo($(this), mode);
    });
  }
}

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

function preloadVideo(selector, mode = 'preview') {
  const $video = $(selector);
  if ($video.length && !$video.data('plyr-initialized')) {
    initSingleVideo($video, mode);
  }
}

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
    hideControls: false,
  });

  player.on('ready', () => {
    player.muted = config.muted;
    if (config.hideControls) {
      $parent.find('.plyr__controls').hide();
    }
  });

  player.on('play', () => {
    const playState = $video.data('play-state');
    if (playState === playStates.FULL) {
      pauseAllVideos($video);
    }
  });

  player.on('ended', () => {
    $video.removeAttr('data-user-controlled');
    $video.data('play-state', playStates.STOPPED);

    const $parent = $video.parent();
    const component = $parent.closest('[data-plyr="component"]');
    const overlay = component.find('[data-plyr="overlay"]');
    overlay.show();
    $parent.find('.plyr__controls').hide();
  });

  allPlayers.push(player);
  $video.data('plyr-initialized', true);
  $video.data('video-mode', customMode);
  $video.data('play-state', playStates.STOPPED);

  initControls($parent, player, config);
}

function initControls($parent, player, config) {
  const component = $parent.closest('[data-plyr="component"]');
  const overlay = component.find('[data-plyr="overlay"]');

  if (!config.showOverlay) {
    overlay.hide();
    return;
  }

  overlay.on('click', function () {
    const $video = $parent.find('.plyr_video');

    // Set states first
    pauseAllVideos($video);
    $video.data('play-state', playStates.FULL);
    $video.attr('data-user-controlled', 'true');

    // Hide overlay and show controls immediately
    overlay.hide();
    $parent.find('.plyr__controls').show();

    // Play the video
    player.muted = false;
    player.restart();
    player.play();
  });

  $parent.on('click', function (e) {
    if (
      !$(e.target).closest('.plyr__controls').length &&
      !$(e.target).closest('[data-plyr="overlay"]').length
    ) {
      const $video = $parent.find('.plyr_video');
      const playState = $video.data('play-state');

      if (playState === playStates.FULL) {
        if (player.playing) {
          player.pause();
        } else {
          player.play();
        }
      }
    }
  });
}

function playVideoPreview($video) {
  if ($video.attr('data-user-controlled') === 'true') return;

  if (!$video.data('plyr-initialized')) {
    const mode = $video.parent().attr('data-video-mode') || 'preview';
    initSingleVideo($video, mode);
  }

  const player = allPlayers.find((p) => p.media === $video[0]);
  if (player) {
    $video.data('play-state', playStates.PREVIEW);
    player.muted = true;
    player.play().catch(() => {});
  }
}

function playVideoFull($video) {
  if (!$video.data('plyr-initialized')) {
    const mode = $video.parent().attr('data-video-mode') || 'preview';
    initSingleVideo($video, mode);
  }

  const player = allPlayers.find((p) => p.media === $video[0]);
  if (player) {
    const $parent = $video.closest('.plyr');
    const component = $parent.closest('[data-plyr="component"]');
    const overlay = component.find('[data-plyr="overlay"]');

    pauseAllVideos($video);
    $video.data('play-state', playStates.FULL);
    $video.attr('data-user-controlled', 'true');

    overlay.hide();
    $parent.find('.plyr__controls').show();

    player.muted = false;
    player.restart();
    player.play();
  }
}

function pauseSingleVideo($video) {
  if ($video.attr('data-user-controlled') === 'true') return;

  const player = allPlayers.find((p) => p.media === $video[0]);
  if (player) {
    const playState = $video.data('play-state');

    if (playState === playStates.PREVIEW) {
      player.pause();
      player.restart();
      $video.data('play-state', playStates.STOPPED);

      const $parent = $video.parent();
      const component = $parent.closest('[data-plyr="component"]');
      const overlay = component.find('[data-plyr="overlay"]');
      overlay.show();
    }
  }
}

function pauseAllVideos(excludeVideo = null) {
  allPlayers.forEach((player) => {
    const $video = $(player.media);

    if (excludeVideo && $video[0] === excludeVideo[0]) return;

    const playState = $video.data('play-state');

    if (playState === playStates.PREVIEW || playState === playStates.FULL) {
      player.pause();
      player.restart();
      player.muted = true;
      $video.data('play-state', playStates.STOPPED);
      $video.removeAttr('data-user-controlled');

      const $parent = $video.parent();
      const component = $parent.closest('[data-plyr="component"]');
      const overlay = component.find('[data-plyr="overlay"]');

      overlay.show();
      component.find('.plyr__controls').hide();
    }
  });
}

function initSwiperVideos(swiperInstance, mode = 'preview') {
  let isArrowNavigation = false;

  // Listen for arrow clicks
  $(document).on(
    'click',
    '.swiper-arrow.prev.is-testimonials-2, .swiper-arrow.next.is-testimonials-2',
    function () {
      isArrowNavigation = true;
    }
  );

  swiperInstance.on('slideChange', function () {
    setTimeout(() => {
      const activeSlide = this.slides[this.activeIndex];
      const $video = $(activeSlide).find('.plyr_video');
      if ($video.length && $video.attr('data-user-controlled') !== 'true') {
        playVideoPreview($video);
      }
    }, 100);
  });

  // Rest of the function stays the same...
  swiperInstance.on('afterInit', function () {
    $(this.slides).each(function () {
      const $video = $(this).find('.plyr_video');
      if ($video.length) {
        setupVideoAttributes($video);
      }
    });

    setTimeout(() => {
      const activeSlide = this.slides[this.activeIndex];
      const $video = $(activeSlide).find('.plyr_video');
      if ($video.length) {
        playVideoPreview($video);
      }
    }, 300);
  });

  if (swiperInstance.initialized) {
    $(swiperInstance.slides).each(function () {
      const $video = $(this).find('.plyr_video');
      if ($video.length) {
        setupVideoAttributes($video);
      }
    });

    setTimeout(() => {
      const activeSlide = swiperInstance.slides[swiperInstance.activeIndex];
      const $video = $(activeSlide).find('.plyr_video');
      if ($video.length) {
        playVideoPreview($video);
      }
    }, 300);
  }
}

$(document).ready(() => initVideos());
