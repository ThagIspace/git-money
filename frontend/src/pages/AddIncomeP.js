import React, { useState, useContext, useEffect } from 'react';
import { IncomeContext } from '../context/IncomeContext';
import { Button, Row, Col, Modal } from 'react-bootstrap'; // Thêm Modal từ react-bootstrap
import IncomeForm from '../components/IncomeForm';
import TopBar from '../components/Topbar';
import Nav from '../components/Nav';
import Sidebar from '../components/Sidebar';
import IncomeList from '../components/IncomeList';

const AddIncomeP = () => {
    const { addIncome, editingIncome, setEditingIncome, updateIncome } = useContext(IncomeContext);
    const [isSidebarVisible, setSidebarVisible] = useState(false);
    const [isModalVisible, setModalVisible] = useState(false); // Trạng thái hiển thị modal

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
            setModalVisible(true); // Hiển thị modal khi chỉnh sửa
        }
    }, [editingIncome]);

    const toggleSidebar = () => setSidebarVisible(!isSidebarVisible);

    const handleInputChange = (field, value) => {
        if (field === 'amount') {
            value = value.replace(/\./g, ''); // Xóa dấu chấm để tránh lỗi nhập số
        }
        setFormData({ ...formData, [field]: value });
    };

    const handleSubmit = (e) => {
        if (e) e.preventDefault();
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
        setModalVisible(false); // Ẩn modal sau khi thêm hoặc cập nhật
    };

    const resetForm = () => {
        setFormData({
            title: '',
            amount: '',
            description: '',
            date: new Date().toISOString().split('T')[0],
        });
    };

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
                                {/* Nút bấm hiển thị modal */}
                                <div className="text-center">
                                    <Button variant="primary" onClick={() => setModalVisible(true)}>Thêm Thu Nhập</Button>
                                </div>
                                {/* Hiển thị modal khi isModalVisible là true */}
                                <Modal show={isModalVisible} onHide={() => setModalVisible(false)}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>{editingIncome ? 'Chỉnh Sửa Thu Nhập' : 'Thêm Thu Nhập'}</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <IncomeForm
                                            formData={formData}
                                            handleInputChange={handleInputChange}
                                            handleSubmit={handleSubmit}
                                        />
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
