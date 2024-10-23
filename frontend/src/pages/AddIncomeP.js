import React, { useState, useContext, useEffect } from 'react';
import { IncomeContext } from '../context/IncomeContext';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import IncomeList from '../components/IncomeList'; // Nhập Danh Sách Thu Nhập

const AddIncomeP = () => {
    const { addIncome, incomes } = useContext(IncomeContext);
    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]); // Ngày hiện tại

    const handleSubmit = (e) => {
        e.preventDefault();
        const income = {
            title,
            amount: Number(amount.replace(/\./g, '')), // Chuyển đổi sang số
            category,
            description: description || ' ', // Nếu không nhập thì gán thành chuỗi rỗng
            date
        };

        addIncome(income); // Gọi hàm để thêm thu nhập
        setTitle('');
        setAmount('');
        setCategory('');
        setDescription('');
        setDate(new Date().toISOString().split('T')[0]); // Reset lại ngày
    };

    useEffect(() => {
    }, [incomes]);

    return (
        <Container fluid>
            <Row className="justify-content-center mt-5">
                <Col md={6}>
                    <h1 className="h2 text-center">Thêm Thu Nhập</h1>
                    <Form className="income-form" onSubmit={handleSubmit}>
                        <Form.Group controlId="title">
                            <Form.Label>Tiêu Đề</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Nhập tiêu đề"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="amount">
                            <Form.Label>Số Tiền</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Nhập số tiền"
                                value={amount}
                                onChange={(e) => {
                                    const value = e.target.value.replace(/\./g, '');
                                    const formattedValue = new Intl.NumberFormat('vi-VN').format(value);
                                    setAmount(formattedValue);
                                }}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="category">
                            <Form.Label>Danh Mục</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Nhập danh mục"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                required
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
                                onChange={(e) => setDate(e.target.value || new Date().toISOString().split('T')[0])}
                                required
                            />
                        </Form.Group>

                        <div className="d-flex justify-content-between mt-4">
                            <Button variant="primary" type="submit">
                                Thêm Thu Nhập
                            </Button>
                            <Button href="/" variant="danger">
                                Quay Lại
                            </Button>
                        </div>
                    </Form>
                </Col>
            </Row>
            <Row>
                <Col>
                    <IncomeList /> {/* Hiển thị danh sách thu nhập */}
                </Col>
            </Row>
        </Container>
    );
};

export default AddIncomeP;
