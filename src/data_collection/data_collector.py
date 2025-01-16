import requests
import sqlalchemy
from sqlalchemy import create_engine, Column, Integer, String, Float, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os
import datetime

# PostgreSQL connection string
DATABASE_URL = "postgresql+psycopg2://postgres:Sp33zer1993!@localhost:5432/translogi"

# Initialize engine, base, and session
engine = create_engine(DATABASE_URL)

try:
    with engine.connect() as connection:
        print("Connected to the database successfully!")
except Exception as e:
    print(f"Error connecting to the database: {e}")

Base = sqlalchemy.orm.declarative_base()
Session = sessionmaker(bind=engine)
session = Session()

class DeliveryTransaction(Base):
    __tablename__ = 'delivery_transactions'

    id = Column(Integer, primary_key=True)
    order_id = Column(String, unique=True, nullable=False)
    customer_location = Column(String, nullable=False)
    delivery_time = Column(DateTime, nullable=False)
    order_priority = Column(String, nullable=False)
    distance_km = Column(Float, nullable=False)
    weather_conditions = Column(String)

# Create table in the database
#Base.metadata.create_all(engine)

def fetch_traffic_data(api_key, location, destination):
    url = f"https://maps.googleapis.com/maps/api/directions/json?departure_time={datetime.now()}&destination={destination}&origin'{location}&key={api_key}"
    response = requests.get(url)
    if response.status_code == 200:
        return response.json()
    else:
        print(f"Error fetching traffic data: {response.status_code}")
        return None

def save_transaction_data(session, data):
    transaction = DeliveryTransaction(
        order_id=data["order_id"],
        customer_location=data["customer_location"],
        delivery_time=data["delivery_time"],
        order_priority=data["order_priority"],
        distance_km=data["distance_km"],
        weather_conditions=data["weather_conditions"]
    )
    session.add(transaction)
    session.commit()

if __name__ == "__main__":
    api_key = os.getenv('GOOGLE_MAPS_API_KEY')
    location = "40.7128,-74.0060"  
    destination = "40.7538,-74.0020"
    traffic_data = fetch_traffic_data(api_key, location, destination)

    if traffic_data:
        # Example parsed data to save
        parsed_data = {
            "order_id": "12345",
            "customer_location": "40.7128,-74.0060",
            "delivery_time": "2025-01-16 12:00:00",
            "order_priority": "High",
            "distance_km": 10.5,
            "weather_conditions": "Clear"
        }
        save_transaction_data(session, parsed_data)
