import React, { useEffect } from 'react';
import { testConnection } from '../api/api';

const RouteForm = () => {
    useEffect(() => {
        const checkBackend = async () => {
            const message = await testConnection();
            console.log(message);
        };
        checkBackend();
    }, []);

    return <div>Route Form Component</div>;
};

export default RouteForm;
