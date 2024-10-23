const { addExpense, getExpense, deleteExpense } = require('../controllers/expense');
const { addIncome, getIncomes, deleteIncome } = require('../controllers/income');
const { addTransaction, getTransactions, deleteTransaction } = require('../controllers/transaction'); // Import các chức năng từ transaction controller

const router = require('express').Router();

// Route cho income và expense (cũ)
router.post('/add-income', addIncome)
    .get('/get-incomes', getIncomes)
    .delete('/delete-income/:id', deleteIncome)

    .post('/add-expense', addExpense)
    .get('/get-expenses', getExpense)
    .delete('/delete-expense/:id', deleteExpense);

// Route cho transaction (mới)
router.post('/add-transaction', addTransaction) // Thêm giao dịch mới
    .get('/get-transactions', getTransactions) // Lấy danh sách giao dịch
    .delete('/delete-transaction/:id', deleteTransaction); // Xóa giao dịch theo ID

module.exports = router;
