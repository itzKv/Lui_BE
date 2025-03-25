const TransactionRepository = require('../repositories/TransactionRepository');

class TransactionService {
    static async createTransaction(data) {
        if (data.amount <= 0) throw new Error("Amount must be greater than zero.");

        return await TransactionRepository.createTransaction(data);
    }

    static async getUserTransactions(userId) {
        return await TransactionRepository.getTransactionByUser(userId);
    }

    static async deleteTransaction(id) {
        const transaction = await TransactionRepository.deleteTransaction(id);
        if (!transaction) throw new Error("Transaction not found!");

        return await TransactionRepository.deleteTransaction(id);
    }
}

module.exports = TransactionService;