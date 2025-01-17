from flask import Flask, request, jsonify
from flask_cors import CORS
from geopy.geocoders import Nominatim
import osmnx as ox
import networkx as nx

def calculate_route_and_distance(origin_coords, destination_coords):
    # Get the graph for the area
    G = ox.graph_from_point(origin_coords, dist=10000, network_type='drive')

    # Find nearest nodes on the graph
    origin_node = ox.distance.nearest_nodes(G, origin_coords[1], origin_coords[0])
    destination_node = ox.distance.nearest_nodes(G, destination_coords[1], destination_coords[0])

    # Calculate shortest route
    route = nx.shortest_path(G, origin_node, destination_node, weight='length')
    
    # Calculate route distance
    distance = sum(ox.utils_graph.get_route_edge_attributes(G, route, 'length'))

    return route, distance, G

def address_to_coordinates(address):
    geolocator = Nominatim(user_agent="logistics_app")
    location = geolocator.geocode(address)
    if location:
        return (location.latitude, location.longitude)
    else:
        raise ValueError(f"Address '{address}' could not be geocoded.")

app = Flask(__name__)

CORS(app)

@app.route('/get_route', methods=['POST'])
def get_routes():
    data = request.get_json()

    print("Received data:", data) 

    warehouse_address = data['warehouse']
    destination_address = data['destination']
    
    print("Warehouse:", warehouse_address)
    print("Destination:", destination_address)
    
    response = {
        "route": [
            [40.7128, -74.0060],  # Example coordinates for testing
            [40.7306, -73.9352]
        ]
    }
    return jsonify(response)
     # Convert addresses to coordinates
    #warehouse_coords = address_to_coordinates(warehouse_address)
    #destination_coords = address_to_coordinates(destination_address)

    # Placeholder logic for route optimization
    #route, distance, graph = calculate_route_and_distance(warehouse_coords, destination_coords)
    
    # Convert route to a list of coordinates
    route_coords = [(graph.nodes[node]['y'], graph.nodes[node]['x']) for node in route]
    
    return jsonify({
        'route': route_coords,
        'distance': distance
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
