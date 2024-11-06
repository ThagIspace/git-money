// AddBudgetP.js
import React, { useState, useContext } from 'react';
import { BudgetContext } from '../context/BudgetContext';
import { Form, Button, Container, Row, Col, Modal } from 'react-bootstrap';
import BudgetList from '../components/BudgetList';
import TopBar from '../components/Topbar';
import Nav from '../components/Nav';
import Sidebar from '../components/Sidebar'; // Import Sidebar component

const AddBudgetP = () => {
    const { addBudget } = useContext(BudgetContext);
    const [isModalVisible, setModalVisible] = useState(false);
    const [isSidebarVisible, setSidebarVisible] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        amount: ''
    });

    const toggleSidebar = () => setSidebarVisible(!isSidebarVisible);

    const handleInputChange = (field, value) => {
        if (field === 'amount') {
            // Định dạng số tiền
            value = new Intl.NumberFormat('vi-VN').format(value.replace(/\./g, ''));
        }
        setFormData({ ...formData, [field]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const budget = {
            name: formData.name,
            amount: Number(formData.amount.replace(/\./g, ''))
        };
        addBudget(budget);
        setFormData({ name: '', amount: '' });
        setModalVisible(false);
    };

    return (
        <div className='mt-5'>
            <div className={`d-flex ${isSidebarVisible ? 'sidebar-open' : ''}`} id="wrapper">
                <Sidebar /> {/* Sử dụng Sidebar component */}
                <div id="page-content-wrapper">
                    <TopBar onToggleSidebar={toggleSidebar} />
                    <Nav toggleSidebar={toggleSidebar} className="d-lg-none" />
                    <div className="container-fluid">
                        <Row className="justify-content-center mt-5">
                            <Col md={6}>
                                <div className="text-center">
                                    <Button variant="primary" onClick={() => setModalVisible(true)}>Thêm Ngân Sách</Button>
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
                                                    value={formData.name}
                                                    onChange={(e) => handleInputChange('name', e.target.value)}
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
                                <BudgetList />
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddBudgetP;
