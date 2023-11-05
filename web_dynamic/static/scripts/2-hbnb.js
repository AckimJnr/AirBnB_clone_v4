$(document).ready(function() {
  setInterval(() =>{

    const url = 'http://127.0.0.1:5001/api/v1/status/';

    $.get(url, function (res) {
      if (res.status === 'OK') {
        $('#api_status').addClass('available');
        console.log(res)
      } else {
        $('#api_status').removeClass('available');
      }
    });
  }, 35000);

  let amenity_check = [];
  $('input:checkbox').on('change', function(){
    const id = $(this).data('id');
    const name = $(this).data('name');
    if($(this).is(':checked')){
      amenity_check[id] = name;
    } else {
      delete amenity_check[id];
    }
    $('.amenities h4').text(Object.values(amenity_check).join(', '));
  });
});
