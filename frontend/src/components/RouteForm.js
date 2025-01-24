import React, { useState } from 'react';
import axios from '../api/api';

const RouteForm = () => {
    const [warehouse, setWarehouse] = useState('');
    const [delivery, setDelivery] = useState('');
    const [trucks, setTrucks] = useState(1);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/routes/optimize', {
                warehouse,
                delivery,
                trucks,
            });
            console.log('Optimization Response:', response.data);
        } catch (error) {
            console.error('Error optimizing routes:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Warehouse Address:</label>
                <input
                    type="text"
                    value={warehouse}
                    onChange={(e) => setWarehouse(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Delivery Address:</label>
                <input
                    type="text"
                    value={delivery}
                    onChange={(e) => setDelivery(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Number of Trucks:</label>
                <input
                    type="number"
                    value={trucks}
                    onChange={(e) => setTrucks(e.target.value)}
                    min="1"
                    required
                />
            </div>
            <button type="submit">Optimize Routes</button>
        </form>
    );
};

export default RouteForm;
