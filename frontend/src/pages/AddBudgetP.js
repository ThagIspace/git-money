import React, { useState, useContext } from 'react';
import { BudgetContext } from '../context/BudgetContext';
import { Form, Button, Container, Row, Col, Modal } from 'react-bootstrap';
import BudgetList from '../components/BudgetList';
import TopBar from '../components/Topbar';
import Nav from '../components/Nav';
import { useLocation } from 'react-router-dom';

const AddBudgetP = () => {
    const { addBudget } = useContext(BudgetContext);
    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');
    const [isModalVisible, setModalVisible] = useState(false);
    const [isSidebarVisible, setSidebarVisible] = useState(false);
    const location = useLocation();
    const currentPath = location.pathname;

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
        setModalVisible(false);
    };

    return (
        <Container fluid>
            <div className={`d-flex ${isSidebarVisible ? 'sidebar-open' : ''}`} id="wrapper">
                <div className="bg-light border-right" id="sidebar-wrapper">
                    <div className="sidebar-heading">Easy Budget</div>
                    <hr />
                    <div className="list-group list-group-flush">
                        <a href="/" className={`list-group-item list-group-item-action ${currentPath === '/' ? 'active' : ''}`}>
                            Dashboard
                        </a>
                        <a href="/add-income" className={`list-group-item list-group-item-action ${currentPath === '/add-income' ? 'active' : ''} bg-light`}>
                            Tạo thu nhập
                        </a>
                        <a href="/add-expense" className={`list-group-item list-group-item-action ${currentPath === '/add-expense' ? 'active' : ''} bg-light`}>
                            Tạo chi tiêu
                        </a>
                        <a href="/add-budget" className={`list-group-item list-group-item-action ${currentPath === '/add-budget' ? 'active' : ''} bg-light`}>
                            Tạo ngân sách
                        </a>
                        <a href="/add-transit" className={`list-group-item list-group-item-action ${currentPath === '/add-transit' ? 'active' : ''} bg-light`}>
                            Các giao dịch
                        </a>
                    </div>
                </div>

                <div id="page-content-wrapper">
                    <TopBar onToggleSidebar={toggleSidebar} />
                    <Nav toggleSidebar={toggleSidebar} className="d-lg-none" />
                    <div className="container-fluid">
                        <Row className="justify-content-center mt-5">
                            <Col md={6}>
                                <div className="d-flex justify-content-center">
                                    <Button variant="primary" onClick={() => setModalVisible(true)}>
                                        Thêm Ngân Sách
                                    </Button>
                                </div>

                                <Modal show={isModalVisible} onHide={() => setModalVisible(false)}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Thêm Ngân Sách</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
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
                                            <Form.Group controlId="amount" className="mt-3">
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
                                                    Xác Nhận
                                                </Button>
                                                <Button variant="secondary" onClick={() => setModalVisible(false)} className="ms-2">
                                                    Huỷ
                                                </Button>
                                            </div>
                                        </Form>
                                    </Modal.Body>
                                </Modal>
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
        </Container>
    );
};

export default AddBudgetP;
