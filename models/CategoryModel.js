const sequelize = require('../config/sequelize.config');
const { Sequelize } = require('sequelize');

const CategoryModel = sequelize.define('category', {
  categoryId: {
    type: Sequelize.STRING,
    primaryKey: true,
  },
  name: Sequelize.STRING,
  isDeleted: Sequelize.TINYINT,
  order: Sequelize.INTEGER,
  

},{
  timestamps: false,
  tableName: 'category',
});

module.exports = CategoryModel;