const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../utils/database'); // Sequelize instance
const { getLatLong } = require('../utils/geocode');

const Address = sequelize.define('Address', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    type: { type: DataTypes.STRING, allowNull: false },
    address: { type: DataTypes.TEXT, allowNull: false },
    latitude: { type: DataTypes.DOUBLE, allowNull: false },
    longitude: { type: DataTypes.DOUBLE, allowNull: false },
    request_num: { type: DataTypes.INTEGER, allowNull: false }
},{
    timestamps: false,
    tableName: 'addresses'
});

const saveAddresses = async (type, address, requestNum) => {
    const { latitude, longitude } = await getLatLong(address);
    await Address.create({ type, address, latitude, longitude, request_num: requestNum });
};

module.exports = {
    Address,
    saveAddresses
};