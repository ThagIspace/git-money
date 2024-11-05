// controllers/budget.js
const BudgetSchema = require("../models/BudgetModel");

exports.addBudget = async (req, res) => {
    const { name, amount } = req.body;
    const budget = new BudgetSchema({ name, amount, spent: 0 });

    try {
        if (!name || amount <= 0) {
            return res.status(400).json({ message: 'Name and a positive amount are required!' });
        }
        await budget.save();
        res.status(200).json({ message: 'Budget Added', budget });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.updateBudget = async (req, res) => { // Thêm hàm updateBudget
    const { id } = req.params;
    const { spent } = req.body;

    try {
        const budget = await BudgetSchema.findById(id);
        if (!budget) {
            return res.status(404).json({ message: 'Budget Not Found' });
        }

        budget.spent = spent;
        await budget.save();

        res.status(200).json({ message: 'Budget Updated', budget });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};

exports.getBudgets = async (req, res) => {
    try {
        const budgets = await BudgetSchema.find().sort({ createdAt: -1 });
        res.status(200).json(budgets);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.deleteBudget = async (req, res) => {
    const { id } = req.params;
    try {
        await BudgetSchema.findByIdAndDelete(id);
        res.status(200).json({ message: 'Budget Deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};
