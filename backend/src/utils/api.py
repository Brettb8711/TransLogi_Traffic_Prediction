from flask import Flask, request, jsonify
import tensorflow as tf
import numpy as np

app = Flask(__name__)

# Register custom objects
def mse(y_true, y_pred):
    return tf.keras.losses.MeanSquaredError()(y_true, y_pred)

# Register the custom object in the global custom objects dictionary
tf.keras.utils.get_custom_objects()['mse'] = mse

# Load your existing model with custom objects
model = tf.keras.models.load_model(
    'C:/Users/thebu/Desktop/TransLogi/TransLogi_Traffic_Prediction/src/modeling/traffic_delay_model.h5',
    custom_objects={'mse': mse}
)

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    input_features = np.array(data['input_features']).reshape(1, -1)
    predictions = model.predict(input_features)
    return jsonify({'prediction': predictions[0].tolist()})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001)