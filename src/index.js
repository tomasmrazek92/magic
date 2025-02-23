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
      labels: [],
      scrubSpeed: 0.5,
      fadeOverlap: 0.1,
    };

    const settings = { ...defaults, ...config };
    const $video = $(settings.videoSelector);
    if (!$video.length) return;
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
      gsap.set(labels, { opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: settings.containerSelector,
          start: 'top top',
          end: 'bottom bottom',
          scrub: settings.scrubSpeed,
          markers: true,
          onEnter: () => (video.currentTime = 0),
          onUpdate: (self) => {
            video.currentTime = self.progress * video.duration;
            labelTimings.forEach(({ element, start, end }) => {
              const fadeSize = settings.fadeOverlap;
              const fadeDuration = Math.min(fadeSize * (end - start), (end - start) / 3);
              let opacity = 0;

              if (self.progress >= start && self.progress <= end) {
                if (self.progress < start + fadeDuration) {
                  opacity = (self.progress - start) / fadeDuration;
                } else if (self.progress > end - fadeDuration) {
                  opacity = (end - self.progress) / fadeDuration;
                } else {
                  opacity = 1;
                }
              }

              element.css('opacity', Math.max(0, Math.min(1, opacity)));
            });
          },
          onLeave: () => (video.currentTime = video.duration),
          onEnterBack: () => (video.currentTime = 0),
        },
      });

      // Refresh ScrollTrigger on mobile orientation change
      window.addEventListener('orientationchange', () => ScrollTrigger.refresh());
      window.addEventListener('resize', () => ScrollTrigger.refresh());
    }
    function ensureVideoReady(video, callback) {
      console.log('🔍 Checking video readiness...');

      video.setAttribute('preload', 'auto');
      video.setAttribute('playsinline', '');
      video.muted = true;
      video.style.visibility = 'visible';

      let isReady = false;

      const handleReady = () => {
        if (isReady) return;
        isReady = true;
        console.log('🎬 Video is ready! Firing callback...');
        callback();
      };

      // Force video load
      video.load();

      // Check readyState immediately
      console.log(`✅ Initial readyState: ${video.readyState}`);
      if (video.readyState >= 3) {
        handleReady();
        return;
      }

      // Event listeners
      video.addEventListener('loadeddata', handleReady, { once: true });
      video.addEventListener('canplaythrough', handleReady, { once: true });
      video.addEventListener('error', (e) => {
        console.error('❌ Video error:', e);
      });

      // Force play to trigger loading (it'll auto-pause)
      video.play().catch(() => {
        console.warn('⚠️ Autoplay blocked. Attempting manual load...');
        video.load();
      });

      // Fallback timer with retry logic
      let retryCount = 0;
      const retryInterval = setInterval(() => {
        console.warn(`⏳ Retry ${++retryCount}: readyState ${video.readyState}`);
        if (video.readyState >= 3) {
          clearInterval(retryInterval);
          handleReady();
        }
        if (retryCount >= 5) {
          clearInterval(retryInterval);
          console.error('🚫 Max retries reached. Video still not ready.');
        }
      }, 1500);

      // Final fallback
      setTimeout(() => {
        if (!isReady && video.readyState >= 2) {
          console.warn('⚠️ Final fallback triggered.');
          handleReady();
        }
      }, 7000);
    }

    ensureVideoReady(video, () => {
      console.log('🏗️ Initializing ScrollTrigger...');
      initScrollTrigger();
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
      { start: 80, end: 90 }, // 7:00 - 8:00
      { start: 90, end: 100 }, // 8:00 - 9:04
    ],
  });

  // #endregion
});
