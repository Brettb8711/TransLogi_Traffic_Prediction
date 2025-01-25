const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('postgresql://postgres:Sp33zer1993!@localhost:5432/translogi', {
    dialect: 'postgres',
    logging: false, // Disable logging if not needed
});

sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

module.exports = sequelize;