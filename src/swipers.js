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
  [
    '.section_hp-carousel.is-v1',
    '.swiper-testimonials-1',
    'testimonial-slider-1',
    {
      slidesPerView: 'auto',
      centeredSlides: true,
      spaceBetween: 24,
      loop: true,
      speed: 600,
      threshold: 100,
      slideToClickedSlide: true,
      on: {
        init: function () {
          window.VideoSystem.initSwiper(this);
        },
        slideChangeTransitionStart: function (swiper) {
          const activeSlide = this.slides[this.activeIndex];
          window.VideoSystem.pauseAll(activeSlide);
          gsap.to($('[data-quote-el]').add('[data-name-el]'), {
            opacity: 0,
            duration: 0.3,
            onComplete: () => {
              let { activeIndex, slides } = swiper;
              let activeSlide = slides[activeIndex];

              $('[data-quote-el]').text($(activeSlide).attr('data-quote'));
              $('[data-name-el]').text($(activeSlide).attr('data-name'));
            },
          });
        },
        slideChangeTransitionEnd: function () {
          const activeSlide = this.slides[this.activeIndex];
          window.VideoSystem.playActiveSlide(activeSlide);
          gsap.to($('[data-quote-el]').add('[data-name-el]'), {
            opacity: 1,
          });
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
      slidesPerView: 'auto',
      spaceBetween: 32,
      speed: 600,
      threshold: 20,
      mousewheel: {
        enabled: false,
      },
      breakpoints: {
        0: {
          allowTouchMove: true,
          allowSlideNext: true,
          allowSlidePrev: true,
        },
        480: {
          allowTouchMove: false,
          allowSlideNext: false,
          allowSlidePrev: false,
        },
      },
      on: {
        init: function () {
          window.VideoSystem.initSwiper(this, 'preview', true, true);
          $(this.el).find('.swiper_testimonials-card.is-v2').first().addClass('is-active');
        },
        slideChangeTransitionStart: function (swiper) {
          const activeSlide = this.slides[this.activeIndex];
          window.VideoSystem.pauseAll(activeSlide);
        },
        slideChangeTransitionEnd: function () {
          const activeSlide = this.slides[this.activeIndex];
          window.VideoSystem.playActiveSlide(activeSlide);
        },
      },
    });

    const forceRecalculateSwiper = (index) => {
      customerSwiper.allowSlideNext = true;
      customerSwiper.allowSlidePrev = true;
      customerSwiper.updateSize();
      customerSwiper.updateSlides();
      customerSwiper.updateProgress();
      customerSwiper.updateSlidesClasses();
      customerSwiper.slideTo(index, 600);
      customerSwiper.update();
      if (window.innerWidth >= 480) {
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

      if (window.innerWidth >= 480) {
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

    return customerSwiper;
  };

  const customerSwiper = initCustomers();
});
