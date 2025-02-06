const axios = require('axios');
const { getLatLong } = require('../utils/geocode');

const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;

exports.getOptimalRoutes = async (warehouses, orders, trucks) => {
    const shipments = [];
    const vehicles = [];

    // Create shipments
    for (let i = 0; i < orders.length; i++) {
        const warehouse = warehouses.find(w => w.product === orders[i].product);
        if (warehouse) {
            const pickupLatLong = await getLatLong(warehouse.address);
            const deliveryLatLong = await getLatLong(orders[i].delivery);

            shipments.push({
                pickups: [
                    {
                        arrivalLocation: {
                            latitude: pickupLatLong.latitude,
                            longitude: pickupLatLong.longitude
                        },
                        duration: "250s"
                    }
                ],
                deliveries: [
                    {
                        arrivalLocation: {
                            latitude: deliveryLatLong.latitude,
                            longitude: deliveryLatLong.longitude
                        },
                        duration: "250s"
                    }
                ],
                loadDemands: {
                    weightKg: {
                        amount: orders[i].weight * 1000
                    }
                }
            });
        }
    }

    // Create vehicles
    for (let i = 0; i < trucks.length; i++) {
        const truckLatLong = await getLatLong(trucks[i].warehouse);

        vehicles.push({
            startLocation: {
                latitude: truckLatLong.latitude,
                longitude: truckLatLong.longitude
            },    
            endLocation: {
                latitude: truckLatLong.latitude,
                longitude: truckLatLong.longitude
            },    
            loadLimits: {
                weightKg:{
                  maxLoad: trucks[i].loadCapacity * 1000
                }
            },
            costPerKilometer: trucks[i].costPerMile
        });
    }

    // Create the start and end time for the optimization
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(7, 0, 0, 0);
    const globalStartTime = tomorrow.toISOString();

    const endOfTomorrow = new Date(tomorrow);
    endOfTomorrow.setHours(17, 0, 0, 0);
    const globalEndTime = endOfTomorrow.toISOString();

    // Create the request body
    const requestBody = {
        populatePolylines: true,
        populateTransitionPolylines: true,
        model: {
            globalStartTime,
            globalEndTime,
            shipments,
            vehicles
        }
    };
    
    // Get access token
    const accessToken = await getAccessToken();

    // Save the request url
    const url = `https://routeoptimization.googleapis.com/v1/projects/{ProjectName}:optimizeTours`;

    // Fetch the routes from Google Maps API
    try {
        const response = await axios.post(url, requestBody, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        });
        return response.data.routes;
    } catch (error) {
        console.error('Error fetching routes from Google Maps API:', error);
        throw new Error('Error fetching routes from Google Maps API');
    }
};

// Function to get access token
const getAccessToken = async () => {
    const { execSync } = require('child_process');
    try {
        const token = execSync('gcloud auth application-default print-access-token').toString().trim();
        return token;
    } catch (error) {
        console.error('Error fetching access token:', error);
        throw new Error('Error fetching access token');
    }
};