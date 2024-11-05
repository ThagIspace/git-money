// components/AddBudgetP.js
import React, { useState, useContext } from 'react';
import { BudgetContext } from '../context/BudgetContext';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import BudgetList from '../components/BudgetList';
import '../assets/style/sidebar.css';
import Nav from '../components/Nav';
import { useLocation } from 'react-router-dom';

const AddBudgetP = () => {
    const { addBudget } = useContext(BudgetContext);
    const [isSidebarVisible, setSidebarVisible] = useState(false);
    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');

    const toggleSidebar = () => {
        setSidebarVisible(!isSidebarVisible);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const budget = {
            name,
            amount: Number(amount.replace(/\./g, '')),
        };

        addBudget(budget);
        setName('');
        setAmount('');
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
                                <a href="/" className={`list-group-item list-group-item-action ${currentPath === '/' ? 'active' : ''} bg-light`}>
                                    Dashboard
                                </a>
                                <a href="/add-income" className={`list-group-item list-group-item-action ${currentPath === '/add-income' ? 'active' : ''} bg-light`}>
                                    Tạo thu nhập
                                </a>
                                <a href="/add-expense" className={`list-group-item list-group-item-action ${currentPath === '/add-expense' ? 'active' : ''}`}>
                                    Tạo chi tiêu
                                </a>
                                <a href="/add-budget" className={`list-group-item list-group-item-action ${currentPath === '/add-budget' ? 'active' : ''} bg-light`}>
                                    Tạo ngân sách
                                </a>
                            </div>
                        </div>

                        <div id="page-content-wrapper">
                            <Nav toggleSidebar={toggleSidebar} />
                            <div className="container-fluid">
                                <Row className="justify-content-center mt-5">
                                    <Col md={6}>
                                        <h2 className="text-center">Thêm Ngân Sách</h2>
                                        <Form onSubmit={handleSubmit}>
                                            <Form.Group controlId="name">
                                                <Form.Label>Tên Ngân Sách</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Nhập tên ngân sách"
                                                    value={name}
                                                    onChange={(e) => setName(e.target.value)}
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

                                            <div className="d-flex justify-content-center mt-4">
                                                <Button variant="primary" type="submit">
                                                    Thêm Ngân Sách
                                                </Button>
                                            </div>
                                        </Form>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <BudgetList />
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

export default AddBudgetP;
