import { initVideos } from './plyr-video';
import { initSwipers } from './utils/globalFunctions';

// Sample data for swiperInstances, specific to this page
const swiperInstances = [
  [
    '.section_hp-inspired',
    '.swiper-inspired',
    'inspired-slider',
    {
      slidesPerView: 'auto',
    },
    'all',
  ],
  [
    '.section_lp-official-carousel',
    '.lp-official-carousel_slider',
    'lp-official',
    {
      slidesPerView: 1,
      threshold: 50,
      loop: true,
      spaceBetween: 24,
      on: {
        slideChangeTransitionEnd: function () {
          // Get the current active slide
          const activeSlide = this.slides[this.activeIndex];

          // Find and initialize Vimeo players on the active slide
          const vimeoElement = activeSlide.querySelector('[data-vimeo-player-init]');
          if (vimeoElement) {
            initVimeoPlayer(vimeoElement);
          }
        },
        init: function () {
          // Initialize Vimeo player on the initially active slide
          const activeSlide = this.slides[this.activeIndex];

          // Find and initialize Vimeo players on the active slide
          const vimeoElement = activeSlide.querySelector('[data-vimeo-player-init]');
          if (vimeoElement) {
            initVimeoPlayer(vimeoElement);
          }
        },
      },
    },
    'all',
  ],
  [
    '.section_hp-reviews',
    '.swiper-reviews',
    'reviews-slider',
    {
      slidesPerView: 'auto',
      autoHeight: true,
    },
    'all',
  ],
  [
    '.section_windows-styles',
    '.swiper-styles',
    'styles-slider',
    {
      threshold: 50,
      breakpoints: {
        0: {
          centeredSlides: true,
          spaceBetween: 20,
          slidesPerView: 1.5,
        },
        767: {
          centeredSlides: true,
          spaceBetween: 28,
          slidesPerView: 2.4,
        },
        992: {
          centeredSlides: false,
          spaceBetween: 20,
          slidesPerView: 4,
        },
      },
    },
    'all',
  ],
  [
    '.section_windows-energy',
    '.swiper-energy',
    'energy-slider',
    {
      pagination: {
        el: '.section_windows-energy .slider-progress_bg',
        type: 'progressbar',
      },
      breakpoints: {
        0: {
          centeredSlides: true,
          spaceBetween: 24,
          slidesPerView: 1.1,
        },
        767: {
          centeredSlides: true,
          spaceBetween: 28,
          slidesPerView: 2,
        },
        992: {
          spaceBetween: 48,
          centeredSlides: false,
          slidesPerView: 'auto',
        },
      },
    },
    'all',
  ],
  [
    '.section_windows-control',
    '.swiper-control',
    'control-slider',
    {
      loop: true,
      speed: 1000,
      centeredSlides: true,
      autoplay: { delay: 3000 },
      breakpoints: {
        0: {
          spaceBetween: 24,
          slidesPerView: 1.4,
        },
        767: {
          spaceBetween: 32,
          slidesPerView: 2,
        },
        992: {
          spaceBetween: 16,
          slidesPerView: 'auto',
        },
      },
    },
    'all',
  ],
  [
    '.section_blog-hero',
    '.blog-hero_slider',
    'blog-slider',
    {
      slidesPerView: 1,
      loop: true,
      threshhold: 20,
      slideToClickedSlide: true,
    },
    'all',
  ],
];

// Initialize swipers with instances specific to this page
initSwipers(swiperInstances);

// #region Videos
// Check if Vimeo API is loaded
let isVimeoAPIReady = false;

if (typeof Vimeo !== 'undefined' && Vimeo.Player) {
  isVimeoAPIReady = true;
  console.log('Vimeo API already loaded');
} else {
  // Load Vimeo API dynamically
  console.log('Loading Vimeo API dynamically');
  const tag = document.createElement('script');
  tag.src = 'https://player.vimeo.com/api/player.js';
  tag.onload = function () {
    isVimeoAPIReady = true;
    console.log('Vimeo API loaded successfully');
  };
  tag.onerror = function () {
    console.error('Failed to load Vimeo API');
  };
  document.body.appendChild(tag);
}

// Enhanced debug logging
function debugLog(message, data) {
  const timestamp = new Date().toISOString();
  console.log(`[Vimeo Player ${timestamp}] ${message}`, data || '');
}

// Main Vimeo player initialization function
function initVimeoPlayer(targetElement) {
  if (!isVimeoAPIReady) {
    console.warn('Vimeo API not ready yet. Will retry in 500ms.');
    setTimeout(() => initVimeoPlayer(targetElement), 500);
    return;
  }

  debugLog('Initializing Vimeo player for:', targetElement);

  // If no specific element is provided, find all elements with the attribute
  const vimeoPlayers = targetElement
    ? [targetElement]
    : document.querySelectorAll('[data-vimeo-player-init]');

  vimeoPlayers.forEach(function (vimeoElement, index) {
    // Skip if this element has already been initialized
    if (vimeoElement.hasAttribute('data-vimeo-initialized')) {
      debugLog('Element already initialized, skipping', vimeoElement.id);
      return;
    }

    // Add Vimeo URL ID to the iframe [src]
    const vimeoVideoID = vimeoElement.getAttribute('data-vimeo-video-id');
    if (!vimeoVideoID) {
      console.error('No video ID found for element', vimeoElement);
      return;
    }

    debugLog('Setting up video with ID:', vimeoVideoID);

    // Find the iframe or create one if it doesn't exist
    let iframe = vimeoElement.querySelector('iframe');
    if (!iframe) {
      debugLog('No iframe found, creating one');
      iframe = document.createElement('iframe');
      iframe.width = '100%';
      iframe.height = '100%';
      iframe.frameBorder = '0';
      iframe.allow = 'autoplay; fullscreen';
      iframe.allowFullscreen = true;

      // Find a container for the iframe or use the element itself
      const container = vimeoElement.querySelector('.vimeo-bg__iframe-wrapper') || vimeoElement;
      container.appendChild(iframe);
    }

    // Set the iframe src
    const vimeoVideoURL = `https://player.vimeo.com/video/${vimeoVideoID}?api=1&background=1&autoplay=0&loop=0&muted=1`;
    iframe.setAttribute('src', vimeoVideoURL);
    debugLog('Set iframe src to:', vimeoVideoURL);

    // Assign an ID to each element if it doesn't already have one
    if (!vimeoElement.id) {
      const videoIndexID = 'vimeo-player-index-' + index;
      vimeoElement.setAttribute('id', videoIndexID);
      debugLog('Assigned ID to element:', videoIndexID);
    }

    const iframeID = vimeoElement.id;

    // Create a new player instance and store it
    try {
      debugLog('Creating Vimeo Player instance for:', iframeID);
      const player = new Vimeo.Player(iframe);

      // Track player state
      vimeoElement._vimeoState = {
        isPlaying: false,
        isLoaded: false,
        hasAttemptedPlay: false,
        playAttempts: 0,
        errors: [],
      };

      // Store player ready state
      player
        .ready()
        .then(() => {
          debugLog('Player ready for video:', vimeoVideoID);
          vimeoElement._vimeoState.isReady = true;
        })
        .catch((error) => {
          console.error('Player ready promise failed:', error);
          vimeoElement._vimeoState.errors.push({ type: 'ready', error });
        });

      let videoAspectRatio;

      // Update Aspect Ratio if [data-vimeo-update-size="true"]
      if (vimeoElement.getAttribute('data-vimeo-update-size') === 'true') {
        debugLog('Will update aspect ratio for:', vimeoVideoID);
        player.getVideoWidth().then(function (width) {
          player.getVideoHeight().then(function (height) {
            videoAspectRatio = height / width;
            debugLog(`Video aspect ratio: ${height}/${width} = ${videoAspectRatio}`);
            const beforeEl = vimeoElement.querySelector('.vimeo-player__before');
            if (beforeEl) {
              beforeEl.style.paddingTop = videoAspectRatio * 100 + '%';
              debugLog('Updated padding-top to:', videoAspectRatio * 100 + '%');
            }
          });
        });
      }

      // Function to adjust video sizing
      function adjustVideoSizing() {
        const containerAspectRatio = (vimeoElement.offsetHeight / vimeoElement.offsetWidth) * 100;
        debugLog(`Container aspect ratio: ${containerAspectRatio}`);

        const iframeWrapper = vimeoElement.querySelector('.vimeo-bg__iframe-wrapper');
        if (iframeWrapper && videoAspectRatio) {
          if (containerAspectRatio > videoAspectRatio * 100) {
            const newWidth = `${(containerAspectRatio / (videoAspectRatio * 100)) * 100}%`;
            iframeWrapper.style.width = newWidth;
            debugLog('Updated iframe wrapper width to:', newWidth);
          } else {
            iframeWrapper.style.width = '';
            debugLog('Reset iframe wrapper width');
          }
        }
      }

      // Adjust video sizing initially
      if (vimeoElement.getAttribute('data-vimeo-update-size') === 'true') {
        adjustVideoSizing();
        player.getVideoWidth().then(function () {
          player.getVideoHeight().then(function () {
            adjustVideoSizing();
          });
        });
      } else {
        adjustVideoSizing();
      }

      // Adjust video sizing on resize
      const resizeHandler = () => adjustVideoSizing();
      window.addEventListener('resize', resizeHandler);

      // Store resize handler for potential cleanup
      vimeoElement._vimeoResizeHandler = resizeHandler;

      // Enhanced event logging
      player.on('loaded', function () {
        debugLog('Event: loaded', vimeoVideoID);
        vimeoElement._vimeoState.isLoaded = true;
        vimeoElement.setAttribute('data-vimeo-loaded', 'true');

        // Log any CSS issues that might affect visibility
        const computedStyle = window.getComputedStyle(iframe);
        debugLog('iframe CSS - visibility:', computedStyle.visibility);
        debugLog('iframe CSS - display:', computedStyle.display);
        debugLog('iframe CSS - opacity:', computedStyle.opacity);
      });

      player.on('play', function () {
        debugLog('Event: play', vimeoVideoID);
        vimeoElement._vimeoState.isPlaying = true;
        vimeoElement.setAttribute('data-vimeo-loaded', 'true');
        vimeoElement.setAttribute('data-vimeo-playing', 'true');
      });

      player.on('pause', function () {
        debugLog('Event: pause', vimeoVideoID);
        vimeoElement._vimeoState.isPlaying = false;
        vimeoElement.setAttribute('data-vimeo-playing', 'false');
      });

      player.on('ended', function () {
        debugLog('Event: ended', vimeoVideoID);
        vimeoElement._vimeoState.isPlaying = false;
      });

      player.on('error', function (error) {
        console.error('Event: error', vimeoVideoID, error);
        vimeoElement._vimeoState.errors.push({ type: 'playback', error });
      });

      // Autoplay logic
      if (vimeoElement.getAttribute('data-vimeo-autoplay') === 'false') {
        // Autoplay = false
        debugLog('Autoplay disabled for:', vimeoVideoID);
        player.setVolume(1);
        player.pause();
      } else {
        // Autoplay = true
        debugLog('Autoplay enabled for:', vimeoVideoID);
        player.setVolume(0);
        vimeoElement.setAttribute('data-vimeo-muted', 'true');

        // If paused-by-user === false, do scroll-based autoplay
        if (vimeoElement.getAttribute('data-vimeo-paused-by-user') === 'false') {
          function checkVisibility() {
            const rect = vimeoElement.getBoundingClientRect();
            const inView = rect.top < window.innerHeight && rect.bottom > 0;
            debugLog(`Visibility check: ${inView ? 'in view' : 'not in view'}`);
            inView ? vimeoPlayerPlay() : vimeoPlayerPause();
          }

          // Initial check
          checkVisibility();

          // Handle scroll
          window.addEventListener('scroll', checkVisibility);

          // Store scroll handler for potential cleanup
          vimeoElement._vimeoScrollHandler = checkVisibility;
        } else {
          // If not scroll-based, try to autoplay
          debugLog('Attempting immediate play for:', vimeoVideoID);
          vimeoPlayerPlay();
        }
      }

      // Function: Play Video with enhanced reliability
      function vimeoPlayerPlay() {
        debugLog('vimeoPlayerPlay called for:', vimeoVideoID);
        vimeoElement.setAttribute('data-vimeo-activated', 'true');
        vimeoElement.setAttribute('data-vimeo-playing', 'true');

        // Force fullscreen on devices below 992px if supported
        if (
          window.innerWidth < 992 &&
          !!(
            document.fullscreenEnabled ||
            document.webkitFullscreenEnabled ||
            document.mozFullScreenEnabled ||
            document.msFullscreenEnabled
          )
        ) {
          const fullscreenElement = document.getElementById(iframeID);
          if (fullscreenElement) {
            vimeoElement.setAttribute('data-vimeo-fullscreen', 'true');
            (
              fullscreenElement.requestFullscreen ||
              fullscreenElement.webkitRequestFullscreen ||
              fullscreenElement.mozRequestFullScreen ||
              fullscreenElement.msRequestFullscreen
            ).call(fullscreenElement);
          }
        }

        vimeoElement._vimeoState.hasAttemptedPlay = true;
        vimeoElement._vimeoState.playAttempts++;

        player
          .play()
          .then(() => {
            debugLog('Play command succeeded');
          })
          .catch((error) => {
            console.error('Play command failed:', error);
            vimeoElement._vimeoState.errors.push({ type: 'play', error });

            // Auto-retry play (browsers often block first autoplay attempt)
            if (vimeoElement._vimeoState.playAttempts < 3) {
              debugLog(`Retrying play attempt ${vimeoElement._vimeoState.playAttempts + 1}/3`);
              setTimeout(() => {
                player.play().catch((e) => {
                  console.error('Retry play failed:', e);
                });
              }, 1000);
            }
          });
      }

      // Function: Pause Video
      function vimeoPlayerPause() {
        debugLog('vimeoPlayerPause called for:', vimeoVideoID);
        vimeoElement.setAttribute('data-vimeo-playing', 'false');
        player.pause().catch((error) => {
          console.error('Pause command failed:', error);
        });
      }

      // Click: Play
      const playBtns = vimeoElement.querySelectorAll('[data-vimeo-control="play"]');
      playBtns.forEach((playBtn) => {
        playBtn.addEventListener('click', function () {
          debugLog('Play button clicked');
          player.setVolume(0);
          vimeoPlayerPlay();

          const volume = vimeoElement.getAttribute('data-vimeo-muted') === 'true' ? 0 : 1;
          player.setVolume(volume);
        });
      });

      // Click: Pause
      const pauseBtn = vimeoElement.querySelector('[data-vimeo-control="pause"]');
      if (pauseBtn) {
        pauseBtn.addEventListener('click', function () {
          debugLog('Pause button clicked');
          vimeoPlayerPause();
          // If paused by user => kill the scroll-based autoplay
          if (vimeoElement.getAttribute('data-vimeo-autoplay') === 'true') {
            vimeoElement.setAttribute('data-vimeo-paused-by-user', 'true');
            // Removing scroll listener (if you'd like)
            if (vimeoElement._vimeoScrollHandler) {
              window.removeEventListener('scroll', vimeoElement._vimeoScrollHandler);
            }
          }
        });
      }

      // Click: Mute
      const muteBtn = vimeoElement.querySelector('[data-vimeo-control="mute"]');
      if (muteBtn) {
        muteBtn.addEventListener('click', function () {
          debugLog('Mute button clicked');
          if (vimeoElement.getAttribute('data-vimeo-muted') === 'false') {
            player.setVolume(0);
            vimeoElement.setAttribute('data-vimeo-muted', 'true');
          } else {
            player.setVolume(1);
            vimeoElement.setAttribute('data-vimeo-muted', 'false');
          }
        });
      }

      // Fullscreen
      // Check if Fullscreen API is supported
      const fullscreenSupported = !!(
        document.fullscreenEnabled ||
        document.webkitFullscreenEnabled ||
        document.mozFullScreenEnabled ||
        document.msFullscreenEnabled
      );

      const fullscreenBtn = vimeoElement.querySelector('[data-vimeo-control="fullscreen"]');

      // Hide the fullscreen button if not supported
      if (!fullscreenSupported && fullscreenBtn) {
        fullscreenBtn.style.display = 'none';
      }

      if (fullscreenBtn) {
        fullscreenBtn.addEventListener('click', () => {
          debugLog('Fullscreen button clicked');
          const fullscreenElement = document.getElementById(iframeID);
          if (!fullscreenElement) return;

          const isFullscreen =
            document.fullscreenElement ||
            document.webkitFullscreenElement ||
            document.mozFullScreenElement ||
            document.msFullscreenElement;

          if (isFullscreen) {
            // Exit fullscreen
            vimeoElement.setAttribute('data-vimeo-fullscreen', 'false');
            (
              document.exitFullscreen ||
              document.webkitExitFullscreen ||
              document.mozCancelFullScreen ||
              document.msExitFullscreen
            ).call(document);
          } else {
            // Enter fullscreen
            vimeoElement.setAttribute('data-vimeo-fullscreen', 'true');
            (
              fullscreenElement.requestFullscreen ||
              fullscreenElement.webkitRequestFullscreen ||
              fullscreenElement.mozRequestFullScreen ||
              fullscreenElement.msRequestFullscreen
            ).call(fullscreenElement);
          }
        });
      }

      const handleFullscreenChange = () => {
        const isFullscreen =
          document.fullscreenElement ||
          document.webkitFullscreenElement ||
          document.mozFullScreenElement ||
          document.msFullscreenElement;

        vimeoElement.setAttribute('data-vimeo-fullscreen', isFullscreen ? 'true' : 'false');
      };

      // Add event listeners for fullscreen changes (with vendor prefixes)
      [
        'fullscreenchange',
        'webkitfullscreenchange',
        'mozfullscreenchange',
        'msfullscreenchange',
      ].forEach((event) => {
        document.addEventListener(event, handleFullscreenChange);
      });

      // Convert seconds to mm:ss
      function secondsTimeSpanToHMS(s) {
        let h = Math.floor(s / 3600);
        s -= h * 3600;
        let m = Math.floor(s / 60);
        s -= m * 60;
        return m + ':' + (s < 10 ? '0' + s : s);
      }

      // Duration
      const vimeoDuration = vimeoElement.querySelector('[data-vimeo-duration]');
      player.getDuration().then(function (duration) {
        debugLog(`Got duration: ${duration}s`);
        if (vimeoDuration) {
          vimeoDuration.textContent = secondsTimeSpanToHMS(duration);
        }
        // Update timeline + progress max
        const timelineAndProgress = vimeoElement.querySelectorAll(
          '[data-vimeo-control="timeline"], progress'
        );
        timelineAndProgress.forEach((el) => {
          el.setAttribute('max', duration);
        });
      });

      // Timeline
      const timelineElem = vimeoElement.querySelector('[data-vimeo-control="timeline"]');
      const progressElem = vimeoElement.querySelector('progress');

      function updateTimelineValue() {
        player.getDuration().then(function () {
          const timeVal = timelineElem.value;
          debugLog(`Timeline changed to: ${timeVal}s`);
          player.setCurrentTime(timeVal);
          if (progressElem) {
            progressElem.value = timeVal;
          }
        });
      }

      if (timelineElem) {
        ['input', 'change'].forEach((evt) => {
          timelineElem.addEventListener(evt, updateTimelineValue);
        });
      }

      // Progress Time & Timeline (timeupdate)
      player.on('timeupdate', function (data) {
        if (timelineElem) {
          timelineElem.value = data.seconds;
        }
        if (progressElem) {
          progressElem.value = data.seconds;
        }
        if (vimeoDuration) {
          vimeoDuration.textContent = secondsTimeSpanToHMS(Math.trunc(data.seconds));
        }
      });

      // Hide controls after hover on Vimeo player
      let vimeoHoverTimer;
      vimeoElement.addEventListener('mousemove', function () {
        if (vimeoElement.getAttribute('data-vimeo-hover') === 'false') {
          vimeoElement.setAttribute('data-vimeo-hover', 'true');
        }
        clearTimeout(vimeoHoverTimer);
        vimeoHoverTimer = setTimeout(vimeoHoverTrue, 3000);
      });

      function vimeoHoverTrue() {
        vimeoElement.setAttribute('data-vimeo-hover', 'false');
      }

      // Video Ended
      function vimeoOnEnd() {
        debugLog('Video ended');
        vimeoElement.setAttribute('data-vimeo-activated', 'false');
        vimeoElement.setAttribute('data-vimeo-playing', 'false');
        player.unload();
      }
      player.on('ended', vimeoOnEnd);

      // Store player instance and functions for external access
      vimeoElement._vimeoPlayer = player;
      vimeoElement._vimeoPlayerPlay = vimeoPlayerPlay;
      vimeoElement._vimeoPlayerPause = vimeoPlayerPause;

      // Mark as initialized
      vimeoElement.setAttribute('data-vimeo-initialized', 'true');
      debugLog('Player initialization complete for:', vimeoVideoID);

      // Force a play attempt after a delay (helps with some initialization issues)
      if (vimeoElement.getAttribute('data-vimeo-autoplay') !== 'false') {
        setTimeout(() => {
          debugLog('Attempting delayed play');
          vimeoPlayerPlay();
        }, 500);
      }
    } catch (error) {
      console.error('Failed to initialize Vimeo Player:', error);
    }
  });
}

// Function to destroy Vimeo player instance
function destroyVimeoPlayer(vimeoElement) {
  if (!vimeoElement || !vimeoElement.hasAttribute('data-vimeo-initialized')) {
    debugLog('Nothing to destroy', vimeoElement);
    return;
  }

  debugLog('Destroying player for:', vimeoElement.id);

  // Clean up event handlers
  if (vimeoElement._vimeoResizeHandler) {
    window.removeEventListener('resize', vimeoElement._vimeoResizeHandler);
  }

  if (vimeoElement._vimeoScrollHandler) {
    window.removeEventListener('scroll', vimeoElement._vimeoScrollHandler);
  }

  // Destroy the player instance if available
  if (vimeoElement._vimeoPlayer) {
    vimeoElement._vimeoPlayer
      .destroy()
      .catch((err) => console.error('Error destroying Vimeo player:', err));
  }

  // Remove initialized flag
  vimeoElement.removeAttribute('data-vimeo-initialized');
  vimeoElement.removeAttribute('data-vimeo-playing');
  vimeoElement.removeAttribute('data-vimeo-activated');
  vimeoElement.removeAttribute('data-vimeo-loaded');

  debugLog('Player destroyed for:', vimeoElement.id);
}

// Function to get player debug info
function getVimeoPlayerDebugInfo(vimeoElement) {
  if (!vimeoElement || !vimeoElement._vimeoPlayer) {
    return 'No Vimeo player found';
  }

  return {
    id: vimeoElement.id,
    videoId: vimeoElement.getAttribute('data-vimeo-video-id'),
    initialized: vimeoElement.hasAttribute('data-vimeo-initialized'),
    playing: vimeoElement.hasAttribute('data-vimeo-playing'),
    loaded: vimeoElement.hasAttribute('data-vimeo-loaded'),
    state: vimeoElement._vimeoState || 'No state tracking available',
  };
}

// jQuery version for Webflow compatibility
if (typeof $ !== 'undefined') {
  $.fn.initVimeoPlayer = function () {
    return this.each(function () {
      initVimeoPlayer(this);
    });
  };

  $.fn.destroyVimeoPlayer = function () {
    return this.each(function () {
      destroyVimeoPlayer(this);
    });
  };

  $.fn.vimeoPlayerPlay = function () {
    return this.each(function () {
      if (this._vimeoPlayerPlay) {
        this._vimeoPlayerPlay();
      }
    });
  };

  $.fn.vimeoPlayerPause = function () {
    return this.each(function () {
      if (this._vimeoPlayerPause) {
        this._vimeoPlayerPause();
      }
    });
  };

  $.fn.vimeoPlayerDebug = function () {
    if (this.length === 0) return 'No elements selected';
    return getVimeoPlayerDebugInfo(this[0]);
  };
}

// Swiper integration
function setupVimeoSwiperIntegration(swiper) {
  debugLog('Setting up Swiper integration', swiper);

  // Create the configuration object for Swiper
  const swiperConfig = {
    on: {
      init: function () {
        debugLog('Swiper initialized');
        // Initialize the video on the first slide
        const activeSlide = this.slides[this.activeIndex];
        const vimeoElements = activeSlide.querySelectorAll('[data-vimeo-player-init]');

        if (vimeoElements.length) {
          debugLog(`Found ${vimeoElements.length} Vimeo elements in active slide`);
          vimeoElements.forEach((vimeoElement) => {
            // Destroy first in case it was previously initialized
            destroyVimeoPlayer(vimeoElement);
            // Then initialize
            initVimeoPlayer(vimeoElement);

            // Force play after a short delay
            setTimeout(() => {
              if (vimeoElement._vimeoPlayerPlay) {
                debugLog('Forcing play on initial slide');
                vimeoElement._vimeoPlayerPlay();
              }
            }, 800);
          });
        } else {
          debugLog('No Vimeo elements found in active slide');
        }
      },
      slideChangeTransitionStart: function () {
        debugLog('Slide change transition start');
        // Get the previous slide and pause/destroy any active videos
        if (typeof this.previousIndex !== 'undefined') {
          const previousSlide = this.slides[this.previousIndex];
          const vimeoElements = previousSlide.querySelectorAll(
            '[data-vimeo-player-init][data-vimeo-initialized="true"]'
          );

          vimeoElements.forEach((vimeoElement) => {
            debugLog('Destroying player on previous slide');
            destroyVimeoPlayer(vimeoElement);
          });
        }
      },
      slideChangeTransitionEnd: function () {
        debugLog('Slide change transition end');
        // Initialize video on the new active slide
        const activeSlide = this.slides[this.activeIndex];
        const vimeoElements = activeSlide.querySelectorAll('[data-vimeo-player-init]');

        if (vimeoElements.length) {
          debugLog(`Found ${vimeoElements.length} Vimeo elements in new active slide`);
          vimeoElements.forEach((vimeoElement) => {
            // Initialize with a slight delay to ensure the slide transition is complete
            setTimeout(() => {
              // Make sure it's destroyed first
              destroyVimeoPlayer(vimeoElement);
              // Then initialize
              initVimeoPlayer(vimeoElement);

              // Force play after initialization
              setTimeout(() => {
                if (vimeoElement._vimeoPlayerPlay) {
                  debugLog('Forcing play on new slide');
                  vimeoElement._vimeoPlayerPlay();

                  // Try once more after a longer delay as a fallback
                  setTimeout(() => {
                    if (vimeoElement._vimeoPlayer && !vimeoElement._vimeoState.isPlaying) {
                      debugLog('Second play attempt on new slide');
                      vimeoElement._vimeoPlayerPlay();
                    }
                  }, 1000);
                }
              }, 500);
            }, 100);
          });
        } else {
          debugLog('No Vimeo elements found in new active slide');
        }
      },
    },
  };

  // Merge with existing configuration if provided
  if (swiper.params && swiper.params.on) {
    Object.assign(swiperConfig.on, swiper.params.on);
  }

  // Apply configuration
  Object.assign(swiper.params, swiperConfig);

  // Force initialization for existing Swiper instance
  if (swiper.initialized) {
    debugLog('Swiper already initialized, running init handler manually');
    swiperConfig.on.init.call(swiper);
  }

  return swiper;
}

// jQuery method for Swiper integration
if (typeof $ !== 'undefined') {
  $.fn.setupVimeoSwiper = function () {
    return this.each(function () {
      if (this.swiper) {
        setupVimeoSwiperIntegration(this.swiper);
      } else {
        console.error('No Swiper instance found on element:', this);
      }
    });
  };
}
