import React from 'react';
import { Card, Col } from 'react-bootstrap';

const Balance = ({ balance, totalIncome, totalExpense }) => (
    <Col md={4} sm={12}>
        <Card className="mb-4 mt-4">
            <Card.Body>
                <Card.Title>Tóm Tắt</Card.Title>
                <div className="d-flex justify-content-between">
                    <span>Tổng Thu Nhập:</span>
                    <strong style={{ color: 'green' }}>
                        {totalIncome.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                    </strong>
                </div>
                <div className="d-flex justify-content-between mt-2">
                    <span>Tổng Chi Phí:</span>
                    <strong style={{ color: 'red' }}>
                        {totalExpense.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                    </strong>
                </div>
                <hr style={{ border: '1px solid #ccc' }} />
                <div className="d-flex justify-content-between mt-2">
                    <span>Số dư:</span>
                    <strong style={{ color: balance >= 0 ? 'green' : 'red' }}>
                        {balance.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                    </strong>
                </div>
            </Card.Body>
        </Card>
    </Col>
);

export default Balance;
