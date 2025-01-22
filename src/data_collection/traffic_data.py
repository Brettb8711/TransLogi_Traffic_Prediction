import pandas as pd
from sqlalchemy import create_engine

DATABASE_URL = "postgresql+psycopg2://postgres:Sp33zer1993!@localhost:5432/translogi"
engine = create_engine(DATABASE_URL)

# Test connection
try:
    with engine.connect() as connection:
        print("Connected to the database successfully!")
except Exception as e:
    print(f"Error connecting to the database: {e}")

df = pd.read_csv('C:/Users/thebu/Downloads/us_congestion_2016_2022_sample_2m.csv/us_congestion_2016_2022_sample_2m.csv')
print("Data Loaded!")

df.rename(columns={
    'Distance(mi)': 'distance_mi',
    'DelayFromTypicalTraffic(mins)': 'DelayFromTypicalTraffic_mins',
    'DelayFromFreeFlowSpeed(mins)': 'DelayFromFreeFlowSpeed_mins',
    'Temperature(F)': 'Temperature_F',
    'WindChill(F)':'WindChill_F',
    'Humidity(%)':'Humidity_pct',
    'Pressure(in)': 'Pressure_in',
    'Visibility(mi)': 'Visibility_mi',
    'WindSpeed(mph)': 'WindSpeed_mph',
    'Precipitation(in)': 'Precipitation_in'
}, inplace=True)

df.columns = df.columns.str.lower()

#df.fillna(None, inplace=True) 
print("NaN replaced!")

# Insert the data into the PostgreSQL table
try:
    df.to_sql('traffic_data', engine, if_exists='append', index=False)
    print("Data inserted successfully!")
except Exception as e:
    print(f"An error occurred: {e}")