import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const MapVisualization = ({ polylines }) => {
    const startPosition = polylines.length > 0 ? polylines[0][0] : [51.505, -0.09]; // Default position [latitude, longitude]

    return (
        <MapContainer center={startPosition} zoom={13} style={{ height: "100%", width: "100%" }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {polylines.map((polyline, index) => (
                <Polyline key={index} positions={polyline} color="blue" />
            ))}
            {polylines.length > 0 && (
                <>
                    <Marker position={polylines[0][0]}>
                        <Popup>Start Point</Popup>
                    </Marker>
                    <Marker position={polylines[polylines.length - 1][polylines[polylines.length - 1].length - 1]}>
                        <Popup>End Point</Popup>
                    </Marker>
                </>
            )}
        </MapContainer>
    );
};

export default MapVisualization;