import { initSwipers } from './utils/globalFunctions';

let currentVisual;
let currentColor = 0;

function updateColorType(index) {
  let pickerVisuals = $('.styles_hero-visual');

  // Reset
  pickerVisuals.hide();
  pickerVisuals.find('img').hide();
  pickerVisuals.each(function () {
    $(this).find('img').eq(currentColor).show();
  });

  currentVisual = pickerVisuals.eq(index);
  currentVisual.css('display', 'flex');
}

function initColorPicker() {
  let pickerList = $('.styles_hero-color_list');
  let pickerItem = $('.styles_hero-color_item');

  pickerList.find(pickerItem).on('click', function () {
    let index = $(this).index();

    currentColor = index;
    currentVisual.find('img').hide();
    currentVisual.find('img').eq(currentColor).fadeIn();
  });
}

// Sample data for swiperInstances, specific to this page
const swiperInstances = [
  [
    '.section_styles-hero',
    '.swiper-tabs',
    'tabs-slider',
    {
      slidesPerView: 'auto',
      loop: true,
      threshold: 20,
      slideToClickedSlide: true,
      on: {
        init: () => {
          updateColorType(0);
          initColorPicker();
        },
        slideChange: (swiper) => {
          updateColorType(swiper.realIndex);
        },
      },
    },
    'all',
  ],
];

// Initialize swipers with instances specific to this page
initSwipers(swiperInstances);
