const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('ecommerce_senati', 'root', 'admin123', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false
});
module.exports = sequelize;
