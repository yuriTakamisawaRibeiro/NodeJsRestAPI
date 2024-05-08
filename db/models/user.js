'use strict';
const {
  Model
} = require('sequelize');
const sequelize = require('../../config/database');

module.exports = sequelize.define('user', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  userType: {
    type: Sequelize.ENUM('0', '1', '2')
  },
  name: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING
  },
  cpf: {
    type: Sequelize.STRING
  },
  password: {
    type: Sequelize.STRING
  },
  createdAt: {
    allowNull: false,
    type: Sequelize.DATE
  },
  updatedAt: {
    allowNull: false,
    type: Sequelize.DATE
  },
  deletedAt: {
    allowNull: true,
    type: Sequelize.DATE
  }
  
}, {
  paranoid: true, // paranoid vai fazer com que os dados deletados não sejam realmente deletados, só marcados como deletados
  freezeTableName: true,
  modelName: 'user'
})