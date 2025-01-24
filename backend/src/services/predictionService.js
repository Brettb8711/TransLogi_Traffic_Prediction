const { queryDatabaseForPredictions, savePredictionsToDatabase } = require('../models/trafficModel');

exports.getPredictions = async (addresses) => {
    const cachedPredictions = await queryDatabaseForPredictions(addresses);
    if (cachedPredictions && isFresh(cachedPredictions.timestamp)) {
        return cachedPredictions;
    }

    const predictions = await runMLModel(addresses); // ML model logic
    await savePredictionsToDatabase(addresses, predictions);
    return predictions;
};
