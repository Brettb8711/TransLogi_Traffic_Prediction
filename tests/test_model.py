import tensorflow as tf
import numpy as np

# Define the custom loss function
def mse(y_true, y_pred):
    return tf.keras.losses.MeanSquaredError()(y_true, y_pred)

# Register the custom object in the global custom objects dictionary
tf.keras.utils.get_custom_objects()['mse'] = mse

# Load the model
model = tf.keras.models.load_model(
    'C:/Users/thebu/Desktop/TransLogi/TransLogi_Traffic_Prediction/src/modeling/traffic_delay_model.h5',
    custom_objects={'mse': mse}
)

# Test the model with sample input data
input_features = np.array([[0, 50, 12.5, 3, 1.2]])  # Example input features
predictions = model.predict(input_features)
print('Predictions:', predictions)