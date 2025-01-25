const tf = require('@tensorflow/tfjs-node');
const path = require('path');

const modelPath = path.join(__dirname, '../../src/modeling/src/modeling/traffic_delay_model.h5');

let model;

exports.loadModel = async () => {
    model = await tf.loadLayersModel(`file://${modelPath}`);
};

exports.predictTimeDelay = async (inputFeatures) => {
    if (!model) await this.loadModel();

    const inputTensor = tf.tensor([inputFeatures]);
    const predictions = model.predict(inputTensor);
    return predictions.dataSync()[0];
};
