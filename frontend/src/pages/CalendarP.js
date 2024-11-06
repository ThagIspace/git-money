import React, { useContext, useState } from 'react';
import { IncomeContext } from '../context/IncomeContext';
import { ExpenseContext } from '../context/ExpenseContext';
import moment from 'moment';
import { Container, Button } from 'react-bootstrap';
import 'moment/locale/vi';
import '../assets/style/calendar.css';

moment.locale('vi');

const CalendarP = () => {
    const { incomes } = useContext(IncomeContext);
    const { expenses } = useContext(ExpenseContext);
    const [currentMonth, setCurrentMonth] = useState(moment());

    // Hàm để tổng hợp thu nhập và chi tiêu trong từng ngày
    const events = {};

    incomes.forEach((income) => {
        const date = moment(income.date).format('YYYY-MM-DD');
        if (!events[date]) events[date] = { income: 0, expense: 0 };
        events[date].income += income.amount;
    });

    expenses.forEach((expense) => {
        const date = moment(expense.date).format('YYYY-MM-DD');
        if (!events[date]) events[date] = { income: 0, expense: 0 };
        events[date].expense += expense.amount;
    });

    // Tạo một mảng các ngày trong tháng hiện tại
    const startOfMonth = currentMonth.clone().startOf('month');
    const endOfMonth = currentMonth.clone().endOf('month');
    const days = [];
    const day = startOfMonth.clone().startOf('week');

    while (day.isBefore(endOfMonth.clone().endOf('week'))) {
        days.push(day.clone());
        day.add(1, 'day');
    }

    // Chuyển tháng
    const prevMonth = () => setCurrentMonth(currentMonth.clone().subtract(1, 'month'));
    const nextMonth = () => setCurrentMonth(currentMonth.clone().add(1, 'month'));

    // Custom rendering for each day cell
    const renderDayCell = (date) => {
        const event = events[date.format('YYYY-MM-DD')] || { income: 0, expense: 0 };
        const incomeDot = event.income ? <span style={{ color: 'green', fontSize: '1.5em' }}>●</span> : null;
        const expenseDot = event.expense ? <span style={{ color: 'red', fontSize: '1.5em' }}>●</span> : null;
        const balance = event.income - event.expense;

        return (
            <div className="day-cell">
                <div className="day-number">{date.date()}</div>
                <div className="dot-container">
                    {incomeDot && <span className="dot income-dot"></span>}
                    {expenseDot && <span className="dot expense-dot"></span>}
                </div>
                <div className="balance" style={{ color: balance >= 0 ? 'green' : 'red' }}>
                    {balance !== 0 ? `${balance > 0 ? '' : '-'}${Math.abs(balance).toLocaleString('vi-VN')} đ` : ''}
                </div>
            </div>

        );
    };

    return (
        <Container fluid className="calendar-container">
            <div className="calendar-navigation">
                <Button variant="light" onClick={prevMonth}>{"<"}</Button>
                <h4>{`Tháng ${currentMonth.format('MM')} năm ${currentMonth.format('YYYY')}`}</h4>
                <Button variant="light" onClick={nextMonth}>{">"}</Button>
            </div>
            <div className="calendar-header">
                {['T.Hai', 'T.Ba', 'T.Tư', 'T.Năm', 'T.Sáu', 'T.Bảy', 'CN'].map((day) => (
                    <div key={day} className="calendar-header-day">{day}</div>
                ))}
            </div>
            <div className="calendar-grid calendar-days">
                {days.map((day) => (
                    <div
                        key={day.format('YYYY-MM-DD')}
                        className={`calendar-day ${day.month() !== currentMonth.month() ? 'other-month' : ''}`}
                    >
                        {renderDayCell(day)}
                    </div>
                ))}
            </div>
        </Container>
    );
};

export default CalendarP;
