// CalendarList.js
import React, { useState } from 'react';
import { IconButton, Menu, MenuItem } from '@mui/material';
import { FaEllipsisV } from 'react-icons/fa';

const CalendarList = ({ selectedDay, onDeleteExpense }) => {
    const [expandedExpenseId, setExpandedExpenseId] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);

    if (!selectedDay) return null;

    const totalIncome = selectedDay.incomes.reduce((sum, inc) => sum + inc.amount, 0);
    const totalExpense = selectedDay.expenses.reduce((sum, exp) => sum + exp.amount, 0);
    const netAmount = totalIncome - totalExpense;

    const handleExpand = (event, id) => {
        setAnchorEl(event.currentTarget);
        setExpandedExpenseId(id);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setExpandedExpenseId(null);
    };

    return (
        <div className="detail-panel">
            <div className="d-flex justify-content-between align-items-center">
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
            <div className="expense-list-container">
                {selectedDay.expenses.map((expense) => (
                    <div key={expense._id} className="expense-item d-flex justify-content-between align-items-center mt-3 p-2 border rounded">
                        <div className="d-flex align-items-center">
                            <img src={expense.icon || '/default-icon.png'} alt="Category Icon" className="expense-icon" />
                            <div className="ml-2">
                                <div>{expense.category || 'Không rõ'}</div>
                                <div>{expense.title || 'Không tiêu đề'}</div>
                            </div>
                        </div>
                        <div className="d-flex align-items-center">
                            <div className="text-right">
                                <div style={{ color: 'red' }}>-{expense.amount.toLocaleString('vi-VN')} đ</div>
                                <div>{new Date(expense.date).toLocaleDateString()}</div>
                            </div>
                            <IconButton onClick={(event) => handleExpand(event, expense._id)} size="small">
                                <FaEllipsisV />
                            </IconButton>
                            <Menu
                                anchorEl={anchorEl}
                                open={expandedExpenseId === expense._id}
                                onClose={handleClose}
                                anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                                transformOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                            >
                                <MenuItem onClick={() => {
                                    onDeleteExpense(expense._id);
                                    handleClose();
                                }}>
                                    Xóa giao dịch
                                </MenuItem>
                                <MenuItem onClick={() => {
                                    onDeleteExpense(expense._id);
                                    handleClose();
                                }}>
                                    Sửa giao dịch
                                </MenuItem>
                            </Menu>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CalendarList;
