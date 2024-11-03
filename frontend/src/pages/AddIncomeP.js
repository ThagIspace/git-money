import React, { useState, useContext } from 'react';
import { IncomeContext } from '../context/IncomeContext';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import IncomeList from '../components/IncomeList';
import '../assets/style/sidebar.css'; // Nhập style cho sidebar
import Nav from '../components/Nav';
import { useLocation } from 'react-router-dom';

const AddIncomeP = () => {
    const { addIncome } = useContext(IncomeContext);
    const [isSidebarVisible, setSidebarVisible] = useState(false);
    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]); // Ngày hiện tại

    const toggleSidebar = () => {
        setSidebarVisible(!isSidebarVisible);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const income = {
            title,
            amount: Number(amount.replace(/\./g, '')), // Chuyển đổi sang số
            description: description || ' ',
            date
        };

        addIncome(income); // Gọi hàm để thêm thu nhập
        setTitle('');
        setAmount('');
        setDescription('');
        setDate(new Date().toISOString().split('T')[0]
        );
    };

    const location = useLocation();
    const currentPath = location.pathname;

    return (
        <Container fluid>
            <Row>
                <Col>
                    <div className={`d-flex ${isSidebarVisible ? '' : 'toggled'}`} id="wrapper">
                        <div className="bg-light border-right" id="sidebar-wrapper">
                            <div className="sidebar-heading">Easy Budget</div>
                            <hr />
                            <div className="list-group list-group-flush">
                                <a href="/" className={`list-group-item list-group-item-action ${currentPath === '/' ? 'active' : ''} bg-light `}>
                                    Dashboard
                                </a>
                                <a href="/add-income" className={`list-group-item list-group-item-action ${currentPath === '/add-income' ? 'active' : ''}`}>
                                    Tạo thu nhập
                                </a>
                                <a href="/add-expense" className={`list-group-item list-group-item-action ${currentPath === '/add-expense' ? 'active' : ''} bg-light`}>
                                    Tạo chi tiêu
                                </a>
                                <a href="/add-transit" className={`list-group-item list-group-item-action ${currentPath === '/add-transit' ? 'active' : ''} bg-light`}>
                                    Các giao dịch
                                </a>
                            </div>
                        </div>

                        <div id="page-content-wrapper">
                            <Nav toggleSidebar={toggleSidebar} />
                            <div className="container-fluid">
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
                                                    className="w-50" // Thêm lớp CSS để giảm chiều rộng
                                                    value={date}
                                                    onChange={(e) => setDate(e.target.value || new Date().toISOString().split('T')[0])}
                                                    required
                                                />
                                            </Form.Group>


                                            <div className="d-flex justify-content-center mt-4">
                                                <Button variant="primary" type="submit">
                                                    Thêm Thu Nhập
                                                </Button>
                                            </div>

                                        </Form>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <IncomeList />
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default AddIncomeP;
