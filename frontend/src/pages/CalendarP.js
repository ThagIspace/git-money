// CalendarP.js
import React, { useState, useContext, useEffect, useMemo } from 'react';
import { ExpenseContext } from '../context/ExpenseContext';
import { IncomeContext } from '../context/IncomeContext';
import CalendarList from '../components/CalendarList';
import TopBar from '../components/Topbar';
import Nav from '../components/Nav';
import Sidebar from '../components/Sidebar';
import '../assets/style/calendar.css';

const CalendarP = () => {
    const { expenses } = useContext(ExpenseContext);
    const { incomes } = useContext(IncomeContext);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDay, setSelectedDay] = useState(null);
    const [detailVisible, setDetailVisible] = useState(false);
    const [isSidebarVisible, setSidebarVisible] = useState(false);

    const toggleSidebar = () => setSidebarVisible(!isSidebarVisible);

    // Định dạng dữ liệu expenses và incomes khi thay đổi
    const formattedData = useMemo(() => {
        const formatDate = (dateStr) => new Date(dateStr).toISOString().split('T')[0];
        return {
            expenses: expenses.map(exp => ({ ...exp, date: formatDate(exp.date) })),
            incomes: incomes.map(inc => ({ ...inc, date: formatDate(inc.date) }))
        };
    }, [expenses, incomes]);

    // Tạo các ngày trong tháng
    const getMonthDays = useMemo(() => {
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
    }, [currentDate]);

    const handleMonthChange = (increment) => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + increment));
    };

    const calculateNetAmount = (date) => {
        const formattedDate = date.toISOString().split('T')[0];
        const dailyExpenses = formattedData.expenses.filter(exp => exp.date === formattedDate);
        const dailyIncome = formattedData.incomes.filter(inc => inc.date === formattedDate);

        const totalExpense = dailyExpenses.reduce((sum, exp) => sum + exp.amount, 0);
        const totalIncome = dailyIncome.reduce((sum, inc) => sum + inc.amount, 0);

        return totalIncome - totalExpense;
    };

    const renderDayCell = (date, index) => {
        if (!date) return <td key={`empty-${index}`} className="empty-cell"></td>;

        const formattedDate = date.toISOString().split('T')[0];
        const hasExpense = formattedData.expenses.some(exp => exp.date === formattedDate);
        const hasIncome = formattedData.incomes.some(inc => inc.date === formattedDate);
        const netAmount = calculateNetAmount(date);

        const handleDayClick = () => {
            if (date.getMonth() === currentDate.getMonth()) {
                const dailyExpenses = formattedData.expenses.filter(exp => exp.date === formattedDate);
                const dailyIncome = formattedData.incomes.filter(inc => inc.date === formattedDate);
                setSelectedDay({ date: formattedDate, expenses: dailyExpenses, incomes: dailyIncome });
                setDetailVisible(true);
            }
        };

        return (
            <td
                key={formattedDate}
                className={`day ${date.getMonth() !== currentDate.getMonth() ? 'other-month' : ''}`}
                onClick={handleDayClick}
            >
                <div>{date.getDate()}</div>
                {hasIncome && <div className="income-dot"></div>}
                {hasExpense && <div className="expense-dot"></div>}
                {netAmount !== 0 && (
                    <div
                        className="day-amount"
                        style={{ color: netAmount > 0 ? 'green' : 'red' }}
                    >
                        {netAmount.toLocaleString('vi-VN')} đ
                    </div>
                )}
            </td>
        );
    };

    return (
        <div className={`d-flex ${isSidebarVisible ? 'sidebar-open' : ''}`} id="wrapper">
            <Sidebar />
            <div id="page-content-wrapper">
                <TopBar onToggleSidebar={toggleSidebar} />
                <Nav toggleSidebar={toggleSidebar} className="d-lg-none" />
                <div className="container-fluid">
                    <div className="calendar-container mt-5">
                        <div className="calendar-header">
                            <button className="navigation-button" onClick={() => handleMonthChange(-1)}>
                                &lt;
                            </button>
                            <h4 className="calendar-title">Tháng {currentDate.getMonth() + 1} năm {currentDate.getFullYear()}</h4>
                            <button className="navigation-button" onClick={() => handleMonthChange(1)}>
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
                                    {Array.from({ length: Math.ceil(getMonthDays.length / 7) }).map((_, weekIndex) => (
                                        <tr key={weekIndex}>
                                            {getMonthDays.slice(weekIndex * 7, weekIndex * 7 + 7).map((date, dayIndex) => renderDayCell(date, weekIndex * 7 + dayIndex))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {detailVisible && <CalendarList selectedDay={selectedDay} />}
                </div>
            </div>
        </div>
    );
};

export default CalendarP;
