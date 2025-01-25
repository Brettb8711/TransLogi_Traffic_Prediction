import React, { useState } from 'react';
import axios from 'axios';

const RouteForm = () => {
    const [productMode, setProductMode] = useState('single');
    const [products, setProducts] = useState(['Product1', 'Product2', 'Product3']);
    const [warehouses, setWarehouses] = useState([{ address: '', product: 'Product1' }]);
    const [trucks, setTrucks] = useState([{ warehouse: '', loadCapacity: 10, costPerMile: 2 }]);
    const [orders, setOrders] = useState([{ product: 'Product1', delivery: '', weight: 3 }]);

    const handleProductModeChange = () => {
        setProductMode(productMode === 'single' ? 'multi' : 'single');
    };

    const handleWarehouseChange = (index, field, value) => {
        const newWarehouses = [...warehouses];
        newWarehouses[index][field] = value;
        setWarehouses(newWarehouses);
    };

    const addWarehouse = () => {
        setWarehouses([...warehouses, { address: '', product: products[0] }]);
    };

    const removeWarehouse = (index) => {
        const newWarehouses = warehouses.filter((_, i) => i !== index);
        setWarehouses(newWarehouses);
    };

    const handleTruckChange = (index, field, value) => {
        const newTrucks = [...trucks];
        newTrucks[index][field] = value;
        setTrucks(newTrucks);
    };

    const addTruck = () => {
        setTrucks([...trucks, { warehouse: '', loadCapacity: 10, costPerMile: 2 }]);
    };

    const removeTruck = (index) => {
        const newTrucks = trucks.filter((_, i) => i !== index);
        setTrucks(newTrucks);
    };

    const handleOrderChange = (index, field, value) => {
        const newOrders = [...orders];
        newOrders[index][field] = value;
        setOrders(newOrders);
    };

    const addOrder = () => {
        setOrders([...orders, { product: products[0], delivery: '', weight: 3 }]);
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
                orders,
            });
            console.log('Optimization Response:', response.data);
        } catch (error) {
            console.error('Error optimizing routes:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Product Mode:</label>
                <button type="button" onClick={handleProductModeChange}>
                    {productMode === 'single' ? 'Switch to Multi Product' : 'Switch to Single Product'}
                </button>
            </div>
            <div>
                <label>Products:</label>
                {products.map((product, index) => (
                    <div key={index}>
                        <input
                            type="text"
                            value={product}
                            onChange={(e) => {
                                const newProducts = [...products];
                                newProducts[index] = e.target.value;
                                setProducts(newProducts);
                            }}
                            required
                        />
                    </div>
                ))}
            </div>
            <div>
                <label>Warehouses:</label>
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
                        <select
                            value={warehouse.product}
                            onChange={(e) => handleWarehouseChange(index, 'product', e.target.value)}
                            required
                        >
                            {products.map((product, i) => (
                                <option key={i} value={product}>{product}</option>
                            ))}
                        </select>
                        <button type="button" onClick={() => removeWarehouse(index)}>Remove Warehouse</button>
                    </div>
                ))}
                <button type="button" onClick={addWarehouse}>Add Warehouse</button>
            </div>
            <div>
                <label>Trucks:</label>
                {trucks.map((truck, index) => (
                    <div key={index}>
                        <label>Warehouse Address:</label>
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
            <div>
                <label>Orders:</label>
                {orders.map((order, index) => (
                    <div key={index}>
                        <label>Product:</label>
                        <select
                            value={order.product}
                            onChange={(e) => handleOrderChange(index, 'product', e.target.value)}
                            required
                        >
                            {products.map((product, i) => (
                                <option key={i} value={product}>{product}</option>
                            ))}
                        </select>
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
            <button type="submit">Optimize Routes</button>
        </form>
    );
};

export default RouteForm;
