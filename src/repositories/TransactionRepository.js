const Transaction = require("../models/transaction");

class TransactionRepository {
    static async createTransaction(data) {
        return await Transaction.create(data);
    }

    static async getTransactionByUser(userId) {
        return await Transaction.findOne({ where: { userId } });
    }

    static async getTransactionById(id) {
        return await Transaction.findByPk({ where: { id } });
    }

    static async deleteTransaction(id) {
        return await Transaction.destroy({ where: { id } });
    }
}   

module.exports = TransactionRepository;