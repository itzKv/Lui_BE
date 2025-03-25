const { deleteTransaction } = require("../repositories/TransactionRepository");
const TransactionService = require("../services/TransactionService");

class TransactionController {
    static async createTransaction (req, res) {
        try {
            const transaction = await TransactionService.createTransaction(req.body);
            res.status(201).json({ message: "Transaction successfully created!", transaction });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    static async getUserTransaction (req, res) {
        try {
            const transaction = await TransactionService.getUserTransactions(req.params.userId);
            console.log(req.params.id);
            res.status(200).json( transaction );
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    static async deleteTransaction (req, res) {
        try {
            console.log("ID Received:", req.params.id); // Debugging
            await TransactionService.deleteTransaction(req.params.id);
            res.status(200).json({ message: "Transaction successfully deleted!" });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}

module.exports = TransactionController;