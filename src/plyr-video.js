// Store players by section ID to manage them independently
const playersBySection = new Map();
const loadedSections = new Set();

function initVideos() {
  // Find all sections containing videos
  const videoSections = $('section:has(.plyr_video)');
  if (!videoSections.length) return;

  const isMobile = window.innerWidth <= 991;

  // Create observer for lazy loading
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const sectionId = entry.target.id || `video-section-${Date.now()}`;

        if (entry.isIntersecting && !loadedSections.has(sectionId)) {
          loadSectionVideos(entry.target, sectionId, isMobile);
          loadedSections.add(sectionId);
          // Only disconnect observer for this specific section
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  // Observe each section independently
  videoSections.each(function () {
    if (!this.id) {
      this.id = `video-section-${Date.now()}`;
    }
    observer.observe(this);
  });
}

function loadSectionVideos(section, sectionId, isMobile) {
  const sectionVideos = $(section).find('.plyr_video');
  const sectionPlayers = [];
  playersBySection.set(sectionId, sectionPlayers);

  sectionVideos.each(function () {
    const $video = $(this);
    const $parent = $video.parent();
    const videoSrc = $parent.attr('data-video-src');
    const posterSrc = $parent.attr('data-poster-src');

    if (posterSrc) $video.attr('poster', posterSrc);
    $video.attr('src', videoSrc);
    $video.attr('preload', 'auto');

    const playerOptions = {
      controls: ['play', 'mute'],
      clickToPlay: false,
      muted: true,
      resetOnEnd: true,
      poster: posterSrc,
    };

    const player = new Plyr($video, playerOptions);

    player.on('ready', () => {
      player.muted = true;
    });

    sectionPlayers.push(player);

    if (isMobile) {
      initMobileControls($parent, player, $video[0], sectionId);
    } else {
      initDesktopControls($parent, player, $video[0], sectionId);
    }
  });
}

function initMobileControls($parent, player, videoElement, sectionId) {
  let isPlaying = false;

  $parent.on('click', function (e) {
    e.preventDefault();

    if (!isPlaying) {
      pauseOtherPlayers(videoElement, sectionId);
      player.once('playing', () => {
        isPlaying = true;
      });
      player.muted = false;
      player.play();
    } else {
      player.pause();
      player.muted = true;
      isPlaying = false;
    }
  });
}

function initDesktopControls($parent, player, videoElement, sectionId) {
  $parent.on('mouseenter', function () {
    pauseOtherPlayers(videoElement, sectionId);
    player.play();
  });

  $parent.on('mouseleave', function () {
    player.pause();
    player.restart();
    player.muted = true;
  });

  $parent.on('click', function (e) {
    e.preventDefault();
    player.muted = !player.muted;
  });
}

function pauseOtherPlayers(currentVideo, sectionId) {
  const sectionPlayers = playersBySection.get(sectionId) || [];
  sectionPlayers.forEach(function (player) {
    if (player.media !== currentVideo) {
      player.pause();
      player.restart();
      player.muted = true;
    }
  });
}

// Initialize on document ready
$(document).ready(initVideos);

// Reinitialize on dynamic content changes if needed
// $(document).on('contentChanged', initVideos);
