// FS Filter
window.fsAttributes.push([
  'cmsfilter',
  (filterInstances) => {
    // The callback passes a `filterInstances` array with all the `CMSFilters` instances on the page.
    const [filterInstance] = filterInstances;

    // Init
    $('.search_clear').hide();

    // The `renderitems` event runs whenever the list renders items after filtering.
    filterInstance.listInstance.on('renderitems', function () {
      let entries = filterInstance.filtersData[0].values.size;
      if (entries >= 1) {
        // If filters are active, execute this block
        $('[data-filter-default]').hide();
        $('[data-filter-results]').css('display', 'flex');
        $('.search_clear').show();
      } else {
        // If no filters are active, execute this block
        $('[data-filter-default]').show();
        $('[data-filter-results]').hide();
        $('.search_clear').hide();
      }
    });
  },
]);

let searchInput = $('.search_input');

if (!window.location.href.includes('/blog-categories/')) {
  // Create a function to monitor input changes
  function monitorSearchInput() {
    searchInput.on('input', function () {
      let currentValue = $(this).val().toLowerCase().trim();

      let menuLinks = $('.p-gallery-menu-link');

      // Loop through all menu links
      menuLinks.each(function () {
        let linkText = $(this).text().toLowerCase().trim();

        // If we find a match
        if (linkText === currentValue) {
          console.log('Match found:', linkText); // For debugging
          // You can add any action here when match is found
          // For example, add a class to the matching link:
          $(this).addClass('w--current');
          // Or trigger a click on it:
          // $(this).trigger('click');
        } else {
          $(this).removeClass('w--current');
        }
      });
    });
  }

  // Initialize the monitor
  monitorSearchInput();

  $('.p-gallery_menu-link').on('click', function () {
    let text = $(this).text();

    searchInput.val(text);
    searchInput[0].dispatchEvent(new Event('input', { bubbles: true }));
  });
}

// Animated Placeholder
function typingPlaceholder($input, words, options = {}) {
  const defaults = {
    typeSpeed: 100,
    wordDelay: 2000,
    eraseSpeed: 50,
  };

  const settings = { ...defaults, ...options };
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function type() {
    const currentWord = words[wordIndex];

    if (isDeleting) {
      // Erasing
      $input.attr('placeholder', currentWord.substring(0, charIndex));
      charIndex--;

      if (charIndex < 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        // Immediately start typing the next word
        setTimeout(type, settings.typeSpeed);
        return;
      }

      setTimeout(type, settings.eraseSpeed);
    } else {
      // Typing
      $input.attr('placeholder', currentWord.substring(0, charIndex));
      charIndex++;

      if (charIndex > currentWord.length) {
        isDeleting = true;
        // Only apply word delay when word is complete
        setTimeout(type, settings.wordDelay);
        return;
      }

      setTimeout(type, settings.typeSpeed);
    }
  }

  type();
}

if (typeof searchWords !== 'undefined') {
  typingPlaceholder(searchInput, searchWords);
}
