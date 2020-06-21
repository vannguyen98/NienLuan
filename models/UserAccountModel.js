const sequelize = require('../config/sequelize.config');
const { Sequelize } = require('sequelize');

const UserAccountModel = sequelize.define('useraccount', {
  accountId: {
    type: Sequelize.STRING,
    primaryKey: true,
  },
  password: Sequelize.STRING,
  email: Sequelize.STRING,
  
},{
  timestamps: false,
  tableName: 'useraccount',
});

module.exports = UserAccountModel;