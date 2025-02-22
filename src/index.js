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
      videoSelector: '.window-scroll-wall_video video',
      containerSelector: '.section_window-scroll-wall',
      labelSelector: '.window-scroll-wall_label',
      labels: [], // Array of {start: number, end: number} for custom timing
      scrubSpeed: 0.5,
      fadeOverlap: 0.1,
    };

    // Merge defaults with provided config
    const settings = { ...defaults, ...config };
    // Get jQuery object
    const $video = $(settings.videoSelector);

    // Check if video exists using jQuery length
    if (!$video.length) return;

    // If you need the vanilla JS element later, you can get it like this:
    const video = $video[0];

    const labels = $(settings.labelSelector);
    const totalLabels = labels.length;

    function getLabelTimings() {
      const timings = [];

      labels.each(function (index) {
        const $label = $(this);

        // Check if we have custom timing for this index
        const customTiming = settings.labels[index];

        if (
          customTiming &&
          typeof customTiming.start === 'number' &&
          typeof customTiming.end === 'number' &&
          customTiming.start >= 0 &&
          customTiming.end <= 100 &&
          customTiming.start < customTiming.end
        ) {
          timings.push({
            element: $label,
            start: customTiming.start / 100,
            end: customTiming.end / 100,
          });
        } else {
          // Fallback to equal distribution
          const segmentSize = 1 / totalLabels;
          timings.push({
            element: $label,
            start: index * segmentSize,
            end: (index + 1) * segmentSize,
          });
        }
      });

      return timings;
    }

    // KEY CHANGE 1: Make sure video is muted before any other operations
    video.muted = true;
    video.playsInline = true; // Add playsinline for iOS
    video.setAttribute('playsinline', ''); // Double ensure playsinline

    // KEY CHANGE 2: Remove pause to prevent mobile autoplay issues
    // video.pause(); // Removed this line

    function initScrollTrigger() {
      gsap.registerPlugin(ScrollTrigger);

      const labelTimings = getLabelTimings();

      gsap.set(labels, { opacity: 0 });

      // Force the first frame on page load
      gsap.set(video, { visibility: 'visible' });

      // KEY CHANGE 3: Add markers for debugging on mobile
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: settings.containerSelector,
          start: 'top top',
          end: 'bottom bottom',
          scrub: settings.scrubSpeed,
          markers: true, // Add markers to debug on mobile
          onEnter: () => {
            // KEY CHANGE 4: Simplified video time setting
            video.currentTime = 0;
          },
          onUpdate: (self) => {
            // KEY CHANGE 5: Simplified time update logic
            const videoTime = self.progress * video.duration;
            video.currentTime = videoTime;

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

                opacity = Math.max(0, Math.min(1, opacity));
              }

              timing.element.css('opacity', opacity);
            });
          },
          onLeave: () => {
            video.currentTime = video.duration;
          },
          onEnterBack: () => {
            video.currentTime = video.duration;
          },
        },
      });
    }

    // KEY CHANGE 6: Simplified video loading check
    if (video.readyState >= 2) {
      initScrollTrigger();
    } else {
      video.addEventListener('loadeddata', initScrollTrigger, { once: true });
    }

    // KEY CHANGE 7: Remove preload setting to let browser decide
    // video.preload = 'auto'; // Removed this line

    // KEY CHANGE 8: Simplified play prevention
    video.addEventListener('play', function (e) {
      video.pause();
    });
  }

  initVideoScroll({
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

  // #endregion
});
