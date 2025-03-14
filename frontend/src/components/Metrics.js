import React from 'react';
import '../styles/Metrics.css'; // Import CSS for styling

function Metrics() {
    // Static data for demonstration
    const deliveryTimes = [
        { order: 1, status: 'Delivered on time', gauge: 'good' },
        { order: 2, status: 'Delivered on time', gauge: 'good' },
        { order: 3, status: 'Delivered on time', gauge: 'good' },
        { order: 4, status: 'Delivered with a delay', gauge: 'average' },
    ];
    const totalDeliveryOnTime = 75; // Percentage

    const vehicleUtilization = [
        { vehicle: 1, utilization: '90%', gauge: 'good' },
        { vehicle: 2, utilization: '85%', gauge: 'good' },
        { vehicle: 3, utilization: '60%', gauge: 'average' },
    ];
    const averageUtilization = 78; // Percentage

    return (
        <div className="metrics-container">
            <h3>Metrics</h3>
            <div className="metric-section">
                <h4>Delivery Times</h4>
                {deliveryTimes.map((delivery, index) => (
                    <div key={index} className="metric">
                        <span className="metric-label">Order {delivery.order}: {delivery.status}</span>
                        <div className={`gauge ${delivery.gauge}`}></div>
                    </div>
                ))}
                <div className="metric">
                    <span className="metric-label">Total Delivery Times: {totalDeliveryOnTime}% on time</span>
                    <div className={`gauge ${totalDeliveryOnTime >= 90 ? 'good' : totalDeliveryOnTime >= 75 ? 'average' : 'bad'}`}></div>
                </div>
            </div>
            <div className="metric-section">
                <h4>Vehicle Utilization</h4>
                {vehicleUtilization.map((vehicle, index) => (
                    <div key={index} className="metric">
                        <span className="metric-label">Vehicle {vehicle.vehicle}: {vehicle.utilization}</span>
                        <div className={`gauge ${vehicle.gauge}`}></div>
                    </div>
                ))}
                <div className="metric">
                    <span className="metric-label">Average Utilization: {averageUtilization}%</span>
                    <div className={`gauge ${averageUtilization >= 90 ? 'good' : averageUtilization >= 75 ? 'average' : 'bad'}`}></div>
                </div>
            </div>
        </div>
    );
}

export default Metrics;