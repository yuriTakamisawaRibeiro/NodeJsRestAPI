'use strict';
const { Model, DataTypes } = require('sequelize'); 
const sequelize = require('../../config/database');
const bcrypt = require('bcrypt');

const Sequelize = require('sequelize');

module.exports = sequelize.define('user', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  userType: {
    type: DataTypes.ENUM('0', '1', '2')
  },
  name: {
    type: DataTypes.STRING
  },
  email: {
    type: DataTypes.STRING
  },
  cpf: {
    type: DataTypes.STRING
  },
  password: {
    type: DataTypes.STRING
  },
  confirmPassword: {
    type: DataTypes.VIRTUAL,
    set(value) {
      if(value === this.password) {
          const hashPassword = bcrypt.hashSync(value, 10);
          this.setDataValue('password', hashPassword);
      } else {
        throw new Error('Senha incorreta.')
      }
    }
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE
  },
  updatedAt: {
    allowNull: false,
    type: DataTypes.DATE
  },
  deletedAt: {
    allowNull: true,
    type: DataTypes.DATE
  }
}, {
  paranoid: true,
  freezeTableName: true,
  modelName: 'user'
});