const { getPredictions } = require('../services/predictionService');

exports.handlePredictionRequest = async (req, res) => {
    try {
        const { addresses } = req.body;
        const predictions = await getPredictions(addresses);
        res.status(200).json(predictions);
    } catch (error) {
        res.status(500).json({ error: 'Prediction failed' });
    }
};
