const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./user");

const Transaction = sequelize.define("Transaction", {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  userId: { type: DataTypes.UUID, allowNull: false, references: { model: "User", key: "id" } },
  amount: { type: DataTypes.DECIMAL, allowNull: false },
  type: { type: DataTypes.ENUM("income", "expense"), allowNull: false },
  category: { type: DataTypes.STRING, allowNull: false },
  note: { type: DataTypes.STRING },
}, { timestamps: true });

Transaction.belongsTo(User, { foreignKey: "userId", as: "User" });

module.exports = Transaction;