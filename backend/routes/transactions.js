// routes/transactions.js
const { addIncome, getIncomes, deleteIncome } = require('../controllers/income');
const { addExpense, getExpense, deleteExpense } = require('../controllers/expense');
const { addBudget, getBudgets, deleteBudget, updateBudget } = require('../controllers/budget');
const { addTransaction, getTransactions, deleteTransaction } = require('../controllers/transaction');

const router = require('express').Router();

router.post('/add-income', addIncome)
    .get('/get-incomes', getIncomes)
    .delete('/delete-income/:id', deleteIncome)

    .post('/add-expense', addExpense)
    .get('/get-expenses', getExpense)
    .delete('/delete-expense/:id', deleteExpense)

    .post('/add-transaction', addTransaction)
    .get('/get-transactions', getTransactions)
    .delete('/delete-transaction/:id', deleteTransaction)

    .post('/add-budget', addBudget)
    .get('/get-budgets', getBudgets)
    .delete('/delete-budget/:id', deleteBudget)
    .put('/update-budget/:id', updateBudget);

module.exports = router;
