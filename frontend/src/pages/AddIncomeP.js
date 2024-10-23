import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import IncomeList from '../components/IncomeList'; // Nhập Danh Sách Thu Nhập
import Sidebar from '../components/Sidebar'; // Nếu cần thanh bên
import TopBar from '../components/Topbar'; // Nếu cần thanh trên
import "../assets/style/addP.css";


const AddIncomeP = () => {
    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [isSidebarVisible, setSidebarVisible] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const income = { title, amount, category, description, date };

        try {
            const response = await axios.post('http://localhost:5000/api/v1/add-income', income);
            console.log('Thu nhập đã được thêm:', response.data);
        } catch (error) {
            console.error('Lỗi khi thêm thu nhập:', error);
        }
    };

    const toggleSidebar = () => {
        setSidebarVisible(!isSidebarVisible);
    };

    return (
        <Container fluid>
            <TopBar onToggleSidebar={toggleSidebar} />
            <Row>
                <Col md={3} className={`sidebar-col ${isSidebarVisible ? 'visible' : 'hidden'}`} style={{ padding: 0 }}>
                    <Sidebar visible={isSidebarVisible} />
                </Col>
                <Col md={isSidebarVisible ? 9 : 12} className="main-content" style={{ transition: 'all 0.3s ease' }}>
                    <Row>
                        {/* Form thêm thu nhập */}
                        <Col md={6}>
                            <Form className="income-form" onSubmit={handleSubmit}>
                                <Form.Group controlId="title">
                                    <Form.Label>Tiêu Đề</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Nhập tiêu đề"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group controlId="amount">
                                    <Form.Label>Số Tiền</Form.Label>
                                    <Form.Control
                                        type="number"
                                        placeholder="Nhập số tiền"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group controlId="category">
                                    <Form.Label>Danh Mục</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Nhập danh mục"
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
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
                                        onChange={(e) => setDate(e.target.value)}
                                    />
                                </Form.Group>

                                <div className="d-flex justify-content-between">
                                    <Button variant="primary" type="submit">
                                        Thêm Thu Nhập
                                    </Button>
                                    <Button href="/" variant="danger">
                                        Quay Lại
                                    </Button>
                                </div>
                            </Form>
                        </Col>
                        <Col md={6}>
                            <IncomeList />
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
};

export default AddIncomeP;
