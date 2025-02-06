const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../utils/database'); // Sequelize instance
const { getLatLong } = require('../utils/geocode');

const Warehouse = sequelize.define('Warehouse', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    address: { type: DataTypes.TEXT, allowNull: false },
    product: { type: DataTypes.STRING, allowNull: false },
    latitude: { type: DataTypes.DOUBLE, allowNull: false },
    longitude: { type: DataTypes.DOUBLE, allowNull: false },
    request_num: { type: DataTypes.INTEGER, allowNull: false }
}, {
    timestamps: false,
    tableName: 'warehouse_data'
});

const Truck = sequelize.define('Truck', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    address: { type: DataTypes.TEXT, allowNull: false },
    latitude: { type: DataTypes.DOUBLE, allowNull: false },
    longitude: { type: DataTypes.DOUBLE, allowNull: false },
    request_num: { type: DataTypes.INTEGER, allowNull: false },
    cost_per_mile: { type: DataTypes.FLOAT, allowNull: false },
    max_load: { type: DataTypes.INTEGER, allowNull: false }
}, {
    timestamps: false,
    tableName: 'trucks_data'
});

const Order = sequelize.define('Order', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    product: { type: DataTypes.STRING, allowNull: false },
    dropoff_address: { type: DataTypes.TEXT, allowNull: false },
    load: { type: DataTypes.INTEGER, allowNull: false },
    penalty: { type: DataTypes.FLOAT, allowNull: false },
    request_num: { type: DataTypes.INTEGER, allowNull: false }
}, {
    timestamps: false,
    tableName: 'orders'
});

const Route = sequelize.define('Route', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    request_num: { type: DataTypes.INTEGER, allowNull: false },
    vehicle_start_time: { type: DataTypes.DATE, allowNull: true },
    vehicle_end_time: { type: DataTypes.DATE, allowNull: true },
    visits: { type: DataTypes.JSONB, allowNull: true },
    transitions: { type: DataTypes.JSONB, allowNull: true },
    metrics: { type: DataTypes.JSONB, allowNull: true },
    route_costs: { type: DataTypes.JSONB, allowNull: true },
    route_total_cost: { type: DataTypes.FLOAT, allowNull: true }
}, {
    timestamps: false,
    tableName: 'routes'
});

const Prediction = sequelize.define('Prediction', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    request_num: { type: DataTypes.INTEGER, allowNull: false },
    city: { type: DataTypes.STRING, allowNull: false },
    predicted_traffic: { type: DataTypes.FLOAT, allowNull: false },
    visibility_mi: { type: DataTypes.FLOAT, allowNull: false },
    time_float: { type: DataTypes.FLOAT, allowNull: false },
    average_city_delay: { type: DataTypes.FLOAT, allowNull: false },
    unexpected_traffic: { type: DataTypes.FLOAT, allowNull: false }
}, {
    timestamps: false,
    tableName: 'predictions'
});

const saveWarehouse = async (address, product, requestNum) => {
    const { latitude, longitude } = await getLatLong(address);
    await Warehouse.create({ address, product, latitude, longitude, request_num: requestNum });
};

const saveTruck = async (address, cost_per_mile, max_load, requestNum) => {
    const { latitude, longitude } = await getLatLong(address);
    await Truck.create({ address, latitude, longitude, request_num: requestNum, cost_per_mile, max_load });
};

const saveOrder = async (product, dropoff_address, load, penalty, requestNum) => {
    await Order.create({ product, dropoff_address, load, penalty, request_num: requestNum });
};

module.exports = {
    Prediction,
    Route,
    Warehouse,
    Truck,
    Order,
    saveWarehouse,
    saveTruck,
    saveOrder
};