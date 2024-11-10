import React from 'react';
import { Form, Button } from 'react-bootstrap';

const IncomeForm = ({ formData, handleInputChange, handleSubmit }) => {
    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="title" className="mt-3">
                <Form.Label>Tiêu Đề</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Nhập tiêu đề"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    required
                />
            </Form.Group>
            <Form.Group controlId="amount" className="mt-3">
                <Form.Label>Số Tiền</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Nhập số tiền"
                    value={formData.amount}
                    onChange={(e) => handleInputChange('amount', e.target.value)}
                    required
                />
            </Form.Group>
            <Form.Group controlId="description" className="mt-3">
                <Form.Label>Mô Tả</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Nhập mô tả (không bắt buộc)"
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                />
            </Form.Group>
            <Form.Group controlId="date" className="mt-3">
                <Form.Label>Ngày</Form.Label>
                <Form.Control
                    type="date"
                    value={formData.date}
                    onChange={(e) => handleInputChange('date', e.target.value)}
                    required
                />
            </Form.Group>
            <div className="d-flex justify-content-center mt-4">
                <Button variant="primary" type="submit">Xác Nhận</Button>
                <Button variant="secondary" onClick={() => handleSubmit(null)} className="ms-2">Huỷ</Button>
            </div>
        </Form>
    );
};

export default IncomeForm;
