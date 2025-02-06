const { saveWarehouse, saveTruck, saveOrder } = require('../models/trafficModel');
const { getOptimalRoutes } = require('../services/routeService');
const { getNextRequestNum } = require('./databaseController');
const { Route, Prediction } = require('../models/trafficModel');
const { getWeatherData } = require('../services/weatherService');
const {extractAndDecodePolylines} = require('../utils/polyline_decoder'); 
const { predictTimeDelay } = require('../services/predictionService');
const cityDelayMapping = require('../../../data/city_delay_mapping.json');
const axios = require('axios');

exports.optimizeRoutes = async (req, res) => {
    const { warehouses, trucks, orders } = req.body;
    const requestNum = await getNextRequestNum();

    try {
        // Save warehouse addresses to the database
        for (let i = 0; i < warehouses.length; i++) {
            await saveWarehouse(warehouses[i].address, warehouses[i].product, requestNum);
        }

        // Save truck addresses to the database
        for (let i = 0; i < trucks.length; i++) {
            await saveTruck(trucks[i].warehouse, trucks[i].costPerMile, trucks[i].loadCapacity, requestNum);
        }

        // Save orders to the database
        for (let i = 0; i < orders.length; i++) {
            await saveOrder(orders[i].product, orders[i].delivery, orders[i].weight, 20, requestNum); // Assuming penalty is 20 for now
        }

        // Call Google Route Optimization API
        const routes = await getOptimalRoutes(warehouses, orders, trucks);

        // Extract and decode polylines
        const polylines = extractAndDecodePolylines({routes});

        // Get city delay mapping
        const cityDelayMap = {};
        Object.keys(cityDelayMapping.city).forEach((key) => {
            const cityName = cityDelayMapping.city[key];
            const averageDelay = cityDelayMapping.average_city_delay[key];
            cityDelayMap[cityName] = averageDelay;
        });

        // Save routes to the database
        for (let i = 0; i < routes.length; i++) {
            await Route.create({
                request_num: requestNum,
                vehicle_start_time: routes[i].vehicleStartTime,
                vehicle_end_time: routes[i].vehicleEndTime,
                visits: routes[i].visits,
                transitions: routes[i].transitions,
                metrics: routes[i].metrics,
                route_costs: routes[i].routeCosts,
                route_total_cost: routes[i].routeTotalCost
            });
            
            
            // Process each visit
            for (let j = 0; j < routes[i].visits.length; j++) {
                const visit = routes[i].visits[j];
                const city = await getCityFromLatLong(polylines[0][0][0],polylines[0][0][1] ); // Implement this function  
                const averageCityDelay = cityDelayMap[city];
                const delayDurationStr = routes[i].metrics.delayDuration;
                const predictedTraffic = parseInt(delayDurationStr.replace('s', ''), 10); // Remove 's' and convert to integer
                const timeFloat = convertTimeToFloat(visit.startTime); // Implement this function
                //const weatherData = await getWeatherData(city);
                const visibilityMi = 5; // Convert meters to miles

                const inputFeatures = [
                    predictedTraffic,
                    visibilityMi,
                    timeFloat,
                    averageCityDelay,
                    0.20809643 * predictedTraffic - 0.01019295 * visibilityMi - 0.04359078 * timeFloat + 1.08262547 * averageCityDelay
                ];

                const unexpectedTraffic = await predictTimeDelay(inputFeatures);

                // Save prediction to the database
                await Prediction.create({
                    request_num: requestNum,
                    city,
                    predicted_traffic: predictedTraffic,
                    visibility_mi: visibilityMi,
                    time_float: timeFloat,
                    average_city_delay: averageCityDelay,
                    unexpected_traffic: unexpectedTraffic[0]
                });
            }

        }

        res.status(200).json({ message: 'Routes optimized and saved successfully', polylines });
    } catch (error) {
        console.error('Error optimizing routes:', error);
        res.status(500).json({ error: 'Error optimizing routes' });
    }
};

// Implement getCityFromLatLong and convertTimeToFloat functions
const getCityFromLatLong = async (latitude, longitude) => {
    // Use a geocoding API to get the city from latitude and longitude
    // Example: Use Google Maps Geocoding API
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${process.env.GOOGLE_MAPS_API_KEY}`;
    const response = await axios.get(url);
    const city = response.data.results[0].address_components.find(component => component.types.includes('locality')).long_name;
    return city;
};


const convertTimeToFloat = (timeString) => {
    const date = new Date(timeString);
    return date.getHours() + date.getMinutes() / 60 + date.getSeconds() / 3600;
};

