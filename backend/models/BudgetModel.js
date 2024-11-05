// models/BudgetModel.js
const mongoose = require('mongoose');

const BudgetSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    amount: {
        type: Number,
        required: true,
        trim: true
    },
    spent: { // Thêm thuộc tính để lưu số tiền đã chi tiêu
        type: Number,
        default: 0,
    }
}, { timestamps: true });

module.exports = mongoose.model('Budget', BudgetSchema);
