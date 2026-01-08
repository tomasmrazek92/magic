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
      on: {},
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
    '.section_windows-energy',
    '.swiper-energy',
    'energy-slider',
    {
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
  [
    '.section_hp-new-hero',
    '.swiper-hp-hero',
    'hp_hero-slider',
    {
      slidesPerView: 'auto',
      autoplay: {
        delay: 4000,
        disableOnInteraction: false,
      },
      threshold: 20,
    },
    'all',
  ],
  [
    '.section_hp-slider',
    '.swiper-products',
    'products-slider',
    {
      slidesPerView: 'auto',
      centeredSlides: true,
      slideToClickedSlide: true,
      loop: true,
      breakpoints: {
        0: {
          spaceBetween: 16,
        },
        767: {
          spaceBetween: 24,
        },
        992: {
          spaceBetween: 32,
        },
      },
      on: {
        init: function () {
          const firstSlide = this.slides[0];
          const firstVideo = $(firstSlide).find('video')[0];
          if (firstVideo) {
            firstVideo.load();

            const observer = new IntersectionObserver(
              (entries) => {
                entries.forEach((entry) => {
                  if (entry.isIntersecting) {
                    firstVideo.play();
                    observer.disconnect();
                  }
                });
              },
              { threshold: 0.5 }
            );

            observer.observe(firstVideo);
          }
        },
        transitionStart: function () {
          $(this.el)
            .find('video')
            .each(function () {
              this.currentTime = 0;
              this.pause();
            });
        },
        transitionEnd: function () {
          const activeSlide = this.slides[this.activeIndex];
          const activeVideo = $(activeSlide).find('video')[0];
          if (activeVideo) {
            activeVideo.play();
          }
        },
      },
    },
    'all',
  ],
  [
    '.section_hp-reviews',
    '.swiper-reviews.is-v2',
    'reviews-slider',
    {
      slidesPerView: 'auto',
      centeredSlides: true,
      loop: true,
      breakpoints: {
        0: {
          spaceBetween: 16,
        },
        767: {
          spaceBetween: 24,
        },
        992: {
          spaceBetween: 40,
        },
      },
    },
    'all',
  ],
  [
    '.section_full-swiper',
    '.swiper.swiper-full',
    'full-slider',
    {
      slidesPerView: 1,
      centeredSlides: true,
      loop: true,
      spaceBetween: 0,
      on: {
        beforeTransitionStart: (swiper) => {
          $(swiper.el)
            .find('video')
            .each(function () {
              this.pause();
              this.currentTime = 0;
            });
        },
        slideChangeTransitionEnd: (swiper) => {
          setTimeout(() => {
            let $currentSlide = $(swiper.slides[swiper.activeIndex]);
            $currentSlide.find('video').each(function () {
              let video = this;
              if (video.readyState >= 2 && !video.paused) return;

              let playPromise = video.play();
              if (playPromise !== undefined) {
                playPromise
                  .then(() => {
                    if (video.paused) {
                      video.play().catch(() => {});
                    }
                  })
                  .catch(() => {});
              }
            });
          }, 150);
        },
      },
    },
    'all',
  ],
  [
    '.section_box-swiper',
    '.swiper.swiper-box',
    'is-box-swiper',
    {
      slidesPerView: 1,
      centeredSlides: true,
      spaceBetween: 32,
      loop: true,
      breakpoints: {
        0: {
          autoHeight: true,
        },
        992: {
          autoHeight: false,
        },
      },
      on: {
        beforeTransitionStart: (swiper) => {
          $(swiper.el)
            .find('video')
            .each(function () {
              this.pause();
              this.currentTime = 0;
            });
        },
        slideChangeTransitionEnd: (swiper) => {
          setTimeout(() => {
            let $currentSlide = $(swiper.slides[swiper.activeIndex]);
            $currentSlide.find('video').each(function () {
              let video = this;
              if (video.readyState >= 2 && !video.paused) return;

              let playPromise = video.play();
              if (playPromise !== undefined) {
                playPromise
                  .then(() => {
                    if (video.paused) {
                      video.play().catch(() => {});
                    }
                  })
                  .catch(() => {});
              }
            });
          }, 150);
        },
      },
    },
    'all',
  ],
];

$(document).ready(function () {
  initSwipers(swiperInstances);

  const initCustomers = () => {
    const customerSwiper = new Swiper('.swiper-testimonials.is-v2', {
      spaceBetween: 32,
      speed: 600,
      threshold: 20,
      slideToClickedSlide: true,
      mousewheel: {
        enabled: true,
        forceToAxis: true,
        thresholdDelta: 25,
      },
      breakpoints: {
        0: {
          slidesPerView: 1,
          allowTouchMove: true,
          allowSlideNext: true,
          allowSlidePrev: true,
        },
        480: {
          slidesPerView: 'auto',
          centeredSlides: true,
          allowTouchMove: false,
          allowSlideNext: false,
          allowSlidePrev: false,
        },
        992: {
          centeredSlides: false,
          slidesPerView: 'auto',
        },
      },
      on: {
        init: function () {
          const initializeVideoSystem = () => {
            VideoSystem.initSwiper(this, 'preview');

            $(this.el).find('.swiper_testimonials-card.is-v2').first().addClass('is-active');

            $(this.slides).each(function () {
              const $slide = $(this);
              const $video = $slide.find('.plyr_video');

              if ($video.length > 0) {
                $slide.on('mouseenter', function () {
                  const $video = $slide.find('.plyr_video');
                  if ($video.attr('data-user-controlled') !== 'true') {
                    VideoSystem.playPreview($video);
                  }
                });

                $slide.on('mouseleave', function () {
                  const $video = $slide.find('.plyr_video');
                  if (
                    $video.attr('data-user-controlled') !== 'true' &&
                    !$slide.is(customerSwiper.slides[customerSwiper.activeIndex])
                  ) {
                    VideoSystem.pauseSingle($video);
                  }
                });
              }
            });
          };

          const checkVideoSystem = () => {
            try {
              if (VideoSystem && VideoSystem.initSwiper) {
                initializeVideoSystem();
                return true;
              }
            } catch (e) {
              return false;
            }
            return false;
          };

          if (!checkVideoSystem()) {
            const interval = setInterval(() => {
              if (checkVideoSystem()) {
                clearInterval(interval);
              }
            }, 100);
          }
        },
        slideChangeTransitionStart: function (swiper) {
          const activeSlide = this.slides[this.activeIndex];
          updateVideo(activeSlide);
        },
      },
    });

    return customerSwiper;
  };

  const customerSwiper = initCustomers();

  function updateVideo(el) {
    let index = $(el).index();
    const $video = $(el).find('.plyr_video');

    if ($video.length) {
      const playState = $video.data('play-state');
      const isUserControlled = $video.attr('data-user-controlled') === 'true';

      if (playState === 'full' && isUserControlled) {
        window.VideoSystem.pauseSingle($video);
      } else {
        window.VideoSystem.playFull($video);
      }
    }

    customerSwiper.slideTo(index);
  }

  const forceRecalculateSwiper = (index) => {
    customerSwiper.allowSlideNext = true;
    customerSwiper.allowSlidePrev = true;
    customerSwiper.updateSize();
    customerSwiper.updateSlides();
    customerSwiper.updateProgress();
    customerSwiper.updateSlidesClasses();
    customerSwiper.slideTo(index, 600);
    customerSwiper.update();
    if (window.innerWidth >= 992) {
      customerSwiper.allowSlideNext = false;
      customerSwiper.allowSlidePrev = false;
    }
  };

  const slides = document.querySelectorAll(
    '.swiper-testimonials.is-v2 .swiper-slide.testimonials-slide.is-v2'
  );

  const handleSlideChange = (index) => {
    $('.swiper_testimonials-card.is-v2').removeClass('is-active');
    $('.swiper_testimonials-card.is-v2').eq(index).addClass('is-active');

    if (window.innerWidth >= 992) {
      setTimeout(() => {
        forceRecalculateSwiper(index);
      }, 500);
    } else {
      forceRecalculateSwiper(index);
    }
  };

  slides.forEach((slide, index) => {
    slide.addEventListener('click', () => {
      handleSlideChange(index);
    });
  });

  $('.swiper-arrow.prev.is-testimonials-2').on('click', () => {
    const currentIndex = customerSwiper.activeIndex;
    if (currentIndex > 0) {
      handleSlideChange(currentIndex - 1);
    }
  });

  $('.swiper-arrow.next.is-testimonials-2').on('click', () => {
    const currentIndex = customerSwiper.activeIndex;
    if (currentIndex < slides.length - 1) {
      handleSlideChange(currentIndex + 1);
    }
  });
});
