import { initSwipers } from './utils/globalFunctions';

$(document).ready(function () {
  let currentVisual;
  let currentColor = 0;
  let noColor = !$('.styles_hero-color_list').length;
  let noSwiper = !$('.section_styles-hero .swiper-tabs').length;

  function updateColorType(index) {
    let pickerVisuals = $('.styles_hero-visual');

    if (noColor) {
      pickerVisuals = pickerVisuals.find('img');
    }

    // Reset
    pickerVisuals.hide();
    pickerVisuals.find('img').hide();
    pickerVisuals.each(function () {
      $(this).find('img').eq(currentColor).show();
    });

    currentVisual = pickerVisuals.eq(index);
    currentVisual.css('display', 'flex');

    // Count images in current visual and update color items
    const imgCount = currentVisual.find('img').length;

    // Check if the currently active color index is valid for this visual
    if (currentColor >= imgCount) {
      // Reset to the first color if current selection is out of range
      currentColor = 0;

      // Make sure we update the visual to show the first color
      currentVisual.find('img').hide();
      currentVisual.find('img').eq(currentColor).show();
    }

    // Update color item visibility based on available options
    $('.styles_hero-color_item').each(function (i) {
      if (i < imgCount) {
        $(this).show();
      } else {
        $(this).hide();
      }
    });

    // Reset active state to match currentColor
    $('.styles_hero-color_item').find('.styles_hero-color_item-inner').removeClass('is-active');
    $('.styles_hero-color_item')
      .eq(currentColor)
      .find('.styles_hero-color_item-inner')
      .addClass('is-active');

    // Update the label
    const activeItemLabel = $('.styles_hero-color_item')
      .eq(currentColor)
      .find('.styles_hero-color_item-label')
      .text();
    $('.styles_hero-color_item-label.cc-top').find('p').text(activeItemLabel);
  }

  function initColorPicker() {
    let pickerList = $('.styles_hero-color_list');
    let pickerItem = $('.styles_hero-color_item');
    let circle = '.styles_hero-color_item-inner';
    let label = '.styles_hero-color_item-label';

    $(circle).eq(0).addClass('is-active');

    pickerList.find(pickerItem).on('click', function () {
      let index = $(this).index();

      // Active Class
      pickerItem.find(circle).removeClass('is-active');
      pickerItem.eq(index).find(circle).addClass('is-active');

      // Label
      $(label).filter('.cc-top').find('p').text($(this).find(label).text());

      // Visual
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
        threshold: 100,
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

  // Fallback for no slider configuration
  if (noSwiper) {
    noSwiper = true;
    updateColorType(0);
    initColorPicker();
  }

  // Initialize swipers with instances specific to this page
  initSwipers(swiperInstances);
});
