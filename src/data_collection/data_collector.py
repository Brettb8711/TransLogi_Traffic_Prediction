import requests
from sqlalchemy import create_engine, Column, Integer, String, Float, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os

# PostgreSQL connection string
DATABASE_URL = "postgresql+psycopg2://username:password@localhost:5432/translogi"

# Initialize engine, base, and session
engine = create_engine(DATABASE_URL)
Base = declarative_base()
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
Base.metadata.create_all(engine)

def fetch_traffic_data(api_key, location):
    url = f"https://maps.googleapis.com/maps/api/traffic/json?location={location}&key={api_key}"
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
    location = "40.7128,-74.0060"  # Example: New York City coordinates
    traffic_data = fetch_traffic_data(api_key, location)

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
