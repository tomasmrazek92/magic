const allPlayers = [];

window.VideoSystem = {
  init: initVideos,
  initSwiper: initSwiperVideos,
  playActiveSlide: playActiveSlideVideo,
  pauseAll: pauseAllVideos,
};

function initVideos() {
  $('.plyr_video').each(function () {
    initSingleVideo($(this));
  });
}

function initSingleVideo($video) {
  if ($video.data('plyr-initialized')) return;

  const $parent = $video.parent();
  const videoSrc = $parent.attr('data-video-src');
  const posterSrc = $parent.attr('data-poster-src');

  if (posterSrc) $video.attr('poster', posterSrc);
  $video.attr('src', videoSrc);
  $video.attr('preload', 'auto');

  const playerOptions = {
    controls: ['play', 'progress', 'mute'],
    clickToPlay: false,
    muted: true,
    resetOnEnd: true,
    poster: posterSrc,
  };

  const player = new Plyr($video[0], playerOptions);

  player.on('ready', () => {
    player.muted = true;
    $parent.find('.plyr__controls').hide();
  });

  allPlayers.push(player);
  $video.data('plyr-initialized', true);
  initControls($parent, player);
}

function initSwiperVideos(swiperInstance) {
  $(swiperInstance.slides)
    .find('.plyr_video')
    .each(function () {
      initSingleVideo($(this));
    });
}

function initControls($parent, player) {
  let component = $parent.closest('[data-plyr="component"]');
  let overlay = component.find('[data-plyr="overlay"]');
  overlay.on('click', function (e) {
    overlay.hide();
    player.muted = false;
    player.restart();
    player.play();
    $parent.find('.plyr__controls').show();
  });

  if (component.attr('data-plyr-play') === 'hover') {
    component.on('mouseenter', function () {
      player.play();
      overlay.hide();
      player.muted = true;
      $parent.find('.plyr__controls').show();
    });

    component.on('mouseleave', function () {
      player.pause();
      overlay.show();
      player.restart();
      player.muted = true;
      $parent.find('.plyr__controls').hide();
    });
  }

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

function pauseAllVideos() {
  allPlayers.forEach(function (player) {
    player.pause();
    player.restart();
    player.muted = true;
  });
  $('[data-plyr="overlay"]').show();
  $('.plyr__controls').hide();
}

function playActiveSlideVideo(activeSlide) {
  const $video = $(activeSlide).find('.plyr_video').first();
  if (!$video.length) return;

  const player = allPlayers.find((p) => p.media === $video[0]);
  if (player) {
    pauseAllVideos();
    player.play();
  }
}

$(document).ready(initVideos);
