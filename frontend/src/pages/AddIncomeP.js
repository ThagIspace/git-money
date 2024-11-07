import React, { useState, useContext, useEffect } from 'react';
import { IncomeContext } from '../context/IncomeContext';
import { Form, Button, Modal, Row, Col } from 'react-bootstrap';
import IncomeList from '../components/IncomeList';
import TopBar from '../components/Topbar';
import Nav from '../components/Nav';
import Sidebar from '../components/Sidebar';

const AddIncomeP = () => {
    const { addIncome, editingIncome, setEditingIncome, updateIncome } = useContext(IncomeContext);
    const [isSidebarVisible, setSidebarVisible] = useState(false);
    const [isModalVisible, setModalVisible] = useState(false);

    const [formData, setFormData] = useState({
        title: '',
        amount: '',
        description: '',
        date: new Date().toISOString().split('T')[0],
    });

    useEffect(() => {
        if (editingIncome) {
            setFormData({
                title: editingIncome.title || '',
                amount: editingIncome.amount ? editingIncome.amount.toString() : '',
                description: editingIncome.description || '',
                date: editingIncome.date ? new Date(editingIncome.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
            });
            setModalVisible(true);
        }
    }, [editingIncome]);

    const toggleSidebar = () => setSidebarVisible(!isSidebarVisible);

    const handleInputChange = (field, value) => {
        if (field === 'amount') {
            value = new Intl.NumberFormat('vi-VN').format(value.replace(/\./g, ''));
        }
        setFormData({ ...formData, [field]: value || '' });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingIncome) {
            updateIncome({
                ...formData,
                amount: Number(formData.amount.replace(/\./g, '')),
                description: formData.description || ' ',
                _id: editingIncome._id,
            });
            setEditingIncome(null);
        } else {
            addIncome({
                ...formData,
                amount: Number(formData.amount.replace(/\./g, '')),
                description: formData.description || ' ',
            });
        }
        resetForm();
        setModalVisible(false);
    };

    const resetForm = () => {
        setFormData({
            title: '',
            amount: '',
            description: '',
            date: new Date().toISOString().split('T')[0],
        });
    };

    const formFields = [
        { id: 'title', label: 'Tiêu Đề', type: 'text', required: true },
        { id: 'amount', label: 'Số Tiền', type: 'text', required: true },
        { id: 'description', label: 'Mô Tả', type: 'text' },
        { id: 'date', label: 'Ngày', type: 'date', required: true },
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
                                    <Button variant="primary" onClick={() => setModalVisible(true)}>Thêm Thu Nhập</Button>
                                </div>
                                <Modal show={isModalVisible} onHide={() => setModalVisible(false)}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>{editingIncome ? 'Chỉnh Sửa Thu Nhập' : 'Thêm Thu Nhập'}</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <Form onSubmit={handleSubmit}>
                                            {formFields.map(({ id, label, type, required }) => (
                                                <Form.Group controlId={id} key={id} className="mt-3">
                                                    <Form.Label>{label}</Form.Label>
                                                    <Form.Control
                                                        type={type}
                                                        placeholder={`Nhập ${label.toLowerCase()}`}
                                                        value={formData[id]}
                                                        onChange={(e) => handleInputChange(id, e.target.value)}
                                                        required={required}
                                                    />
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
                                <IncomeList />
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddIncomeP;
