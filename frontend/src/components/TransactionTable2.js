import React, { useContext } from 'react';
import { ExpenseContext } from '../context/ExpenseContext';
import { Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import { FaUtensils, FaShoppingCart, FaTshirt, FaMoneyBillWave, FaLaptop } from 'react-icons/fa'; // New icons

const TransactionTable2 = () => {
    const { expenses } = useContext(ExpenseContext);

    // Mapping categories to icons
    const iconsMap = {
        "Ăn uống": <FaUtensils />,
        "Mua sắm, Đồ ăn - Thú nuôi": <FaShoppingCart />,
        "Giày dép, Quần áo": <FaTshirt />,
        "Tiền từ các việc vặt": <FaMoneyBillWave />,
        "Công nghệ": <FaLaptop />
    };

    return (
        <Card className="mb-4">
            <Card.Body>
                <Card.Title>Các giao dịch</Card.Title>
                <ListGroup variant="flush">
                    {expenses.map((expense, index) => (
                        <ListGroupItem key={index} className="d-flex justify-content-between align-items-center">
                            <div className="d-flex align-items-center">
                                <div className="icon" style={{ marginRight: '10px' }}>
                                    {iconsMap[expense.category] || <FaShoppingCart />}
                                </div>
                                <div>
                                    <div>{expense.category}</div>
                                    <div className="text-muted">{expense.account}</div>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className={`text-${expense.amount < 0 ? 'danger' : 'success'}`}>
                                    {expense.amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                                </div>
                                <div className="text-muted">{new Date(expense.date).toLocaleDateString('en-US')}</div>
                            </div>
                        </ListGroupItem>
                    ))}
                </ListGroup>
            </Card.Body>
        </Card>
    );
};

export default TransactionTable2;
