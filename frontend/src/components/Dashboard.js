import React from 'react';
import MapVisualization from './MapVisualization';
import Metrics from './Metrics';
import Trends from './Trends';
import '../styles/Dashboard.css'; 

function Dashboard({ polylines }) {
    return (
        <div className="dashboard-container">
            <h2>Route Visualization</h2>
            <div className="content-container">
                <Metrics />
                <div className="map-container">
                    <MapVisualization polylines={polylines} />
                </div>
                <Trends />
            </div>
        </div>
    );
}

export default Dashboard;