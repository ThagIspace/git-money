const TransactionSchema = require("../models/TransactionModel");

// Thêm giao dịch
exports.addTransaction = async (req, res) => {
    const { title, amount, category, description, date } = req.body;

    const transaction = TransactionSchema({
        title,
        amount,
        category,
        description,
        date
    });

    try {
        // Kiểm tra đầu vào
        if (!title || !category || !description || !date) {
            return res.status(400).json({ message: 'All fields are required!' });
        }
        if (amount <= 0 || typeof amount !== 'number') {
            return res.status(400).json({ message: 'Amount must be a positive number!' });
        }
        await transaction.save();
        res.status(200).json({ message: 'Transaction Added' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }

    console.log(transaction);
};

// Lấy danh sách giao dịch
exports.getTransactions = async (req, res) => {
    try {
        const transactions = await TransactionSchema.find().sort({ createdAt: -1 });
        res.status(200).json(transactions);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// Xóa giao dịch
exports.deleteTransaction = async (req, res) => {
    const { id } = req.params;
    TransactionSchema.findByIdAndDelete(id)
        .then(() => {
            res.status(200).json({ message: 'Transaction Deleted' });
        })
        .catch((err) => {
            res.status(500).json({ message: 'Server Error' });
        });
};
