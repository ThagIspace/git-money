// components/BudgetList.js
import React, { useContext } from 'react';
import { BudgetContext } from '../context/BudgetContext';
import { Card, Button, ProgressBar, Row, Col } from 'react-bootstrap';

const BudgetList = () => {
    const { budgets, deleteBudget, loading } = useContext(BudgetContext);

    const handleDelete = (id) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa ngân sách này không?')) {
            deleteBudget(id);
        }
    };

    if (loading) {
        return <div className="text-center my-5"><span>Đang tải...</span></div>;
    }

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Existing Budgets</h2>
            <Row>
                {budgets.map((budget) => {
                    const spent = budget.spent || 0;
                    const remaining = budget.amount - spent;
                    const progress = (spent / budget.amount) * 100;

                    return (
                        <Col md={4} className="mb-4" key={budget._id}>
                            <Card className="h-100" style={{ borderColor: '#' + (Math.random() * 0xFFFFFF << 0).toString(16) }}>
                                <Card.Body>
                                    <Card.Title className="d-flex justify-content-between align-items-center">
                                        <span>{budget.name}</span>
                                        <span>{budget.amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })} Budgeted</span>
                                    </Card.Title>
                                    <ProgressBar now={progress} className="my-3" />
                                    <div className="d-flex justify-content-between">
                                        <small>{spent.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })} spent</small>
                                        <small>{remaining.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })} remaining</small>
                                    </div>
                                    <Button variant="danger" className="mt-3 w-100" onClick={() => handleDelete(budget._id)}>
                                        Xóa
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    );
                })}
            </Row>
            {budgets.length === 0 && (
                <div className="text-center my-5">
                    <p>Không có dữ liệu</p>
                </div>
            )}
        </div>
    );
};

export default BudgetList;
