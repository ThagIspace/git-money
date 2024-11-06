// CalendarList.js
import React from 'react';

const CalendarList = ({ selectedDay }) => {
    if (!selectedDay) return null;

    const totalIncome = selectedDay.incomes.reduce((sum, inc) => sum + inc.amount, 0);
    const totalExpense = selectedDay.expenses.reduce((sum, exp) => sum + exp.amount, 0);
    const netAmount = totalIncome - totalExpense;

    return (
        <div className="detail-panel d-flex justify-content-between align-items-center">
            <div className="detail-date">
                <h5>Thứ {new Date(selectedDay.date).toLocaleDateString('vi-VN', { weekday: 'long' })}, {selectedDay.date}</h5>
            </div>

            <div className="detail-data">
                <div>
                    Thu nhập: <span style={{ color: totalIncome > 0 ? 'green' : 'black' }}>{totalIncome.toLocaleString('vi-VN')} đ</span>
                </div>
                <div>
                    Chi phí: <span style={{ color: totalExpense > 0 ? 'red' : 'black' }}>{totalExpense.toLocaleString('vi-VN')} đ</span>
                </div>
                {(totalIncome > 0 || totalExpense > 0) && (
                    <div className="net-amount-container" style={{ marginTop: '10px', fontWeight: 'bold', color: netAmount >= 0 ? 'green' : 'red' }}>
                        <hr style={{ margin: '5px 0' }} />
                        {netAmount.toLocaleString('vi-VN')} đ
                    </div>
                )}
            </div>
        </div>
    );
};

export default CalendarList;
