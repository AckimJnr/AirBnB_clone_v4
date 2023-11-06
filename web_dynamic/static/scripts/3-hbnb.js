$(document).ready(function() {
  const updateApiStatus = () => {
    const url = 'http://127.0.0.1:5001/api/v1/status/';
    $.get(url, function (res) {
      $('#api_status').toggleClass('available', res.status === 'OK');
      console.log(res);
    });
  };

  setInterval(updateApiStatus, 35000);

  let amenityCheck = {};
  $('input:checkbox').on('change', function() {
    const id = $(this).data('id');
    const name = $(this).data('name');
    if ($(this).is(':checked')) {
      amenityCheck[id] = name;
    } else {
      delete amenityCheck[id];
    }
    $('.amenities h4').text(Object.values(amenityCheck).join(', '));
  });

  const getPlaces = function() {
    $.ajax({
      type: 'POST',
      contentType: 'application/json',
      url: 'http://localhost:5001/api/v1/places_search/',
      data: '{}',
      dataType: 'json',
      success: function(places) {
        $('.places').html(places.map(renderPlace).join(''));
      }
    });
  };

  const renderPlace = function(place) {
    return `
      <article>
        <div class="title_box">
          <h2>${place.name}</h2>
          <div class="price_by_night">${place.price_by_night}</div>
        </div>
        <div class="information">
          <div class="max_guest"><br>${place.max_guest} Guests</div>
          <div class="number_rooms"><br>${place.number_rooms} Bedrooms</div>
          <div class="number_bathrooms"><br>${place.number_bathrooms} Bathroom</div>
        </div>
        <div class="description">${place.description}</div>
      </article>
    `;
  };

  updateApiStatus();
  getPlaces();
});
