const axios = require('axios');

const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;

const getLatLong = async (address) => {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${GOOGLE_MAPS_API_KEY}`;
    try {
        const response = await axios.get(url);
        const location = response.data.results[0].geometry.location;
        return {
            latitude: location.lat,
            longitude: location.lng
        };
    } catch (error) {
        console.error('Error fetching latitude and longitude:', error);
        throw new Error('Error fetching latitude and longitude');
    }
};

module.exports = {
    getLatLong
};