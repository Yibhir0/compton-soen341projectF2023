export function initLocationAutocomplete(setCoordinates) {
    const componentForm = [
      'address',
      'locality',
      'postal_code'
    ];
  
    const getFormInputElement = (component) => document.getElementById(component + '-input');
    
    const autocompleteInput = getFormInputElement('address');
    const autocomplete = new window.google.maps.places.Autocomplete(autocompleteInput, {
      fields: ["address_components", "geometry", "name"],
      types: ["address"],
    });
  
    autocomplete.addListener('place_changed', function () {
      const place = autocomplete.getPlace();
      if (!place.geometry) {
        window.alert('Location not found: \'' + place.name + '\'');
        return;
      }
      setCoordinates({
        latitude: place.geometry.location.lat(),
        longitude: place.geometry.location.lng(),
      });
      fillInAddress(place);
    });
  
    function fillInAddress(place) {
      const addressNameFormat = {
        'street_number': 'short_name',
        'route': 'long_name',
        'locality': 'long_name',
        'postal_code': 'short_name',
      };
      const getAddressComponent = function (type) {
        for (const component of place.address_components) {
          if (component.types[0] === type) {
            return component[addressNameFormat[type]];
          }
        }
        return '';
      };
      getFormInputElement('address').value = getAddressComponent('street_number') + ' ' + getAddressComponent('route');
      for (const component of componentForm) {
        if (component !== 'address') {
          getFormInputElement(component).value = getAddressComponent(component);
        }
      }
    }  
  }