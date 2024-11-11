// TransactionList.js
import React from 'react';
import { IconButton, Menu, MenuItem } from '@mui/material';
import { FaEllipsisV } from 'react-icons/fa';

const TransactionList = ({
    monthlyTransactions,
    calculateNetTotal,
    handleExpand,
    handleClose,
    handleDeleteItem,
    handleEditItem,
    anchorEl,
    expandedItemId
}) => {
    return (
        <>
            <div className="transaction-summary d-flex justify-content-between align-items-center">
                <h5>Các giao dịch: {monthlyTransactions.length}</h5>
                <h5 style={{ color: calculateNetTotal() >= 0 ? 'green' : 'red' }}>
                    Tổng cộng: {calculateNetTotal().toLocaleString('vi-VN')} đ
                </h5>
            </div>
            <div className="transaction-list">
                {monthlyTransactions.map((transaction, index) => {
                    const isIncome = transaction.type === 'income';
                    return (
                        <div key={index} className={`transaction-item ${isIncome ? 'income-item' : 'expense-item'} d-flex justify-content-between align-items-center mt-3 p-2 border rounded`}>
                            <div className="d-flex align-items-center">
                                {transaction.icon && <img src={transaction.icon || '/default-icon.png'} alt="Icon" className="transaction-icon" />}
                                <div className="ml-2">
                                    <div>{transaction.title || 'Không tiêu đề'}</div>
                                    <div className="transaction-category">{transaction.category}</div>
                                </div>
                            </div>
                            <div className="d-flex align-items-center">
                                <div className="text-right">
                                    <div style={{ color: isIncome ? 'green' : 'red' }}>
                                        {isIncome ? `+${transaction.amount.toLocaleString('vi-VN')}` : `-${Math.abs(transaction.amount).toLocaleString('vi-VN')}`} đ
                                    </div>
                                    <div>{new Date(transaction.date).toLocaleDateString()}</div>
                                </div>
                                <IconButton onClick={(event) => handleExpand(event, transaction._id)} size="small">
                                    <FaEllipsisV />
                                </IconButton>
                                <Menu
                                    anchorEl={anchorEl}
                                    open={expandedItemId === transaction._id}
                                    onClose={handleClose}
                                    anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                                    transformOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                                >
                                    <MenuItem onClick={() => handleDeleteItem(transaction._id, isIncome)}>
                                        Xóa {isIncome ? 'thu nhập' : 'giao dịch'}
                                    </MenuItem>
                                    <MenuItem onClick={() => handleEditItem(transaction, isIncome)}>
                                        Sửa {isIncome ? 'thu nhập' : 'giao dịch'}
                                    </MenuItem>
                                </Menu>
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default TransactionList;
