import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import ExpenseList from '../components/ExpenseList';


const AddExpenseP = () => {
    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [isSidebarVisible, setSidebarVisible] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const expense = { title, amount, category, description, date };

        try {
            const response = await axios.post('http://localhost:5000/api/v1/add-expense', expense);
            console.log('Chi phí đã được thêm:', response.data);
        } catch (error) {
            console.error('Lỗi khi thêm chi phí:', error);
        }
    };

    return (
        <Container fluid>
            <Row>
                <Col>
                    <Row>
                        <Col md={6}>
                            <Form className="expense-form" onSubmit={handleSubmit}>
                                <Form.Group controlId="title">
                                    <Form.Label>Tiêu Đề</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Nhập tiêu đề"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group controlId="amount">
                                    <Form.Label>Số Tiền</Form.Label>
                                    <Form.Control
                                        type="number"
                                        placeholder="Nhập số tiền"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group controlId="category">
                                    <Form.Label>Danh Mục</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Nhập danh mục"
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group controlId="description">
                                    <Form.Label>Mô Tả</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Nhập mô tả"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group controlId="date">
                                    <Form.Label>Ngày</Form.Label>
                                    <Form.Control
                                        type="date"
                                        value={date}
                                        onChange={(e) => setDate(e.target.value)}
                                    />
                                </Form.Group>

                                <div className="d-flex justify-content-between">
                                    <Button variant="primary" type="submit">
                                        Thêm Chi Phí
                                    </Button>
                                    <Button href="/" variant="danger">
                                        Quay Lại
                                    </Button>
                                </div>
                            </Form>
                        </Col>

                        <Col md={6}>
                            <ExpenseList />
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
};

export default AddExpenseP;
