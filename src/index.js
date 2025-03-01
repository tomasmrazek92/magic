$(document).ready(() => {
  // #region Menu and Sticky CTA
  const banner = $('.cta_banner');
  const navbar = $('.navbar');
  const footer = $('.footer-box');
  const scrollHeight = $(navbar).height();

  $(window).on('scroll', () => {
    if (banner.length) {
      // Calculate viewport bottom position
      const viewportBottom = $(window).scrollTop() + $(window).height();
      // Get footer top position
      const footerTop = footer.offset().top;

      // First check if we've scrolled past initial threshold
      if (window.scrollY > scrollHeight * 2) {
        // Then check footer visibility
        if (viewportBottom >= footerTop) {
          banner.removeClass('active');
        } else {
          banner.addClass('active');
        }
      } else {
        banner.removeClass('active');
      }
    }
    if (navbar.length) {
      // First check if we've scrolled past initial threshold
      if (window.scrollY > scrollHeight * 2) {
        navbar.addClass('fixed');
      } else {
        navbar.removeClass('fixed');
      }
    }
  });

  // Click
  // Function to create observer and handle class change
  function createObserver(targetSelector, callback) {
    const targetNodes = $(targetSelector);
    targetNodes.each(function () {
      const observer = new MutationObserver((mutationsList) => {
        mutationsList.forEach((mutation) => {
          if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
            callback(mutation.target);
          }
        });
      });
      observer.observe(this, { attributes: true, attributeFilter: ['class'] }); // Pass the DOM node directly
    });
  }
  function dropdownCallback(targetElement) {
    if ($(targetElement).hasClass('w--open')) {
      navbar.addClass('open');
    } else {
      navbar.removeClass('open');
    }
  }

  // Opened Menu
  // --- Scroll Disabler
  let scrollPosition;
  let menuOpen = false;

  const disableScroll = () => {
    dropdownCallback('.w-nav-button');
    if (!menuOpen) {
      scrollPosition = $(window).scrollTop();
      $('html, body').scrollTop(0).addClass('overflow-hidden');
      $('.nav').addClass('open');
    } else {
      $('html, body').scrollTop(scrollPosition).removeClass('overflow-hidden');
      $('.nav').removeClass('open');
    }
    menuOpen = !menuOpen;
  };

  // Create observers for the elements with their respective callbacks
  createObserver('.w-nav-button', disableScroll);
  // #endregion

  // #region Modals
  function initModalBasic() {
    const modalGroup = document.querySelector('[data-modal-group-status]');
    const modals = document.querySelectorAll('[data-modal-name]');
    const modalTargets = document.querySelectorAll('[data-modal-target]');

    // Open modal
    modalTargets.forEach((modalTarget) => {
      modalTarget.addEventListener('click', function () {
        const modalTargetName = this.getAttribute('data-modal-target');

        // Close all modals
        modalTargets.forEach((target) => target.setAttribute('data-modal-status', 'not-active'));
        modals.forEach((modal) => modal.setAttribute('data-modal-status', 'not-active'));

        // Activate clicked modal
        document
          .querySelector(`[data-modal-target="${modalTargetName}"]`)
          .setAttribute('data-modal-status', 'active');
        document
          .querySelector(`[data-modal-name="${modalTargetName}"]`)
          .setAttribute('data-modal-status', 'active');

        // Set group to active
        if (modalGroup) {
          modalGroup.setAttribute('data-modal-group-status', 'active');
        }
      });
    });

    // Close modal
    document.querySelectorAll('[data-modal-close]').forEach((closeBtn) => {
      closeBtn.addEventListener('click', closeAllModals);
    });

    // Close modal on `Escape` key
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') {
        closeAllModals();
      }
    });

    // Function to close all modals
    function closeAllModals() {
      modalTargets.forEach((target) => target.setAttribute('data-modal-status', 'not-active'));

      if (modalGroup) {
        modalGroup.setAttribute('data-modal-group-status', 'not-active');
      }
    }
  }

  initModalBasic();
  // #endregion

  // #region videoScroll
  function initVideoScroll(config = {}) {
    const defaults = {
      containerSelector: '.section_window-scroll-wall',
      videoSelector: '.window-scroll-wall_video video',
      labelSelector: '.window-scroll-wall_label',
      loadingClass: 'wall-loading',
      labels: [],
      scrubSpeed: 0.5,
      fadeOverlap: 0.1,
    };

    const settings = { ...defaults, ...config };
    const $video = $(settings.videoSelector);
    const $videoContainer = $(settings.containerSelector);
    if (!$videoContainer.length) return;
    const video = $video[0];
    const labels = $(settings.labelSelector);
    const totalLabels = labels.length;

    function getLabelTimings() {
      return labels
        .map((index, label) => {
          const customTiming = settings.labels[index];
          const segmentSize = 1 / totalLabels;
          return {
            element: $(label),
            start: customTiming?.start / 100 ?? index * segmentSize,
            end: customTiming?.end / 100 ?? (index + 1) * segmentSize,
          };
        })
        .get();
    }

    // Ensure autoplay and visibility on mobile
    video.muted = true;
    video.playsInline = true;
    video.setAttribute('playsinline', '');
    video.style.visibility = 'visible';

    function initScrollTrigger() {
      gsap.registerPlugin(ScrollTrigger);

      const labelTimings = getLabelTimings();
      let lastTime = -1;
      let seekRequest;
      let isRendering = false;

      // Create a buffer of the last few target times to smooth out rapid changes
      const timeBuffer = [];
      const BUFFER_SIZE = 3;

      // Function to get the smoothed time value
      function getSmoothedTime(newTime) {
        // Add the new time to our buffer
        timeBuffer.push(newTime);

        // Keep the buffer at our desired size
        while (timeBuffer.length > BUFFER_SIZE) {
          timeBuffer.shift();
        }

        // If we don't have enough values yet, just return the new time
        if (timeBuffer.length < 2) return newTime;

        // Calculate the weighted average, giving more weight to recent values
        let totalWeight = 0;
        let weightedSum = 0;

        for (let i = 0; i < timeBuffer.length; i++) {
          const weight = i + 1; // 1, 2, 3, etc. - newer values have higher weight
          weightedSum += timeBuffer[i] * weight;
          totalWeight += weight;
        }

        return weightedSum / totalWeight;
      }

      // A more efficient rendering loop
      function renderLoop() {
        if (!isRendering) return;

        if (Math.abs(targetTime - video.currentTime) > 0.01) {
          video.currentTime = targetTime;
        }

        requestAnimationFrame(renderLoop);
      }

      // Store the target time globally
      let targetTime = 0;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: settings.containerSelector,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true, // Use true instead of a number for smoother scrolling
          onUpdate: (self) => {
            // Calculate raw target time from progress
            const rawTargetTime = self.progress * video.duration;

            // Apply smoothing
            targetTime = getSmoothedTime(rawTargetTime);

            // Start rendering loop if it's not already running
            if (!isRendering) {
              isRendering = true;
              renderLoop();
            }

            // Handle label opacity
            labelTimings.forEach((timing) => {
              const fadeSize = settings.fadeOverlap;
              const duration = timing.end - timing.start;
              const fadeDuration = Math.min(fadeSize * duration, duration / 3);

              let opacity = 0;
              if (self.progress >= timing.start && self.progress <= timing.end) {
                if (self.progress < timing.start + fadeDuration) {
                  opacity = (self.progress - timing.start) / fadeDuration;
                } else if (self.progress > timing.end - fadeDuration) {
                  opacity = (timing.end - self.progress) / fadeDuration;
                } else {
                  opacity = 1;
                }
              }
              timing.element.css('opacity', Math.max(0, Math.min(1, opacity)));
            });
          },
          onEnter: () => {
            targetTime = 0;
            video.currentTime = 0;
          },
          onLeave: () => {
            targetTime = video.duration;
            video.currentTime = video.duration;
          },
          onEnterBack: () => {
            targetTime = video.duration;
            video.currentTime = video.duration;
          },
          onLeaveBack: () => {
            targetTime = 0;
            video.currentTime = 0;
          },
          // This will make the scrolling smoother by using RAF
          fastScrollEnd: true,
        },
      });

      // Stop the rendering loop when user is not scrolling
      ScrollTrigger.addEventListener('scrollEnd', function () {
        isRendering = false;
      });

      // Also stop rendering when the page is not visible
      document.addEventListener('visibilitychange', function () {
        isRendering = !document.hidden && ScrollTrigger.isScrolling();
      });
    }
    function ensureVideoReady(video) {
      return new Promise((resolve) => {
        // Set up video attributes
        video.setAttribute('preload', 'auto');
        video.setAttribute('playsinline', '');
        video.muted = true;

        // Track loaded segments
        const segmentSize = 10; // Number of segments to split the video into
        const loadedSegments = new Array(segmentSize).fill(false);

        // Function to check if all segments are loaded
        function allSegmentsLoaded() {
          return loadedSegments.every((segment) => segment === true);
        }

        // Function to preload specific segment
        function preloadSegment(index) {
          return new Promise((resolve) => {
            const segmentDuration = video.duration / segmentSize;
            const targetTime = index * segmentDuration;

            console.log(
              `Preloading segment ${index + 1}/${segmentSize} at time ${targetTime.toFixed(2)}`
            );

            // Set to target time
            video.currentTime = targetTime;

            // Function to check if the segment is loaded
            function checkSegmentLoaded() {
              // If we can play at this position, mark segment as loaded
              if (video.readyState === 4) {
                loadedSegments[index] = true;
                resolve();
              } else {
                // Check again after a short delay
                setTimeout(checkSegmentLoaded, 200);
              }
            }

            // Start checking
            checkSegmentLoaded();
          });
        }

        // Sequential segment loading with forced plays
        async function forceLoadAllSegments() {
          // Wait for video metadata to load first
          if (video.readyState === 0) {
            await new Promise((resolve) => {
              video.addEventListener('loadedmetadata', resolve, { once: true });
              video.load();
            });
          }

          // Try playing through the video first to help with preloading
          try {
            video.currentTime = 0;
            video.playbackRate = 8; // Fast forward
            await video.play();

            // Let it play for a bit
            await new Promise((resolve) => setTimeout(resolve, 1000));
            video.pause();
          } catch (err) {
            console.warn('Fast preload attempt failed:', err);
          }

          // Now try to load each segment specifically
          for (let i = 0; i < segmentSize; i++) {
            await preloadSegment(i);
          }

          // Final verification - check random points
          for (let i = 0; i < 3; i++) {
            const randomTime = Math.random() * video.duration;
            video.currentTime = randomTime;
            await new Promise((resolve) => setTimeout(resolve, 300));
          }

          // Reset video to beginning
          video.currentTime = 0;

          if (settings.containerSelector && settings.loadingClass) {
            $(settings.containerSelector).removeClass(settings.loadingClass);
          }

          resolve(video);
        }

        // Start the loading process
        forceLoadAllSegments().catch((err) => {
          console.error('Error during video preloading:', err);

          // Fallback: just show the video and hide loader even if preloading failed
          video.style.opacity = '1';
          video.style.visibility = 'visible';

          if (settings.containerSelector && settings.loadingClass) {
            $(settings.containerSelector).removeClass(settings.loadingClass);
          }

          resolve(video);
        });
      });
    }

    // Initial set
    gsap.set(labels, { opacity: 0 });
    $(settings.containerSelector).addClass(settings.loadingClass);

    // Video play
    ensureVideoReady(video)
      .then(() => {
        // console.log('🏗️ Initializing ScrollTrigger...');
        initScrollTrigger();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  initVideoScroll({
    containerSelector: '.section_window-scroll-wall',
    labels: [
      { start: 0, end: 22 }, // 0:00 - 2:00
      { start: 22, end: 34 }, // 2:00 - 3:07
      { start: 34, end: 62 }, // 3:07 - 4:96
      { start: 62, end: 66 }, // 4:96 - 6:00
      { start: 66, end: 75 }, // 6:00 - 6:50
      { start: 75, end: 85 }, // 6:50 - 7:00
      { start: 85, end: 90 }, // 7:00 - 8:00
      { start: 90, end: 100 }, // 8:00 - 9:04
    ],
  });

  initVideoScroll({
    containerSelector: '.section_windowwall-scroll-wall',
    labels: [
      { start: 0, end: 20 }, // 0:00 - 1:50
      { start: 58, end: 75 }, // 1:50 - 2:65
      { start: 75, end: 85 }, // 2:65 - 3:80
      { start: 85, end: 100 }, // 3:80 - 4:80
    ],
  });

  initVideoScroll({
    containerSelector: '.section_patiodoors-scroll-wall',
    labels: [
      { start: 0, end: 14 }, // 0:00 - 1:00
      { start: 14, end: 29 }, // 1:00 - 2:00
      { start: 29, end: 62 }, // 2:00 - 3:20
      { start: 60, end: 70 }, // 3:20 - 5:00
      { start: 70, end: 80 }, // 3:20 - 5:00 (duplicate)
      { start: 80, end: 90 }, // 5:00 - 6:00
      { start: 90, end: 100 }, // 6:00 - 7:00
    ],
  });

  // #endregion
});
