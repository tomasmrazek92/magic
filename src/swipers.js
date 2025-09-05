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
];

$(document).ready(function () {
  initSwipers(swiperInstances);

  const initCustomers = () => {
    const customerSwiper = new Swiper('.swiper-testimonials.is-v2', {
      slidesPerView: 3,
      spaceBetween: 32,
      speed: 600,
      threshold: 20,
      mousewheel: {
        enabled: true,
        forceToAxis: true,
        thresholdDelta: 25,
      },
      navigation: {
        prevEl: '.swiper-arrow.prev.is-testimonials-2',
        nextEl: '.swiper-arrow.next.is-testimonials-2',
      },
      on: {
        init: function () {
          VideoSystem.initSwiper(this, 'preview');

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
        },
      },
      breakpoints: {
        0: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 2,
        },
        992: {
          slidesPerView: 3,
        },
      },
    });

    return customerSwiper;
  };

  const customerSwiper = initCustomers();

  $('.swiper-slide.testimonials-slide.is-v2').on('click', function () {
    let index = $(this).index();
    const $video = $(this).find('.plyr_video');

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
  });
});
