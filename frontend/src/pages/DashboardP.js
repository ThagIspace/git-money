// DashboardP.js
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { IncomeContext } from '../context/IncomeContext';
import { ExpenseContext } from '../context/ExpenseContext';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { ExpenseChart } from '../Charts/ExpenseChart';
import TransactionTable from '../components/TransactionTable';
import TransactionTable2 from '../components/TransactionTable2';
import Charts from '../Charts/Charts';
import '../assets/style/sidebar.css';
import Nav from '../components/Nav';

const DashboardP = () => {
    const [isSidebarVisible, setSidebarVisible] = useState(false);
    const { incomes, setIncomes } = useContext(IncomeContext);
    const { expenses, setExpenses } = useContext(ExpenseContext);

    const toggleSidebar = () => {
        setSidebarVisible(!isSidebarVisible);
    };

    useEffect(() => {
        const fetchIncomes = async () => {
            const response = await axios.get('http://localhost:5000/api/v1/get-incomes');
            setIncomes(response.data);
        };

        const fetchExpenses = async () => {
            const response = await axios.get('http://localhost:5000/api/v1/get-expenses');
            setExpenses(response.data);
        };

        fetchIncomes();
        fetchExpenses();
    }, [setIncomes, setExpenses]);

    const totalIncome = incomes.reduce((acc, income) => acc + income.amount, 0);
    const totalExpense = expenses.reduce((acc, expense) => acc + expense.amount, 0);
    const balance = totalIncome - totalExpense;

    const barData = [
        { name: 'Jan', income: 3000, expense: 2400 },
        { name: 'Feb', income: 5000, expense: 1398 },
        { name: 'Mar', income: 2000, expense: 9800 },
        { name: 'Apr', income: 2780, expense: 3908 },
        { name: 'May', income: 1890, expense: 4800 },
        { name: 'Jun', income: 2390, expense: 3800 },
        { name: 'Jul', income: 3490, expense: 4300 }
    ];

    return (
        <Container fluid>
            <Row>
                <Col>
                    <div className="MainDiv">
                        <div className={`d-flex ${isSidebarVisible ? '' : 'toggled'}`} id="wrapper">
                            <div className="bg-light border-right" id="sidebar-wrapper">
                                <div className="sidebar-heading">Easy Budget</div>
                                <hr></hr>
                                <div className="list-group list-group-flush">
                                    <a href="/" className="list-group-item list-group-item-action bg-light">Dashboard</a>
                                    <a href="add-income" className="list-group-item list-group-item-action bg-light">Tạo thu nhập</a>
                                    <a href="add-expense" className="list-group-item list-group-item-action bg-light">Tạo chi tiêu</a>
                                    <a href="/add-transit" className="list-group-item list-group-item-action bg-light">Tạo giao dịch</a>
                                </div>
                            </div>

                            <div id="page-content-wrapper">
                                <Nav toggleSidebar={toggleSidebar} />
                                <div className="container-fluid">
                                    <Row>
                                        <Col md={4}>
                                            <Card className="mb-4 mt-4">
                                                <Card.Body>
                                                    <Card.Title>Số Dư</Card.Title>
                                                    <Card.Text>
                                                        {balance.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                                                    </Card.Text>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                        <Col md={4}>
                                            <Card className="mb-4 mt-4">
                                                <Card.Body>
                                                    <Card.Title>Tổng Thu Nhập</Card.Title>
                                                    <Card.Text>
                                                        {totalIncome.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                                                    </Card.Text>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                        <Col md={4}>
                                            <Card className="mb-4 mt-4">
                                                <Card.Body>
                                                    <Card.Title>Tổng Chi Tiêu</Card.Title>
                                                    <Card.Text>
                                                        {totalExpense.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                                                    </Card.Text>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    </Row>

                                    <Row>
                                        {/* Left Chart (from Charts) */}
                                        <Col md={6}>
                                            <Charts totalIncome={totalIncome} totalExpense={totalExpense} barData={barData} />
                                        </Col>

                                        {/* Right Chart (ExpenseChart) */}
                                        <Col md={6}>
                                            <Card className="mb-4 mt-4">
                                                <Card.Body>
                                                    <Card.Title>Chi tiêu hằng tháng</Card.Title>
                                                    <div style={{ height: '400px' }}>
                                                        <ExpenseChart />
                                                    </div>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    </Row>

                                    {/* Two Transaction Tables side by side */}
                                    <Row>
                                        <Col md={6}>
                                            <TransactionTable />
                                        </Col>
                                        <Col md={6}>
                                            <TransactionTable2 />
                                        </Col>
                                    </Row>
                                </div>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default DashboardP;
