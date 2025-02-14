/**
 * List.js Search (Once)
 */

function initListSearch() {
  const searchModal = document.querySelector('.dash-search__modal');
  const searchInput = document.querySelector('.dash-search-field__input');
  const notFoundMessage = document.querySelector('.dash-search__not-found');
  const searchResultValue = document.querySelector('#search-result-input-value');
  const body = document.querySelector('body');

  const resourcesIcon =
    '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M21 16V8c0-.7-.4-1.4-1-1.7L13 2.2c-.6-.4-1.4-.4-2 0L4 6.2C3.4 6.6 3 7.2 3 8v8c0 .7.4 1.4 1 1.8l7 4c.6.4 1.4.4 2 0l7-4c.6-.4 1-.9 1-1.8Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 22.1V12" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 12l8.7-5" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M3.3 7l8.7 5" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  const downloadIcon =
    '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 17V3" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M20 21H4" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M17 12L12 17L7 12" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  // Initialize List.js for resources
  const optionsResources = {
    valueNames: ['sr__title', { name: 'sr__click', attr: 'href' }, 'sr__type', 'sr__keywords'],
    item: `<li class="sr__li"><a class="sr__click" href=""><div class="sr__start"><div class="sr__icon">${resourcesIcon}</div><p class="sr__title"></p></div><div class="sr__end"></div></a></li>`,
    listClass: 'dash-search__results-list-resources',
    fuzzySearch: {
      searchClass: 'dash-search-field__input',
      location: 0,
      distance: 100,
      threshold: 0.3,
      multiSearch: true,
    },
  };

  const valuesResourcesElements = document.querySelectorAll(
    '[data-sm-list="resources"] [sm-resource-slug]'
  );
  const valuesResources = Array.from(valuesResourcesElements)
    .filter(
      (element) =>
        (element.hasAttribute('sm-type-vault') &&
          element.getAttribute('sm-type-vault') === 'true') ||
        (element.hasAttribute('sm-type-video') &&
          element.getAttribute('sm-type-video') === 'true') ||
        (element.hasAttribute('sm-type-basics') &&
          element.getAttribute('sm-type-basics') === 'true')
    )
    .map((element) => ({
      sr__title: element.getAttribute('sm-resource-title'),
      sr__click: element.querySelector('a').getAttribute('href'),
      sr__type: element.getAttribute('data-resource-type'),
      sr__keywords: element.getAttribute('sm-resource-keywords'),
    }));
  const listResources = new List('list-resources', optionsResources, valuesResources);

  // Initialize List.js for icons
  const optionsIcons = {
    valueNames: ['sr__title', { name: 'sr__click', attr: 'data-svg' }, 'sr__keywords', 'sr__icon'],
    item: `<li class="sr__li"><div class="sr__click" data-svg=""><div class="sr__start"><div class="sr__icon" data-svg-src></div><p class="sr__title"></p></div><div class="sr__end"><div class="dash-command" data-svg-copy><span class="dash-command__text">Copy</span></div><div class="dash-command is--download" data-svg-download>${downloadIcon}</div></div></div></li>`,
    listClass: 'dash-search__results-list-icons',
    fuzzySearch: {
      searchClass: 'dash-search-field__input',
      location: 0,
      distance: 100,
      threshold: 0.3,
      multiSearch: true,
    },
  };

  // const valuesIconsElements = document.querySelectorAll('[data-sm-list="icons"] [sm-icon-slug]');
  const valuesIconsElements = document.querySelectorAll('[data-sm-list="icons"] [sm-icon-slugX]');
  const valuesIcons = Array.from(valuesIconsElements).map((element) => ({
    sr__title: element.getAttribute('sm-icon-title'),
    sr__click: element.getAttribute('sm-icon-slug'),
    sr__keywords: element.getAttribute('sm-icon-keywords'),
    sr__icon: element.getAttribute('sm-icon-svg'),
  }));
  const listIcons = new List('list-icons', optionsIcons, valuesIcons);

  let highlightedIndex = -1; // Track the currently highlighted item's index

  // Add an event listener for the search input
  searchInput.addEventListener('input', function () {
    const query = searchInput.value.trim();

    // Remove previous highlight (if active)
    if (body.getAttribute('data-dash-search') === 'active') {
      removeHighlight();
      highlightedIndex = -1; // Reset highlight index
    }

    // Update the search result value
    searchResultValue.textContent = query;

    if (query === '') {
      // If the input is empty, clear both lists and hide the not-found message
      listResources.search('not-match-anything-unique-99', ['name']);
      listIcons.search('not-match-anything-unique-99', ['name']);
      notFoundMessage.style.display = 'none'; // Hide not-found message
      searchModal.setAttribute('data-search-scroll-status', 'not-active'); // Input is empty
      return;
    }

    searchModal.setAttribute('data-search-scroll-status', 'active'); // Input has text

    // Perform search on both lists
    listResources.fuzzySearch(query);
    listIcons.fuzzySearch(query);

    // Limit Icons list to 10 results
    if (listIcons.matchingItems.length > 10) {
      listIcons.show(1, 10); // Show only the first 10 items
    }

    // Display or hide the "not-found" message
    const resourcesMatches = listResources.matchingItems.length;
    const iconsMatches = listIcons.matchingItems.length;

    if (resourcesMatches === 0 && iconsMatches === 0) {
      notFoundMessage.style.display = 'block'; // Show not-found message
    } else {
      notFoundMessage.style.display = 'none'; // Hide not-found message

      // Highlight the first result if active
      if (body.getAttribute('data-dash-search') === 'active') {
        const firstResult = document.querySelector(
          '.dash-search__results-list-resources .sr__li a, .dash-search__results-list-icons .sr__li a'
        );
        if (firstResult) {
          highlightItem(firstResult);
          highlightedIndex = 0; // Set the first result as the highlighted index
        }
      }
    }
  });

  // Arrow key navigation
  document.addEventListener('keydown', (event) => {
    if (body.getAttribute('data-dash-search') !== 'active') return;

    const results = document.querySelectorAll(
      '.dash-search__results-list-resources .sr__li a, .dash-search__results-list-icons .sr__li a'
    );

    if (results.length === 0) return;

    if (event.key === 'ArrowDown') {
      // Move highlight down
      event.preventDefault();
      highlightedIndex = (highlightedIndex + 1) % results.length;
      highlightItem(results[highlightedIndex]);
    } else if (event.key === 'ArrowUp') {
      // Move highlight up
      event.preventDefault();
      highlightedIndex = (highlightedIndex - 1 + results.length) % results.length;
      highlightItem(results[highlightedIndex]);
    }
  });

  // Highlight an item visually without taking focus
  function highlightItem(item) {
    removeHighlight(); // Ensure only one item is highlighted
    item.classList.add('is--highlight'); // Add highlight class for visual indication
    item.scrollIntoView({ block: 'nearest' }); // Ensure the highlighted item is visible
  }

  // Remove the highlight class from all items
  function removeHighlight() {
    const highlighted = document.querySelector('.is--highlight');
    if (highlighted) {
      highlighted.classList.remove('is--highlight');
    }
  }

  // Reset function for search
  window.resetSearch = function () {
    body.setAttribute('data-dash-search', 'not-active');

    setTimeout(() => {
      searchInput.value = ''; // Clear the input field
      removeHighlight(); // Remove any highlights
      searchModal.setAttribute('data-search-scroll-status', 'not-active'); // Hide the search modal
      notFoundMessage.style.display = 'none'; // Hide not-found message
      searchInput.blur(); // Blur the search input

      // Clear search results
      listResources.search('not-match-anything-unique-99', ['title']);
      listIcons.search('not-match-anything-unique-99', ['title']);
    }, 200); // Small delay ensures visibility
  };

  // Handle "Enter" key press to activate the highlighted link
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && body.getAttribute('data-dash-search') === 'active') {
      const highlighted = document.querySelector('.is--highlight');
      if (highlighted) {
        highlighted.click(); // Simulate click on the highlighted link
        event.preventDefault(); // Prevent default form submission or focus shift
      }
    }
  });

  // Clear both lists on page load
  listResources.search('not-match-anything-unique-99', ['title']);
  listIcons.search('not-match-anything-unique-99', ['title']);
}
