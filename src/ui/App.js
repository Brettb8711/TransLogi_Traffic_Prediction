import React, { useState } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Polyline, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const App = () => {
  const [warehouse, setWarehouse] = useState("");
  const [destinations, setDestinations] = useState("");
  const [routes, setRoutes] = useState([]);
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setRoutes([]);

    try {
      const response = await axios.post("http://localhost:5000/optimize", {
        warehouse,
        destinations: destinations.split(",").map((d) => d.trim()),
      });
      setRoutes(response.data.optimized_routes); // Assuming backend sends this key
    } catch (err) {
      setError("Error fetching route data. Please try again.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Logistics Route Optimization</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Warehouse Location: </label>
          <input
            type="text"
            value={warehouse}
            onChange={(e) => setWarehouse(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Drop-off Locations (comma-separated): </label>
          <input
            type="text"
            value={destinations}
            onChange={(e) => setDestinations(e.target.value)}
            required
          />
        </div>
        <button type="submit">Optimize Routes</button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {routes.length > 0 && (
        <div style={{ marginTop: "20px" }}>
          <h2>Optimized Routes:</h2>
          <ul>
            {routes.map((route, index) => (
              <li key={index}>
                Destination: {route.to}, Distance: {route.distance} km
              </li>
            ))}
          </ul>

          <MapContainer
            center={[51.505, -0.09]} // Default map center; replace with dynamic data
            zoom={13}
            style={{ height: "400px", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {routes.map((route, index) => (
              <Marker key={index} position={route.coordinates}> {/* Replace with real coordinates */}
                <Popup>
                  Destination: {route.to}
                  <br />
                  Distance: {route.distance} km
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      )}
    </div>
  );
};

export default App;
