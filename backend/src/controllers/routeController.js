const { saveAddresses } = require('../models/trafficModel');
const { getOptimalRoutes } = require('../services/routeService');

let requestCounter = 0;

exports.optimizeRoutes = async (req, res) => {
    const { warehouses, deliveries, trucks } = req.body;
    const requestNum = ++requestCounter;

    try {
        // Save warehouse addresses to the database
        for (let i = 0; i < warehouses.length; i++) {
            await saveAddresses('warehouse', warehouses[i], requestNum);
        }

        // Save delivery addresses to the database
        for (let i = 0; i < deliveries.length; i++) {
            await saveAddresses('delivery', deliveries[i], requestNum);
        }

        // Save truck addresses to the database
        for (let i = 0; i < trucks.length; i++) {
            await saveAddresses('truck', trucks[i].warehouse, requestNum);
        }

        res.status(200).json({ message: 'Addresses saved successfully'});
    } catch (error) {
        console.error('Error saving addresses:', error);
        res.status(500).json({ error: 'Error saving addresses' });
    }

    try {
        // Call Google Route Optimization API
        const routes = await getOptimalRoutes(warehouses, deliveries, trucks);
        res.status(200).json({ message: 'Routes optimized successfully', routes });
    } catch (error) {
        console.error('Error optimizing routes:', error);
        res.status(500).json({ error: 'Error optimizing routes' });
    }
};
