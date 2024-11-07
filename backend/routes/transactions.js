// routes/transactions.js
const { addIncome, getIncomes, deleteIncome, updateIncome } = require('../controllers/income');
const { addExpense, getExpense, deleteExpense, updateExpense } = require('../controllers/expense');
const { addBudget, getBudgets, deleteBudget, updateBudget } = require('../controllers/budget');
const { addTransaction, getTransactions, deleteTransaction } = require('../controllers/transaction');

const router = require('express').Router();

router.post('/add-income', addIncome)
    .get('/get-incomes', getIncomes)
    .delete('/delete-income/:id', deleteIncome)
    .put('/update-income/:id', updateIncome)

    .post('/add-expense', addExpense)
    .get('/get-expenses', getExpense)
    .delete('/delete-expense/:id', deleteExpense)
    .put('/update-expense/:id', updateExpense)

    .post('/add-budget', addBudget)
    .get('/get-budgets', getBudgets)
    .delete('/delete-budget/:id', deleteBudget)
    .put('/update-budget/:id', updateBudget)

    .post('/add-transaction', addTransaction)
    .get('/get-transactions', getTransactions)
    .delete('/delete-transaction/:id', deleteTransaction);

module.exports = router;
