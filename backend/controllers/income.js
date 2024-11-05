// controllers/income.js
const IncomeSchema = require('../models/IncomeModel');

// Thêm thu nhập
exports.addIncome = async (req, res) => {
    const { title, amount, date } = req.body;
    const income = new IncomeSchema({ title, amount, date });

    try {
        await income.save();
        res.status(201).json({ message: 'Income added', income });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Lấy danh sách thu nhập
exports.getIncomes = async (req, res) => {
    try {
        const incomes = await IncomeSchema.find().sort({ date: -1 });
        res.status(200).json(incomes);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Xóa thu nhập
exports.deleteIncome = async (req, res) => {
    const { id } = req.params;
    try {
        await IncomeSchema.findByIdAndDelete(id);
        res.status(200).json({ message: 'Income deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
