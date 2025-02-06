const { Warehouse } = require('../models/trafficModel');

const getNextRequestNum = async () => {
    const maxRequestNum = await Warehouse.max('request_num');
    return maxRequestNum ? maxRequestNum + 1 : 1;
};

module.exports = {
    getNextRequestNum
};