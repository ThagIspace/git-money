import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import Sidebar from '../components/Sidebar';
import TopBar from '../components/Topbar';
import TransactionList from '../components/TransactionList'; // Import TransactionList
import axios from 'axios';
import "../assets/style/addP.css";

const AddTransactionP = () => {
    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [isSidebarVisible, setSidebarVisible] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Chuyển đổi amount sang số
        const transaction = {
            title,
            amount: parseFloat(amount), // Chuyển đổi amount thành số thực
            category,
            description,
            date
        };

        try {
            const response = await axios.post('http://localhost:5000/api/v1/add-transaction', transaction);
            console.log('Transaction added:', response.data);
            // Reset form sau khi thêm
            setTitle('');
            setAmount('');
            setCategory('');
            setDescription('');
            setDate('');
        } catch (error) {
            console.error('Error adding transaction:', error);
        }
    };

    const toggleSidebar = () => {
        setSidebarVisible(!isSidebarVisible);
    };

    return (
        <Container fluid>
            <TopBar onToggleSidebar={toggleSidebar} />
            <Row>
                <Col
                    md={3}
                    className={`sidebar-col ${isSidebarVisible ? 'visible' : 'hidden'}`}
                    style={{ padding: 0 }}
                >
                    <Sidebar visible={isSidebarVisible} />
                </Col>
                <Col
                    md={isSidebarVisible ? 9 : 12}
                    className={`main-content ${isSidebarVisible ? '' : 'full'}`}
                    style={{ transition: 'all 0.3s ease' }}
                >
                    <Row>
                        {/* Cột trái: AddTransactionP */}
                        <Col md={6}>
                            <Form className="transaction-form" onSubmit={handleSubmit}>
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
                                        Add
                                    </Button>
                                    <Button href="/" variant="danger">
                                        Back
                                    </Button>
                                </div>
                            </Form>
                        </Col>

                        {/* Cột phải: TransactionList */}
                        <Col md={6}>
                            <TransactionList />
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
};

export default AddTransactionP;
