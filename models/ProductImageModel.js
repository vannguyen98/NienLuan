const sequelize = require('../config/sequelize.config');
const { Sequelize } = require('sequelize');

const ProductImageModel = sequelize.define('productimage', {
  productImageId: {
    type: Sequelize.STRING,
    primaryKey: true,
  },
  productId: Sequelize.STRING,
  imageUrl: Sequelize.STRING,
  
},{
  timestamps: false,
  tableName: 'productimage',
});

module.exports = ProductImageModel;