import React, { useContext } from 'react';
import { IncomeContext } from '../context/IncomeContext';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { ExpenseContext } from '../context/ExpenseContext';

const TransactionTable = () => {
    const { incomes } = useContext(IncomeContext); // Lấy dữ liệu thu nhập từ context
    const { expenses } = useContext(ExpenseContext); // Lấy dữ liệu chi tiêu từ context

    // Tính toán tổng thu nhập, tổng chi tiêu và số dư
    const totalIncome = incomes.reduce((acc, income) => acc + income.amount, 0);
    const totalExpense = expenses.reduce((acc, expense) => acc + expense.amount, 0);
    const balance = totalIncome - totalExpense;

    // Tính toán số giao dịch thu nhập và chi tiêu
    const incomeTransactions = incomes.length;
    const expenseTransactions = expenses.length;

    // Tính toán trung bình thu nhập và chi tiêu mỗi ngày và mỗi giao dịch
    const averageIncomePerDay = totalIncome / 31; // Giả định tháng có 31 ngày
    const averageExpensePerDay = totalExpense / 31;
    const averageIncomePerTransaction = totalIncome / (incomeTransactions || 1); // Tránh chia cho 0
    const averageExpensePerTransaction = totalExpense / (expenseTransactions || 1);

    return (
        <Card className="mb-4 mt-4">
            <Card.Body>
                <Card.Title>Dòng tiền (Giao dịch)</Card.Title>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th colSpan="2">Tháng 10, 2024</th> {/* Tiêu đề tháng */}
                            <th>Thu nhập</th>
                            <th>Chi tiêu</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Tổng cộng</td>
                            <td></td>
                            <td>{totalIncome.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
                            <td>{totalExpense.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
                        </tr>
                        <tr>
                            <td>Số giao dịch</td>
                            <td></td>
                            <td>{incomeTransactions}</td>
                            <td>{expenseTransactions}</td>
                        </tr>
                        <tr>
                            <td>Trung bình (Ngày)</td>
                            <td></td>
                            <td>{averageIncomePerDay.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
                            <td>{averageExpensePerDay.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
                        </tr>
                        <tr>
                            <td>Trung bình (Giao dịch)</td>
                            <td></td>
                            <td>{averageIncomePerTransaction.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
                            <td>{averageExpensePerTransaction.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
                        </tr>
                        <tr>
                            <td colSpan="3">Tổng cộng:</td>
                            <td>{balance.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
                        </tr>
                    </tbody>
                </table>
            </Card.Body>
        </Card>
    );
};

export default TransactionTable;
