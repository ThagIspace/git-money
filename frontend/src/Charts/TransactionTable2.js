import React, { useContext, useState } from 'react';
import { ExpenseContext } from '../context/ExpenseContext';
import { Card, ListGroup, ListGroupItem, Modal, Button, DropdownButton, Dropdown } from 'react-bootstrap';
import { FaEllipsisV, FaUtensils, FaShoppingCart, FaTshirt, FaMoneyBillWave, FaLaptop } from 'react-icons/fa';

const TransactionTable2 = () => {
    const { expenses } = useContext(ExpenseContext);
    const [showModal, setShowModal] = useState(false);
    const [itemsToShow, setItemsToShow] = useState(5); // Số mục hiển thị mặc định

    // Mapping categories to icons
    const iconsMap = {
        "Ăn uống": <FaUtensils />,
        "Mua sắm, Đồ ăn - Thú nuôi": <FaShoppingCart />,
        "Giày dép, Quần áo": <FaTshirt />,
        "Tiền từ các việc vặt": <FaMoneyBillWave />,
        "Công nghệ": <FaLaptop />
    };

    const handleItemsToShowChange = (number) => {
        setItemsToShow(number);
        setShowModal(false);
    };

    return (
        <Card className="mb-4 mt-4">
            <Card.Body>
                <div className="d-flex justify-content-between">
                    <Card.Title>Các giao dịch</Card.Title>
                    <div onClick={() => setShowModal(true)} style={{ cursor: 'pointer' }}>
                        <FaEllipsisV />
                    </div>
                </div>

                <ListGroup variant="flush">
                    {expenses.slice(0, itemsToShow).map((expense, index) => (
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
                                    {expense.amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                                </div>
                                <div className="text-muted">{new Date(expense.date).toLocaleDateString('vi-VN')}</div>
                            </div>
                        </ListGroupItem>
                    ))}
                </ListGroup>

                {/* Modal cho phép chọn số mục hiển thị */}
                <Modal show={showModal} onHide={() => setShowModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>CÁC GIAO DỊCH</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <DropdownButton title="Số mục hiển thị:" variant="secondary">
                            {[1, 2, 3, 4, 5].map((number) => (
                                <Dropdown.Item key={number} onClick={() => handleItemsToShowChange(number)}>
                                    {number}
                                </Dropdown.Item>
                            ))}
                        </DropdownButton>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowModal(false)}>
                            HỦY
                        </Button>
                        <Button variant="primary" onClick={() => setShowModal(false)}>
                            LƯU LẠI
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Card.Body>
        </Card>
    );
};

export default TransactionTable2;
