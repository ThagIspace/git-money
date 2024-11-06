import React, { useState, useContext } from 'react';
import { IncomeContext } from '../context/IncomeContext';
import { Form, Button, Modal, Container, Row, Col } from 'react-bootstrap';
import IncomeList from '../components/IncomeList';
import TopBar from '../components/Topbar';
import Nav from '../components/Nav';
import '../assets/style/sidebar.css';
import { useLocation } from 'react-router-dom';

const AddIncomeP = () => {
    const { addIncome } = useContext(IncomeContext);
    const [isSidebarVisible, setSidebarVisible] = useState(false);
    const [isModalVisible, setModalVisible] = useState(false); // Trạng thái điều khiển hiển thị modal
    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

    const toggleSidebar = () => {
        setSidebarVisible(!isSidebarVisible);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const income = {
            title,
            amount: Number(amount.replace(/\./g, '')),
            description: description || ' ',
            date
        };

        addIncome(income);
        setTitle('');
        setAmount('');
        setDescription('');
        setDate(new Date().toISOString().split('T')[0]);
        setModalVisible(false); // Ẩn modal sau khi xác nhận
    };

    const handleCancel = () => {
        setModalVisible(false); // Ẩn modal khi nhấn "Huỷ"
    };

    const location = useLocation();
    const currentPath = location.pathname;

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
                                        Thêm Thu Nhập
                                    </Button>
                                </div>

                                <Modal show={isModalVisible} onHide={handleCancel}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Thêm Thu Nhập</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <Form onSubmit={handleSubmit}>
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

                                            <Form.Group controlId="description" className="mt-3">
                                                <Form.Label>Mô Tả</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Nhập mô tả"
                                                    value={description}
                                                    onChange={(e) => setDescription(e.target.value)}
                                                />
                                            </Form.Group>

                                            <Form.Group controlId="date" className="mt-3">
                                                <Form.Label>Ngày</Form.Label>
                                                <Form.Control
                                                    type="date"
                                                    className="w-100"
                                                    value={date}
                                                    onChange={(e) => setDate(e.target.value || new Date().toISOString().split('T')[0])}
                                                    required
                                                />
                                            </Form.Group>
                                        </Form>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={handleCancel}>
                                            Huỷ
                                        </Button>
                                        <Button variant="primary" onClick={handleSubmit}>
                                            Xác Nhận
                                        </Button>
                                    </Modal.Footer>
                                </Modal>
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
        </Container>
    );
};

export default AddIncomeP;
