import React, { useState, useContext } from 'react';
import { IconButton, Menu, MenuItem } from '@mui/material';
import { FaEllipsisV } from 'react-icons/fa';
import { IncomeContext } from '../context/IncomeContext';
import { ExpenseContext } from '../context/ExpenseContext';

const CalendarList = ({ selectedDay }) => {
    const [expandedItemId, setExpandedItemId] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);

    // Context for handling income and expense operations
    const { deleteIncome, setEditingIncome, updateIncome } = useContext(IncomeContext);
    const { deleteExpense, setEditingExpense, updateExpense } = useContext(ExpenseContext);

    if (!selectedDay) return null;

    // Calculate total income, expense, and net amount
    const totalIncome = selectedDay.incomes.reduce((sum, inc) => sum + inc.amount, 0);
    const totalExpense = selectedDay.expenses.reduce((sum, exp) => sum + exp.amount, 0);
    const netAmount = totalIncome - totalExpense;

    // Handle expanding menu for edit/delete actions
    const handleExpand = (event, id) => {
        setAnchorEl(event.currentTarget);
        setExpandedItemId(id);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setExpandedItemId(null);
    };

    // Function to handle update logic when the edit action is confirmed
    const handleEditItem = (item, isIncome) => {
        if (isIncome) {
            setEditingIncome(item);
        } else {
            setEditingExpense(item);
        }
        handleClose();
    };

    // Function to render each income or expense item
    const renderItem = (item, isIncome = false) => (
        <div key={item._id} className={`${isIncome ? 'income-item' : 'expense-item'} d-flex justify-content-between align-items-center mt-3 p-2 border rounded`}>
            <div className="d-flex align-items-center">
                {!isIncome && <img src={item.icon || '/default-icon.png'} alt="Icon" className="item-icon" />}
                <div className="ml-2">
                    {!isIncome && <div>{item.category || 'Không rõ'}</div>}
                    <div>{item.title || 'Không tiêu đề'}</div>
                </div>
            </div>
            <div className="d-flex align-items-center">
                <div className="text-right">
                    <div style={{ color: isIncome ? 'green' : 'red' }}>
                        {isIncome ? `+${item.amount.toLocaleString('vi-VN')}` : `-${item.amount.toLocaleString('vi-VN')}`} đ
                    </div>
                    <div>{new Date(item.date).toLocaleDateString()}</div>
                </div>
                <IconButton onClick={(event) => handleExpand(event, item._id)} size="small">
                    <FaEllipsisV />
                </IconButton>
                <Menu
                    anchorEl={anchorEl}
                    open={expandedItemId === item._id}
                    onClose={handleClose}
                    anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                    transformOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                >
                    <MenuItem onClick={() => {
                        isIncome ? deleteIncome(item._id) : deleteExpense(item._id);
                        handleClose();
                    }}>
                        Xóa {isIncome ? 'thu nhập' : 'giao dịch'}
                    </MenuItem>
                    <MenuItem onClick={() => handleEditItem(item, isIncome)}>
                        Sửa {isIncome ? 'thu nhập' : 'giao dịch'}
                    </MenuItem>
                </Menu>
            </div>
        </div>
    );

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
                {selectedDay.expenses.map(expense => renderItem(expense))}
            </div>
            <div className="income-list-container">
                {selectedDay.incomes.map(income => renderItem(income, true))}
            </div>
        </div>
    );
};

export default CalendarList;
