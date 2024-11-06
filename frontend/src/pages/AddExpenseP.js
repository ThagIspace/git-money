// AddExpenseP.js
import React, { useState, useContext } from 'react';
import { ExpenseContext } from '../context/ExpenseContext';
import { BudgetContext } from '../context/BudgetContext';
import { Form, Button, Container, Row, Col, Modal } from 'react-bootstrap';
import ExpenseList from '../components/ExpenseList';
import TopBar from '../components/Topbar';
import Nav from '../components/Nav';
import Sidebar from '../components/Sidebar';

const AddExpenseP = () => {
    const { addExpense } = useContext(ExpenseContext);
    const { budgets, updateBudgetSpent } = useContext(BudgetContext);
    const [isModalVisible, setModalVisible] = useState(false);
    const [isSidebarVisible, setSidebarVisible] = useState(false);

    const [formData, setFormData] = useState({
        title: '',
        amount: '',
        category: '',
        description: '',
        date: new Date().toISOString().split('T')[0],
    });

    const toggleSidebar = () => setSidebarVisible(!isSidebarVisible);

    const handleInputChange = (field, value) => {
        if (field === 'amount') {
            // Format số tiền
            value = new Intl.NumberFormat('vi-VN').format(value.replace(/\./g, ''));
        }
        setFormData({ ...formData, [field]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const expenseAmount = Number(formData.amount.replace(/\./g, ''));

        addExpense({ ...formData, amount: expenseAmount });
        updateBudgetSpent(formData.category, expenseAmount);

        setFormData({
            title: '',
            amount: '',
            category: '',
            description: '',
            date: new Date().toISOString().split('T')[0],
        });
        setModalVisible(false);
    };

    const formFields = [
        { id: 'title', label: 'Tiêu Đề', type: 'text', required: true },
        { id: 'amount', label: 'Số Tiền', type: 'text', required: true },
        { id: 'category', label: 'Danh Mục', type: 'select', required: true, options: budgets.map(b => ({ value: b.name, label: b.name })) },
        { id: 'description', label: 'Mô Tả', type: 'text' },
        { id: 'date', label: 'Ngày', type: 'date', required: true }
    ];

    return (
        <div className='mt-5'>
            <div className={`d-flex ${isSidebarVisible ? 'sidebar-open' : ''}`} id="wrapper">
                <Sidebar />
                <div id="page-content-wrapper">
                    <TopBar onToggleSidebar={toggleSidebar} />
                    <Nav toggleSidebar={toggleSidebar} className="d-lg-none" />
                    <div className="container-fluid">
                        <Row className="justify-content-center mt-5">
                            <Col md={6}>
                                <div className="text-center">
                                    <Button variant="primary" onClick={() => setModalVisible(true)}>Thêm Chi Phí</Button>
                                </div>
                                <Modal show={isModalVisible} onHide={() => setModalVisible(false)}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Thêm Chi Phí</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <Form onSubmit={handleSubmit}>
                                            {formFields.map(({ id, label, type, required, options }) => (
                                                <Form.Group controlId={id} key={id} className="mt-3">
                                                    <Form.Label>{label}</Form.Label>
                                                    {type === 'select' ? (
                                                        <Form.Control as="select" value={formData[id]} onChange={(e) => handleInputChange(id, e.target.value)} required={required}>
                                                            <option value="">Chọn {label.toLowerCase()}</option>
                                                            {options.map(option => (
                                                                <option key={option.value} value={option.value}>{option.label}</option>
                                                            ))}
                                                        </Form.Control>
                                                    ) : (
                                                        <Form.Control
                                                            type={type}
                                                            value={formData[id]}
                                                            onChange={(e) => handleInputChange(id, e.target.value)}
                                                            placeholder={`Nhập ${label.toLowerCase()}`}
                                                            required={required}
                                                        />
                                                    )}
                                                </Form.Group>
                                            ))}
                                            <div className="d-flex justify-content-center mt-4">
                                                <Button variant="primary" type="submit">Xác Nhận</Button>
                                                <Button variant="secondary" onClick={() => setModalVisible(false)} className="ms-2">Huỷ</Button>
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
        </div>
    );
};

export default AddExpenseP;
