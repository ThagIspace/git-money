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
                <Card.Title>Cash Flow (Transactions)</Card.Title>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th colSpan="2">October 2024</th> {/* Tiêu đề tháng */}
                            <th>Income</th>
                            <th>Expenses</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Total</td>
                            <td></td>
                            <td>{totalIncome.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
                            <td>{totalExpense.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
                        </tr>
                        <tr>
                            <td>Transactions</td>
                            <td></td>
                            <td>{incomeTransactions}</td>
                            <td>{expenseTransactions}</td>
                        </tr>
                        <tr>
                            <td>Average (Day)</td>
                            <td></td>
                            <td>{averageIncomePerDay.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
                            <td>{averageExpensePerDay.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
                        </tr>
                        <tr>
                            <td>Average (Transactions)</td>
                            <td></td>
                            <td>{averageIncomePerTransaction.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
                            <td>{averageExpensePerTransaction.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
                        </tr>
                        <tr>
                            <td colSpan="3">Total:</td>
                            <td>{balance.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
                        </tr>
                    </tbody>
                </table>
            </Card.Body>
        </Card>
    );
};

export default TransactionTable;
