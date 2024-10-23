import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card } from 'react-bootstrap';

const Dashboard = () => {
    const [transactions, setTransactions] = useState({ incomes: [], expenses: [] });

    useEffect(() => {
        const fetchTransactions = async () => {
            const incomeResponse = await axios.get('/api/v1/get-incomes');
            const expenseResponse = await axios.get('/api/v1/get-expenses');
            setTransactions({
                incomes: incomeResponse.data,
                expenses: expenseResponse.data
            });
        };
        fetchTransactions();
    }, []);

    return (
        <Container>
            <Row>
                <Col md={6}>
                    <Card>
                        <Card.Header>Incomes</Card.Header>
                        <Card.Body>
                            {transactions.incomes.map(income => (
                                <p key={income._id}>{income.title} - {income.amount}</p>
                            ))}
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={6}>
                    <Card>
                        <Card.Header>Expenses</Card.Header>
                        <Card.Body>
                            {transactions.expenses.map(expense => (
                                <p key={expense._id}>{expense.title} - {expense.amount}</p>
                            ))}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Dashboard;
