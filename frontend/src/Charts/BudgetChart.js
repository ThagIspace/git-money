import React, { useContext, useState } from 'react';
import { BudgetContext } from '../context/BudgetContext';
import { Card, ProgressBar, ListGroup, ListGroupItem } from 'react-bootstrap';
import SelectableModal from '../components/SelectableModal'; // Import SelectableModal
import { FaEllipsisV } from 'react-icons/fa'; // Import biểu tượng dấu 3 chấm

const BudgetChart = () => {
    const { budgets } = useContext(BudgetContext);
    const [showModal, setShowModal] = useState(false);

    // Các tùy chọn cho SelectableModal
    const options = [
        { label: '1 mục', onSelect: () => console.log('1 mục được chọn') },
        { label: '2 mục', onSelect: () => console.log('2 mục được chọn') },
        { label: '3 mục', onSelect: () => console.log('3 mục được chọn') },
        { label: '4 mục', onSelect: () => console.log('4 mục được chọn') },
    ];

    if (!budgets || budgets.length === 0) {
        return <div className="text-center my-5">Không có dữ liệu ngân sách</div>;
    }

    return (
        <Card className="mb-4 mt-4">
            <Card.Body>
                <div className="d-flex justify-content-between">
                    <Card.Title>Ngân sách</Card.Title>
                    <div onClick={() => setShowModal(true)} style={{ cursor: 'pointer' }}>
                        <FaEllipsisV size={20} /> {/* Kích thước có thể điều chỉnh */}
                    </div>
                </div>
                <ListGroup variant="flush">
                    {budgets.map((budget) => {
                        const spent = budget.spent || 0;
                        const amount = budget.amount || 0;
                        const progress = amount > 0 ? (spent / amount) * 100 : 0;

                        return (
                            <ListGroupItem key={budget._id} className="mb-3">
                                <div className="d-flex justify-content-between align-items-center">
                                    <span className='font-weight-bold h5'>{budget.name}</span>
                                </div>
                                <div className="d-flex justify-content-center align-items-center mb-2">
                                    <span className='font-weight-bold'>{progress.toFixed(0)}%</span>
                                </div>
                                <ProgressBar now={progress} className="my-2" />
                                <div className="d-flex justify-content-between h6">
                                    <small>0 đ</small>
                                    <small>{spent.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</small>
                                    <small>{amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</small>
                                </div>

                            </ListGroupItem>
                        );
                    })}
                </ListGroup>

                {/* Sử dụng SelectableModal với các lựa chọn */}
                <SelectableModal
                    show={showModal}
                    onClose={() => setShowModal(false)}
                    title="LỰA CHỌN NGÂN SÁCH"
                    options={options}
                />
            </Card.Body>
        </Card>
    );
};

export default BudgetChart;
