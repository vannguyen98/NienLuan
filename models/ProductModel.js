const sequelize = require('../config/sequelize.config');
const { Sequelize } = require('sequelize');

const ProductModel = sequelize.define('product', {
  productId: {
    type: Sequelize.STRING,
    primaryKey: true,
  },
  name: Sequelize.STRING,
  unitPrice: Sequelize.FLOAT,
  isDeleted: Sequelize.TINYINT,
  producer: Sequelize.STRING,
  discount: Sequelize.INTEGER,
  description: Sequelize.STRING,
  star: Sequelize.INTEGER,
  categoryId: Sequelize.STRING,
},{
  timestamps: false,
  tableName: 'product',
});

module.exports = ProductModel;