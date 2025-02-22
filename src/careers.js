// Prefill Role
$('[data-modal-target="join"]').on('click', function () {
  let role = $(this).closest('.w-dyn-item').find('[data-role="name"]').text();
  let input = $('.careers-role_form').find('input[name="position"]');
  input.val(role);
});
