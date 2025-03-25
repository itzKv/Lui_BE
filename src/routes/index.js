const express = require("express");
const userRoutes = require('./userRoutes');
const transactionRoutes = require('./transactionRoutes');

const router = express.Router();

router.use('/users', userRoutes);
router.use('/transactions', transactionRoutes);

module.exports = router;