// CalendarList.js
import React from 'react';

const CalendarList = ({ selectedDay }) => {
    if (!selectedDay) return null;

    return (
        <div className="detail-panel d-flex justify-content-between align-items-center">
            <div className="detail-date">
                <h5>Thứ {new Date(selectedDay.date).toLocaleDateString('vi-VN', { weekday: 'long' })}, {selectedDay.date}</h5>
            </div>

            <div className="detail-data">
                <div>
                    <span className="income-dot"></span> Thu nhập: {selectedDay.incomes.reduce((sum, inc) => sum + inc.amount, 0).toLocaleString('vi-VN')} đ
                </div>
                <div>
                    <span className="expense-dot"></span> Chi phí: {selectedDay.expenses.reduce((sum, exp) => sum + exp.amount, 0).toLocaleString('vi-VN')} đ
                </div>
            </div>
        </div>
    );
};

export default CalendarList;
