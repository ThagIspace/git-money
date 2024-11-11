import React from 'react';
import { Card, Col } from 'react-bootstrap';

const Balance = ({ balance }) => (
    <Col md={4} sm={12}>
        <Card className="mb-4 mt-4">
            <Card.Body>
                <Card.Title>Số Dư</Card.Title>
                <Card.Text>
                    {balance.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                </Card.Text>
            </Card.Body>
        </Card>
    </Col>
);

export default Balance;
