import tensorflow as tf
import tensorflowjs as tfjs

# Load your existing model
model = tf.keras.models.load_model('C:/Users/thebu/Desktop/TransLogi/TransLogi_Traffic_Prediction/src/modeling/traffic_delay_model.h5')

# Save the model in TensorFlow.js format
tfjs.converters.save_keras_model(model, 'C:/Users/thebu/Desktop/TransLogi/TransLogi_Traffic_Prediction/backend/src/models/traffic_delay_model.json')