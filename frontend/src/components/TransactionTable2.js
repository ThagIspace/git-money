import React, { useContext } from 'react';
import { IncomeContext } from '../context/IncomeContext';
import { ExpenseContext } from '../context/ExpenseContext';
import { Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import { FaBeer, FaShoppingCart, FaGasPump, FaBirthdayCake, FaUtensils } from 'react-icons/fa'; // Ví dụ các biểu tượng

const TransactionTable = () => {
    const { expenses } = useContext(ExpenseContext); // Giả sử chỉ hiển thị các giao dịch chi tiêu

    const iconsMap = {
        "Quán rượu": <FaBeer />,
        "Giải trí": <FaBirthdayCake />,
        "Ăn uống": <FaUtensils />,
        "Mua sắm, Đồ ăn - Thú nuôi": <FaShoppingCart />,
        "Xăng dầu": <FaGasPump />
    };

    return (
        <Card className="mb-4">
            <Card.Body>
                <Card.Title>Transactions</Card.Title>
                <ListGroup variant="flush">
                    {expenses.map((expense, index) => (
                        <ListGroupItem key={index} className="d-flex justify-content-between align-items-center">
                            <div className="d-flex align-items-center">
                                <div className="icon" style={{ marginRight: '10px' }}>
                                    {iconsMap[expense.category] || <FaShoppingCart />} {/* Hiển thị icon tương ứng */}
                                </div>
                                <div>
                                    <div>{expense.category}</div>
                                    <div className="text-muted">{expense.account}</div>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="text-danger">-{expense.amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</div>
                                <div className="text-muted">{new Date(expense.date).toLocaleDateString('vi-VN')}</div>
                            </div>
                        </ListGroupItem>
                    ))}
                </ListGroup>
            </Card.Body>
        </Card>
    );
};

export default TransactionTable;
