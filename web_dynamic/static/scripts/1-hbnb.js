$(document).ready(function() {
  let amenity_check = [];
  $('input:checkbox').on('change', function() {
    const id = $(this).data('id');
    const name = $(this).data('name');
    if($(this).is(':checked')) {
      amenity_check[id] = name;
    } else {
      delete amenity_check[id];
    }
    $('.amenities h4').text(Object.values(amenity_check).join(', '));
  });
});
