import React, { useContext, useState, useEffect } from 'react';
import { ExpenseContext } from '../context/ExpenseContext';
import { IncomeContext } from '../context/IncomeContext';
import { Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import SelectableModal from '../components/SelectableModal'; // Import component mới
import { FaEllipsisV } from 'react-icons/fa'; // Import biểu tượng dấu 3 chấm

const TransactionTable2 = () => {
    const { expenses } = useContext(ExpenseContext);
    const { incomes } = useContext(IncomeContext);
    const [showModal, setShowModal] = useState(false);
    const [itemsToShow, setItemsToShow] = useState(() => {
        const savedItems = localStorage.getItem('itemsToShow');
        return savedItems ? parseInt(savedItems, 10) : 5;
    });

    const transactions = [...expenses, ...incomes].sort((a, b) => new Date(b.date) - new Date(a.date));

    const handleItemsToShowChange = (number) => {
        setItemsToShow(number);
        localStorage.setItem('itemsToShow', number); // Lưu số mục vào localStorage
        setShowModal(false);
    };

    // Tạo các tùy chọn cho modal
    const options = [
        { label: '1 mục', onSelect: () => handleItemsToShowChange(1) },
        { label: '2 mục', onSelect: () => handleItemsToShowChange(2) },
        { label: '3 mục', onSelect: () => handleItemsToShowChange(3) },
        { label: '4 mục', onSelect: () => handleItemsToShowChange(4) },
    ];

    return (
        <Card className="mb-4 mt-4">
            <Card.Body>
                <div className="d-flex justify-content-between">
                    <Card.Title>Các giao dịch</Card.Title>
                    {/* Bổ sung biểu tượng dấu 3 chấm để kích hoạt modal */}
                    <div onClick={() => setShowModal(true)} style={{ cursor: 'pointer' }}>
                        <FaEllipsisV size={20} /> {/* Kích thước có thể điều chỉnh */}
                    </div>
                </div>

                <ListGroup variant="flush">
                    {transactions.slice(0, itemsToShow).map((transaction, index) => (
                        <ListGroupItem key={index} className="d-flex justify-content-between align-items-center">
                            <div className="d-flex align-items-center">
                                <div>
                                    {transaction.type !== 'income' && (
                                        <div className="text-muted">{transaction.category || 'N/A'}</div>
                                    )}
                                    <div>{transaction.title}</div>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className={`text-${transaction.type === 'income' ? 'success' : 'danger'}`}>
                                    {transaction.amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                                </div>
                                <div className="text-muted">{new Date(transaction.date).toLocaleDateString('vi-VN')}</div>
                            </div>
                        </ListGroupItem>
                    ))}
                </ListGroup>

                {/* Sử dụng SelectableModal với các lựa chọn */}
                <SelectableModal
                    show={showModal}
                    onClose={() => setShowModal(false)}
                    title="CÁC GIAO DỊCH" // Truyền title có thể thay đổi
                    options={options} // Truyền các tùy chọn
                />
            </Card.Body>
        </Card>
    );
};

export default TransactionTable2;
