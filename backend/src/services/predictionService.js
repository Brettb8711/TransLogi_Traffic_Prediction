const axios = require('axios');

exports.predictTimeDelay = async (inputFeatures) => {
    try {
        const response = await axios.post('http://127.0.0.1:5001/predict', {
            input_features: inputFeatures
        });
        return response.data.prediction;
    } catch (error) {
        console.error('Error fetching prediction from Flask API:', error);
        throw new Error('Error fetching prediction from Flask API');
    }
};
