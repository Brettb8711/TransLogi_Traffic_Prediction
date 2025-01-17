from geopy.geocoders import Nominatim

# Create a geolocator object
geolocator = Nominatim(user_agent="my_geocoder")

# Address to geocode
address = "1600 Pennsylvania Ave NW, Washington, DC 20500"

# Geocode the address
location = geolocator.geocode(address)

# Print the latitude and longitude
if location:
    print("Latitude:", location.latitude)
    print("Longitude:", location.longitude)
else:
    print("Address not found.")