const axios = require('axios');

exports.getOptimalRoutes = async (warehouses, deliveries, trucks) => {
    const GOOGLE_MAPS_API_KEY = 'AIzaSyDnu-pSM7KCDow0XodHoYjtFsIRyVOQkkY';

    const routes = [];
    for (let i = 0; i < warehouses.length; i++) {
        const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${warehouses[i]}&destination=${deliveries[i]}&key=${GOOGLE_MAPS_API_KEY}`;
        try {
            const response = await axios.get(url);
            routes.push(response.data.routes);
        } catch (error) {
            console.error('Error fetching routes from Google Maps API:', error);
            throw new Error('Error fetching routes from Google Maps API');
        }
    }

    return routes;
};

