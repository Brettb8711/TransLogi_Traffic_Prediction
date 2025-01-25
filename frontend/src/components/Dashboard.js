import React from 'react';

const Dashboard = ({ routes, metrics }) => {
    return (
        <div>
            <h2>Optimized Routes</h2>
            {/* Use a library like react-leaflet or Google Maps to show the map */}
            <div id="map">Map Visualization Here</div>

            <h2>Metrics</h2>
            <p>Delivery Times: {metrics.deliveryTimes}</p>
            <p>Cost Efficiency: {metrics.costEfficiency}</p>
            <p>Vehicle Utilization: {metrics.vehicleUtilization}</p>
        </div>
    );
};

export default Dashboard;
