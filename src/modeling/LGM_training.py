import lightgbm as lgb
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.metrics import root_mean_squared_error
import matplotlib.pyplot as plt


df = pd.read_csv('./data/cleaned_data.csv')

# Relevant features and target
relevant_features = ['predicted_traffic', 'visibility_mi', 'time_float', 'average_city_delay','composite_feature']
target = 'delayfromtypicaltraffic_mins'

# Split data into train and test sets
X = df[relevant_features]
y = df[target]

X_train_full, X_test, y_train_full, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
X_train, X_val, y_train, y_val = train_test_split(X_train_full, y_train_full, test_size=0.35, random_state=42)

train_data = lgb.Dataset(X_train, label=y_train)
val_data = lgb.Dataset(X_val, label=y_val, reference=train_data)

# Train a LightGBM model
model = lgb.train(
    params={
        'objective': 'regression',
        'boosting_type': 'gbdt',
        'learning_rate': 0.1,
        'max_depth': -1,
        'metric': 'rmse',
    },
    train_set=train_data,
    valid_sets=[train_data, val_data],  
    valid_names=['training', 'validation'],
    num_boost_round=100,  # Maximum number of boosting iterations
    callbacks= [
        lgb.early_stopping(stopping_rounds= 10),  # Stop training if validation metric doesn't improve for 10 rounds
    ]
)

# Make predictions
y_pred = model.predict(X_test, num_iteration=model.best_iteration)

plt.figure(figsize=(10, 6))
plt.scatter(y_test, y_pred, alpha=0.6)
plt.plot([min(y_test), max(y_test)], [min(y_test), max(y_test)], color='red', linestyle='--', label='Ideal Prediction')
plt.xlabel('Actual Delay (minutes)')
plt.ylabel('Predicted Delay (minutes)')
plt.title('Predicted vs. Actual Delay')
plt.legend()
plt.grid()
plt.show()

# Evaluate the model
rmse = root_mean_squared_error(y_test, y_pred)
print(f"RMSE: {rmse}")

#model.save_model('./modeling/LGM.h5')
