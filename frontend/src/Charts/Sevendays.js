import React, { useState, useEffect, useContext } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Card } from 'react-bootstrap';
import { ExpenseContext } from '../context/ExpenseContext';
import { IncomeContext } from '../context/IncomeContext';
import { FaEllipsisV } from 'react-icons/fa';
import SelectableModal from '../components/SelectableModal';

const getCurrentMonthDataForLast7Days = (incomes, expenses) => {
    const today = new Date();
    const data = [];

    for (let i = 0; i < 7; i++) {
        const date = new Date();
        date.setDate(today.getDate() - i);
        const dayName = date.toLocaleDateString('vi-VN', { weekday: 'short', day: 'numeric' });

        // Lọc thu nhập và chi tiêu theo ngày hiện tại
        const dailyIncomes = incomes.filter(
            (income) => new Date(income.date).toDateString() === date.toDateString()
        );
        const dailyExpenses = expenses.filter(
            (expense) => new Date(expense.date).toDateString() === date.toDateString()
        );

        // Tổng thu nhập và chi tiêu cho ngày
        const totalIncome = dailyIncomes.reduce((sum, income) => sum + income.amount, 0);
        const totalExpense = dailyExpenses.reduce((sum, expense) => sum + expense.amount, 0);

        data.unshift({
            day: dayName,
            income: totalIncome,
            expense: totalExpense,
        });
    }

    return data;
};

const SevenDaysChart = () => {
    const [showModal, setShowModal] = useState(false);
    const [filter, setFilter] = useState('both');
    const { expenses } = useContext(ExpenseContext);
    const { incomes } = useContext(IncomeContext);

    const [data, setData] = useState(getCurrentMonthDataForLast7Days(incomes, expenses));

    useEffect(() => {
        setData(getCurrentMonthDataForLast7Days(incomes, expenses));
    }, [incomes, expenses]);

    const handleFilterChange = (filterOption) => {
        setFilter(filterOption);
        setShowModal(false);
    };

    const filteredData = data.map((item) => ({
        ...item,
        income: filter === 'expense' ? 0 : item.income,
        expense: filter === 'income' ? 0 : item.expense,
    }));

    const options = [
        { label: 'Thu nhập', onSelect: () => handleFilterChange('income') },
        { label: 'Chi tiêu', onSelect: () => handleFilterChange('expense') },
        { label: 'Cả hai', onSelect: () => handleFilterChange('both') },
    ];

    return (
        <Card className="p-3 mb-4">
            <div className="d-flex justify-content-between">
                <h5>7 ngày qua</h5>
                <FaEllipsisV onClick={() => setShowModal(true)} style={{ cursor: 'pointer' }} />
            </div>
            <ResponsiveContainer width="100%" height={400}>
                <BarChart data={filteredData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip formatter={(value) => `${value.toLocaleString('vi-VN')} đ`} />
                    <Legend />
                    {filter !== 'expense' && (
                        <Bar dataKey="income" fill="green" name="Thu nhập" barSize={20} />
                    )}
                    {filter !== 'income' && (
                        <Bar dataKey="expense" fill="red" name="Chi tiêu" barSize={20} />
                    )}
                </BarChart>
            </ResponsiveContainer>

            <SelectableModal
                show={showModal}
                onClose={() => setShowModal(false)}
                title="7 NGÀY QUA"
                options={options}
            />
        </Card>
    );
};

export default SevenDaysChart;
