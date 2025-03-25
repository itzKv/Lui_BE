const { DataTypes } = require("sequelize");
const sequelize = require('../config/database');
const { v4: uuidv4 } = require('uuid');

const User = sequelize.define("User", {
  id: { type: DataTypes.UUID, defaultValue: uuidv4, allowNull: false, primaryKey: true },
  name: { type: DataTypes.UUID, allowNull: false },
  email: { type: DataTypes.UUID, allowNull: false, unique: true },
  password: { type: DataTypes.UUID, allowNull: false },
  refreshToken: { type: DataTypes.TEXT, allowNull: true },
}, { timestamps: true } );

module.exports = User;