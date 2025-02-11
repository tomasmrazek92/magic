// FS Filter
window.fsAttributes.push([
  'cmsfilter',
  (filterInstances) => {
    // The callback passes a `filterInstances` array with all the `CMSFilters` instances on the page.
    const [filterInstance] = filterInstances;

    // The `renderitems` event runs whenever the list renders items after filtering.
    filterInstance.listInstance.on('renderitems', function () {
      let entries = filterInstance.filtersData[0].values.size;
      if (entries >= 1) {
        // If filters are active, execute this block
        $('.p-gallery_cms-wrap').hide();
        $('.p-gallery_detail-wrap').css('display', 'flex');
      } else {
        // If no filters are active, execute this block
        $('.p-gallery_cms-wrap').show();
        $('.p-gallery_detail-wrap').hide();
      }
    });
  },
]);

let searchInput = $('.search_input');

// Create a function to monitor input changes
function monitorSearchInput() {
  searchInput.on('input', function () {
    let currentValue = $(this).val().toLowerCase().trim();

    // Loop through all menu links
    $('.p-gallery_menu-link').each(function () {
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
