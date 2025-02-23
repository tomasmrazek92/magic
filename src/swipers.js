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
      loop: true,
      threshhold: 30,
      spaceBetween: 24,
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
