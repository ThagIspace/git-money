import React, { useState, useContext } from 'react';
import { ExpenseContext } from '../context/ExpenseContext';
import { BudgetContext } from '../context/BudgetContext';
import { Form, Button, Container, Row, Col, Modal } from 'react-bootstrap';
import ExpenseList from '../components/ExpenseList';
import TopBar from '../components/Topbar';
import Nav from '../components/Nav';
import { useLocation } from 'react-router-dom';

const AddExpenseP = () => {
    const { addExpense } = useContext(ExpenseContext);
    const { budgets, updateBudgetSpent } = useContext(BudgetContext);
    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [isModalVisible, setModalVisible] = useState(false);
    const [isSidebarVisible, setSidebarVisible] = useState(false);
    const location = useLocation();
    const currentPath = location.pathname;

    const toggleSidebar = () => {
        setSidebarVisible(!isSidebarVisible);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const expenseAmount = Number(amount.replace(/\./g, ''));
        const expense = {
            title,
            amount: expenseAmount,
            category,
            description: description || ' ',
            date
        };
        addExpense(expense);
        updateBudgetSpent(category, expenseAmount);
        setTitle('');
        setAmount('');
        setCategory('');
        setDescription('');
        setDate(new Date().toISOString().split('T')[0]);
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
                        <a href="/calendar" className={`list-group-item list-group-item-action ${currentPath === '/add-transit' ? 'active' : ''} bg-light`}>
                            Lịch
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
                                        Thêm Chi Phí
                                    </Button>
                                </div>

                                <Modal show={isModalVisible} onHide={() => setModalVisible(false)}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Thêm Chi Phí</Modal.Title>
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
                                            <Form.Group controlId="category" className="mt-3">
                                                <Form.Label>Danh Mục</Form.Label>
                                                <Form.Control
                                                    as="select"
                                                    value={category}
                                                    onChange={(e) => setCategory(e.target.value)}
                                                    required
                                                >
                                                    <option value="">Chọn danh mục ngân sách</option>
                                                    {budgets.map((budget) => (
                                                        <option key={budget._id} value={budget.name}>
                                                            {budget.name}
                                                        </option>
                                                    ))}
                                                </Form.Control>
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
                                <ExpenseList />
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default AddExpenseP;
