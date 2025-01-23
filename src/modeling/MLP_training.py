import tensorflow as tf
import pandas as pd
from tensorflow.keras.models import Sequential # type: ignore
from tensorflow.keras.layers import Dense, Dropout # type: ignore
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import root_mean_squared_error
import matplotlib.pyplot as plt

# Load in the data
df = pd.read_csv('./data/cleaned_data.csv')

# Split data into train and test sets
relevant_features = ['predicted_traffic', 'visibility_mi', 'time_float', 'average_city_delay','composite_feature']
target = 'delayfromtypicaltraffic_mins'

X = df[relevant_features]
y = df[target]

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# Build the Neural Network
model = Sequential([
    Dense(128, activation='relu', input_shape=(X_train_scaled.shape[1],)),
    Dropout(0.1),  
    Dense(64, activation='relu'),
    Dropout(0.2),
    Dense(32, activation='relu'),
    Dropout(0.1),
    Dense(16, activation='relu'),
    Dense(1)  
])

# Compile the model
model.compile(optimizer='adam', loss='mse', metrics=['mae'])

# Train the model
history = model.fit(
    X_train_scaled, y_train,
    validation_split=0.35,  
    epochs=15,
    batch_size=64,
    verbose=1
)

# Visualize Training
plt.figure(figsize=(10, 6))
plt.plot(history.history['loss'], label='Training Loss')
plt.plot(history.history['val_loss'], label='Validation Loss')
plt.xlabel('Epochs')
plt.ylabel('Loss (MSE)')
plt.title('Training and Validation Loss')
plt.legend()
plt.grid()
plt.show()

# Evaluate the model on the test set
y_pred_nn = model.predict(X_test_scaled)
rmse_nn = root_mean_squared_error(y_test, y_pred_nn)
print(f"Neural Network RMSE: {rmse_nn}")

model.save('traffic_delay_model.h5')
print("Model saved as traffic_delay_model.h5")