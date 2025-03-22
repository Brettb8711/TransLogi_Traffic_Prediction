import React, { useState } from 'react';
import axios from 'axios';
import '../styles/RouteForm.css'; // Import the CSS file

function RouteForm({ setTabIndex, setPolylines }) {
    const [warehouses, setWarehouses] = useState([{ address: '', product: '' }]);
    const [trucks, setTrucks] = useState([{ warehouse: '', loadCapacity: '', costPerMile: '' }]);
    const [orders, setOrders] = useState([{ product: '', delivery: '', weight: '' }]);

    const handleWarehouseChange = (index, field, value) => {
        const newWarehouses = [...warehouses];
        newWarehouses[index][field] = value;
        setWarehouses(newWarehouses);
    };

    const handleTruckChange = (index, field, value) => {
        const newTrucks = [...trucks];
        newTrucks[index][field] = value;
        setTrucks(newTrucks);
    };

    const handleOrderChange = (index, field, value) => {
        const newOrders = [...orders];
        newOrders[index][field] = value;
        setOrders(newOrders);
    };

    const addWarehouse = () => {
        setWarehouses([...warehouses, { address: '', product: '' }]);
    };

    const removeWarehouse = (index) => {
        const newWarehouses = warehouses.filter((_, i) => i !== index);
        setWarehouses(newWarehouses);
    };

    const addTruck = () => {
        setTrucks([...trucks, { warehouse: '', loadCapacity: '', costPerMile: '' }]);
    };

    const removeTruck = (index) => {
        const newTrucks = trucks.filter((_, i) => i !== index);
        setTrucks(newTrucks);
    };

    const addOrder = () => {
        setOrders([...orders, { product: '', delivery: '', weight: '' }]);
    };

    const removeOrder = (index) => {
        const newOrders = orders.filter((_, i) => i !== index);
        setOrders(newOrders);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/routes/optimize', {
                warehouses,
                trucks,
                orders
            });
            console.log('Response:', response.data);
            setPolylines(response.data.polylines); // Set the polylines data
            setTabIndex(1); // Switch to the Dashboard tab
        } catch (error) {
            console.error('Error optimizing routes:', error);
        }
    };

    return (
        <div className="route-form-container">
            <h2>Route Form</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-sections">
                    <div className="form-section">
                        <h3>Warehouses</h3>
                        {warehouses.map((warehouse, index) => (
                            <div key={index}>
                                <label>Address:</label>
                                <input
                                    type="text"
                                    value={warehouse.address}
                                    onChange={(e) => handleWarehouseChange(index, 'address', e.target.value)}
                                    required
                                />
                                <label>Product:</label>
                                <input
                                    type="text"
                                    value={warehouse.product}
                                    onChange={(e) => handleWarehouseChange(index, 'product', e.target.value)}
                                    required
                                />
                                <button type="button" onClick={() => removeWarehouse(index)}>Remove Warehouse</button>
                            </div>
                        ))}
                        <button type="button" onClick={addWarehouse}>Add Warehouse</button>
                    </div>
                    <div className="form-section">
                        <h3>Trucks</h3>
                        {trucks.map((truck, index) => (
                            <div key={index}>
                                <label>Warehouse:</label>
                                <select
                                    value={truck.warehouse}
                                    onChange={(e) => handleTruckChange(index, 'warehouse', e.target.value)}
                                    required
                                >
                                    <option value="">Select Warehouse</option>
                                    {warehouses.map((warehouse, i) => (
                                        <option key={i} value={warehouse.address}>{warehouse.address}</option>
                                    ))}
                                </select>
                                <label>Load Capacity (in 1000 pounds):</label>
                                <input
                                    type="number"
                                    value={truck.loadCapacity}
                                    onChange={(e) => handleTruckChange(index, 'loadCapacity', e.target.value)}
                                    min="1"
                                    required
                                />
                                <label>Cost Per Mile:</label>
                                <input
                                    type="number"
                                    value={truck.costPerMile}
                                    onChange={(e) => handleTruckChange(index, 'costPerMile', e.target.value)}
                                    min="1"
                                    required
                                />
                                <button type="button" onClick={() => removeTruck(index)}>Remove Truck</button>
                            </div>
                        ))}
                        <button type="button" onClick={addTruck}>Add Truck</button>
                    </div>
                </div>
                <div className="form-section">
                    <h3>Orders</h3>
                    {orders.map((order, index) => (
                        <div key={index}>
                            <label>Product:</label>
                            <input
                                type="text"
                                value={order.product}
                                onChange={(e) => handleOrderChange(index, 'product', e.target.value)}
                                required
                            />
                            <label>Delivery Address:</label>
                            <input
                                type="text"
                                value={order.delivery}
                                onChange={(e) => handleOrderChange(index, 'delivery', e.target.value)}
                                required
                            />
                            <label>Weight (in 1000 pounds):</label>
                            <input
                                type="number"
                                value={order.weight}
                                onChange={(e) => handleOrderChange(index, 'weight', e.target.value)}
                                min="1"
                                required
                            />
                            <button type="button" onClick={() => removeOrder(index)}>Remove Order</button>
                        </div>
                    ))}
                    <button type="button" onClick={addOrder}>Add Order</button>
                </div>
                <div style={{textAlign: 'center'}}>
                    <button id='SubmitButton'
                    type="submit">
                    Optimize Routes

                    </button>
                </div>
            </form>
        </div>
    );
}

export default RouteForm;