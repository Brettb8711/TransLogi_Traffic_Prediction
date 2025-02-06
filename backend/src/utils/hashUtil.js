const axios = require('axios');
const getCityFromLatLong = async (latitude, longitude) => {
    // Use a geocoding API to get the city from latitude and longitude
    // Example: Use Google Maps Geocoding API
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyCWYzAhMz2OO6upZ5i8PTHRXFkD8f-tlc8`;
    const response = await axios.get(url);
    const city = response.data.results[0].address_components.find(component => component.types.includes('locality')).long_name;
    return city;
};

getCityFromLatLong(37.7749, -122.4194).then(city => console.log(city));