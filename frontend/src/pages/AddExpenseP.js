import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import ExpenseList from '../components/ExpenseList'; // Import TransactionList
import Sidebar from '../components/Sidebar'; // Nếu cần thanh bên
import TopBar from '../components/Topbar'; // Nếu cần thanh trên

const AddExpenseP = () => {
    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [isSidebarVisible, setSidebarVisible] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const expense = { title, amount, category, description, date };

        try {
            const response = await axios.post('http://localhost:5000/api/v1/add-expense', expense);
            console.log('Expense added:', response.data);
        } catch (error) {
            console.error('Error adding expense:', error);
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
                        {/* Form thêm chi tiêu */}
                        <Col md={6}>
                            <Form className="expense-form" onSubmit={handleSubmit}>
                                <Form.Group controlId="title">
                                    <Form.Label>Title</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter title"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group controlId="amount">
                                    <Form.Label>Amount</Form.Label>
                                    <Form.Control
                                        type="number"
                                        placeholder="Enter amount"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group controlId="category">
                                    <Form.Label>Category</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter category"
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group controlId="description">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter description"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group controlId="date">
                                    <Form.Label>Date</Form.Label>
                                    <Form.Control
                                        type="date"
                                        value={date}
                                        onChange={(e) => setDate(e.target.value)}
                                    />
                                </Form.Group>

                                <div className="d-flex justify-content-between">
                                    <Button variant="primary" type="submit">
                                        Add Expense
                                    </Button>
                                    <Button href="/" variant="danger">
                                        Back
                                    </Button>
                                </div>
                            </Form>
                        </Col>

                        <Col md={6}>
                            <ExpenseList />
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
};

export default AddExpenseP;
