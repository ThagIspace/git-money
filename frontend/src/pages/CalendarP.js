// CalendarP.js
import React, { useState, useContext, useEffect } from 'react';
import { ExpenseContext } from '../context/ExpenseContext';
import { IncomeContext } from '../context/IncomeContext';
import '../assets/style/calendar.css';

const CalendarP = () => {
    const { expenses } = useContext(ExpenseContext);
    const { incomes } = useContext(IncomeContext);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [formattedExpenses, setFormattedExpenses] = useState([]);
    const [formattedIncomes, setFormattedIncomes] = useState([]);

    useEffect(() => {
        // Chuyển đổi dữ liệu expenses và incomes sang dạng dễ so sánh hơn
        const formatDate = (dateStr) => new Date(dateStr).toISOString().split('T')[0];
        setFormattedExpenses(expenses.map(exp => ({ ...exp, date: formatDate(exp.date) })));
        setFormattedIncomes(incomes.map(inc => ({ ...inc, date: formatDate(inc.date) })));
    }, [expenses, incomes]);

    const getMonthDays = () => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const firstDayOfMonth = new Date(year, month, 1);
        const lastDayOfMonth = new Date(year, month + 1, 0);
        const days = [];

        // Thêm các ngày của tháng trước
        const prevMonthLastDay = new Date(year, month, 0);
        for (let i = firstDayOfMonth.getDay(); i > 1; i--) {
            days.unshift(new Date(year, month - 1, prevMonthLastDay.getDate() - i + 2));
        }

        // Thêm các ngày của tháng hiện tại
        for (let day = 1; day <= lastDayOfMonth.getDate(); day++) {
            days.push(new Date(year, month, day));
        }

        return days;
    };

    const handlePrevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
    };

    const handleNextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
    };

    const calculateNetAmount = (date) => {
        const formattedDate = date.toISOString().split('T')[0];
        const dailyExpenses = formattedExpenses.filter(exp => exp.date === formattedDate);
        const dailyIncome = formattedIncomes.filter(inc => inc.date === formattedDate);

        const totalExpense = dailyExpenses.reduce((sum, exp) => sum + exp.amount, 0);
        const totalIncome = dailyIncome.reduce((sum, inc) => sum + inc.amount, 0);

        return totalIncome - totalExpense;
    };

    const renderDayCell = (date, index) => {
        if (!date) return <td key={`empty-${index}`} className="empty-cell"></td>;

        const formattedDate = date.toISOString().split('T')[0];
        const hasExpense = formattedExpenses.some(exp => exp.date === formattedDate);
        const hasIncome = formattedIncomes.some(inc => inc.date === formattedDate);
        const netAmount = calculateNetAmount(date);

        return (
            <td key={formattedDate} className={`day ${date.getMonth() !== currentDate.getMonth() ? 'other-month' : ''}`}>
                <div>{date.getDate()}</div>
                {hasIncome && <div className="income-dot"></div>}
                {hasExpense && <div className="expense-dot"></div>}
                {netAmount !== 0 && (
                    <div
                        className="day-amount"
                        style={{
                            color: netAmount > 0 ? 'green' : 'red'
                        }}
                    >
                        {netAmount.toLocaleString('vi-VN')} đ
                    </div>
                )}
            </td>

        );
    };

    return (
        <div className="calendar-container container-fluid mt-5">
            <div className="calendar-header">
                <button className="navigation-button" onClick={handlePrevMonth}>
                    &lt;
                </button>
                <h4 className="calendar-title">Tháng {currentDate.getMonth() + 1} năm {currentDate.getFullYear()}</h4>
                <button className="navigation-button" onClick={handleNextMonth}>
                    &gt;
                </button>
            </div>

            <div className="calendar-wrapper mt-4">
                <table className="calendar-table table">
                    <thead>
                        <tr>
                            <th>T.Hai</th>
                            <th>T.Ba</th>
                            <th>T.Tư</th>
                            <th>T.Năm</th>
                            <th>T.Sáu</th>
                            <th>T.Bảy</th>
                            <th>CN</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.from({ length: Math.ceil(getMonthDays().length / 7) }).map((_, weekIndex) => (
                            <tr key={weekIndex}>
                                {getMonthDays().slice(weekIndex * 7, weekIndex * 7 + 7).map((date, dayIndex) => renderDayCell(date, weekIndex * 7 + dayIndex))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CalendarP;
