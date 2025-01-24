const { queryDatabaseForRoutes, saveRoutesToDatabase } = require('../models/trafficModel');
const { fetchGoogleOptimizedRoutes } = require('../utils/googleApiUtil');

exports.optimizeRoutes = async (addresses) => {
    const cachedRoutes = await queryDatabaseForRoutes(addresses);
    if (cachedRoutes && isFresh(cachedRoutes.timestamp)) {
        return cachedRoutes;
    }

    const routes = await fetchGoogleOptimizedRoutes(addresses);
    await saveRoutesToDatabase(addresses, routes);
    return routes;
};
