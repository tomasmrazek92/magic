$(document).ready(() => {
  const navbar = $('.navbar');
  const scrollHeight = $(navbar).height();

  window.onscroll = () => {
    if (navbar.length && $(window).width() < 992) {
      if (window.scrollY > scrollHeight / 2) {
        if (!navbar.hasClass('fixed')) {
          navbar.addClass('fixed');
        }
      } else {
        if (navbar.hasClass('fixed')) {
          navbar.removeClass('fixed');
        }
      }
    }
  };

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
});
