import React from 'react';
import { Card, Col } from 'react-bootstrap';

const TotalIncome = ({ totalIncome }) => (
    <Col md={4} sm={12}>
        <Card className="mb-4 mt-4">
            <Card.Body>
                <Card.Title>Tổng Thu Nhập</Card.Title>
                <Card.Text>
                    {totalIncome.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                </Card.Text>
            </Card.Body>
        </Card>
    </Col>
);

export default TotalIncome;
