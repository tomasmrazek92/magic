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
      VideoModal.init();
      let entries = filterInstance.filtersData[0].values.size;
      console.log(entries);
      if (entries >= 1) {
        // If filters are active, execute this block
        $('[data-filter-default]').hide();
        $('[data-filter-results]').css('display', 'flex');
        $('.search_clear').css('display', 'flex');
      } else {
        // If no filters are active, execute this block
        $('[data-filter-default]').show();
        $('[data-filter-results]').hide();
        $('.search_clear').hide();
      }
    });
  },
]);

// FS Load
window.fsAttributes.push([
  'cmsload',
  (listInstances) => {
    // The callback passes a `filterInstances` array with all the `CMSFilters` instances on the page.
    const [listInstance] = listInstances;

    // The `renderitems` event runs whenever the list renders items after switching pages.
    listInstance.on('renderitems', (renderedItems) => {
      VideoModal.init();
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

let player;

const VideoModal = {
  init: function () {
    this.bindEvents();
  },

  bindEvents: function () {
    const self = this;
    $('[data-video-item]').on('click', function () {
      self.handleVideoClick($(this));
    });
    $('.video-modal_close').on('click', function () {
      self.closeModal();
    });
    $('.video-modal_close-btn').on('click', function () {
      self.closeModal();
    });
    $('.video-modal').on('click', function (e) {
      if (e.target === this) {
        self.closeModal();
      }
    });
    $(document).on('keydown', function (e) {
      if (e.key === 'Escape' && $('.video-modal').is(':visible')) {
        self.closeModal();
      }
    });
  },

  handleVideoClick: function ($item) {
    const mp4Source = $item.attr('data-mp4-source');
    const webmSource = $item.attr('data-webm-source');
    const posterSrc = $item.attr('data-poster-src');

    this.destroyExistingPlayer();
    this.setupVideoSources(mp4Source, webmSource, posterSrc);
    this.initializePlayer();
  },

  destroyExistingPlayer: function () {
    if (player) {
      const videoElement = player.media;
      if (videoElement) {
        videoElement.pause();
        videoElement.currentTime = 0;
      }
      player.destroy();
      player = null;
    }
  },

  setupVideoSources: function (mp4Source, webmSource, posterSrc) {
    const $video = $('.video-modal').find('video');

    $video.empty().removeAttr('poster');

    if (webmSource) {
      $video.append(`<source src="${webmSource}" type="video/webm">`);
    }
    if (mp4Source) {
      $video.append(`<source src="${mp4Source}" type="video/mp4">`);
    }
    if (posterSrc) {
      $video.attr('poster', posterSrc);
    }

    $video[0].load();
  },

  initializePlayer: function () {
    const self = this;
    const $modal = $('.video-modal');
    const $video = $modal.find('video');

    setTimeout(function () {
      player = new Plyr($video[0], {
        controls: [
          'play-large',
          'play',
          'progress',
          'current-time',
          'mute',
          'volume',
          'fullscreen',
        ],
        autoplay: false,
        loop: { active: true },
        ratio: null,
      });

      $('.video-modal .plyr').css({
        'object-fit': 'contain',
        width: '100%',
        height: '100%',
      });

      self.showModal($modal);
    }, 50);
  },

  showModal: function ($modal) {
    $modal.fadeIn(300, function () {
      setTimeout(function () {
        if (player) {
          player.play();
        }
      }, 100);
    });
  },

  closeModal: function () {
    const $modal = $('.video-modal');

    if (player) {
      const videoElement = player.media;
      if (videoElement) {
        videoElement.pause();
        videoElement.currentTime = 0;
      }
    }

    $modal.fadeOut(300, function () {
      VideoModal.destroyExistingPlayer();
    });
  },
};

$(document).ready(function () {
  VideoModal.init();
});
