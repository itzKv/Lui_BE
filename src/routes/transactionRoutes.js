const express = require("express");
const TransactionController = require("../controllers/TransactionController");
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post("/", authMiddleware, TransactionController.createTransaction);
router.get("/user/:userId", authMiddleware, TransactionController.getUserTransaction);
router.delete("/:id", authMiddleware, TransactionController.deleteTransaction);

module.exports = router;