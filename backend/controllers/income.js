// controllers/income.js
const IncomeSchema = require('../models/IncomeModel');

// Thêm thu nhập
exports.addIncome = async (req, res) => {
    const { title, amount, date, description } = req.body;
    const income = new IncomeSchema({ title, amount, date, description });

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

// Cập nhật thu nhập
exports.updateIncome = async (req, res) => {
    const { id } = req.params;
    const { title, amount, date, description } = req.body;

    try {
        const updatedIncome = await IncomeSchema.findByIdAndUpdate(
            id,
            { title, amount, date, description },
            { new: true, runValidators: true }
        );

        if (!updatedIncome) {
            return res.status(404).json({ message: 'Income not found' });
        }

        res.status(200).json({ message: 'Income updated', updatedIncome });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
