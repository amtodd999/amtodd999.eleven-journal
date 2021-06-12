const Sequelize = require('sequelize');
const sequelize = new Sequelize("postgres://postgres:5515aade3c9343698df11d6ac775cae3@localhost:5432/eleven-journal");
module.exports = sequelize;