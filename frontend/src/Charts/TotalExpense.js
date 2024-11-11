import React from 'react';
import { Card, Col } from 'react-bootstrap';

const TotalExpense = ({ totalExpense }) => (
    <Col md={4} sm={12}>
        <Card className="mb-4 mt-4">
            <Card.Body>
                <Card.Title>Tổng Chi Tiêu</Card.Title>
                <Card.Text>
                    {totalExpense.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                </Card.Text>
            </Card.Body>
        </Card>
    </Col>
);

export default TotalExpense;
