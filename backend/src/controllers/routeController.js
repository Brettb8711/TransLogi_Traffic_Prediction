const { optimizeRoutes } = require('../services/routeService');

exports.handleRouteRequest = async (req, res) => {
    try {
        const { addresses } = req.body;
        const routes = await optimizeRoutes(addresses);
        res.status(200).json(routes);
    } catch (error) {
        res.status(500).json({ error: 'Route optimization failed' });
    }
};
