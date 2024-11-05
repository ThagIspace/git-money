// controllers/expense.js
const ExpenseSchema = require("../models/ExpenseModel");
const BudgetSchema = require("../models/BudgetModel");

exports.addExpense = async (req, res) => {
    const { title, amount, category, description, date } = req.body;

    const expense = new ExpenseSchema({
        title,
        amount,
        category,
        description,
        date
    });

    try {
        // Validation
        if (!title || !category || !date) {
            return res.status(400).json({ message: 'All fields are required!' });
        }
        if (amount <= 0 || typeof amount !== 'number') {
            return res.status(400).json({ message: 'Amount must be a positive number!' });
        }

        // Lưu chi phí
        await expense.save();

        // Tìm ngân sách có danh mục tương ứng và cập nhật số tiền đã chi tiêu
        const budget = await BudgetSchema.findOne({ name: category });
        if (budget) {
            budget.spent += amount;
            await budget.save(); // Lưu ngân sách với số tiền đã chi tiêu mới
        }

        res.status(200).json({ message: 'Expense Added', expense });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.getExpense = async (req, res) => {
    try {
        const expenses = await ExpenseSchema.find().sort({ createdAt: -1 });
        res.status(200).json(expenses);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.deleteExpense = async (req, res) => {
    const { id } = req.params;
    try {
        const expense = await ExpenseSchema.findByIdAndDelete(id);
        if (!expense) {
            return res.status(404).json({ message: 'Expense not found' });
        }

        // Cập nhật số tiền đã chi tiêu trong ngân sách
        const budget = await BudgetSchema.findOne({ name: expense.category });
        if (budget) {
            budget.spent -= expense.amount;
            await budget.save();
        }

        res.status(200).json({ message: 'Expense deleted successfully' });
    } catch (error) {
        console.error('Error deleting expense:', error);
        res.status(500).json({ message: 'Server Error', error });
    }
};

