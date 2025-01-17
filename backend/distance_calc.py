# test_backend.py
import json
from geopy.geocoders import Nominatim
import osmnx as ox
import networkx as nx
import matplotlib

def calculate_route_and_distance(origin_coords, destination_coords):
    # Get the graph for the area
    G = ox.graph_from_point(origin_coords, dist=3000, network_type='drive')
    fig, ax = ox.plot.plot_graph(G)

    # Find nearest nodes on the graph
    origin_node = ox.distance.nearest_nodes(G, origin_coords[1], origin_coords[0])
    destination_node = ox.distance.nearest_nodes(G, destination_coords[1], destination_coords[0])

    # Calculate shortest route
    route = ox.routing.shortest_path(G, origin_node, destination_node)
    
    # Calculate route distance
    distance = ox.routing.route_to_gdf(G, route)["length"]

    return route, distance, G

def address_to_coordinates(address):
    # Create a geolocator object
    geolocator = Nominatim(user_agent="my_geocoder", timeout=10)

    # Address to geocode
    #address = "1600 Pennsylvania Ave NW, Washington, DC 20500"

    # Geocode the address
    location = geolocator.geocode(address)

    if location:
        return (location.latitude, location.longitude)
    else:
        raise ValueError(f"Address '{address}' could not be geocoded.")

# Test the function with an example input
if __name__ == "__main__":
    # Example input JSON data (simulating a POST request)
    example_input = {
        "warehouse": "145 W Broadway, New York, NY 10013",
        "destination": "200 E 32nd St, New York, NY 10016"
    }

    warehouse_address = example_input['warehouse']
    destination_address = example_input['destination']

    # Convert addresses to coordinates
    warehouse_coords = address_to_coordinates(warehouse_address)
    destination_coords = address_to_coordinates(destination_address)

    # Placeholder logic for route optimization
    route, distance, graph = calculate_route_and_distance(warehouse_coords, destination_coords)

    fig, ax = ox.plot.plot_graph_route(graph, route, node_size=0)
