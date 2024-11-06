// DashboardP.js
import React, { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { IncomeContext } from '../context/IncomeContext';
import { ExpenseContext } from '../context/ExpenseContext';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { ExpenseChart } from '../Charts/ExpenseChart';
import TransactionTable from '../Charts/TransactionTable';
import TransactionTable2 from '../Charts/TransactionTable2';
import SevenDaysChart from '../Charts/Sevendays';
import Ex_InChart from '../Charts/Ex_InChart';
import Nav from '../components/Nav';
import TopBar from '../components/Topbar';
import '../assets/style/sidebar.css';
import axios from 'axios';

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

    const location = useLocation();
    const currentPath = location.pathname;

    return (
        <Container fluid className="p-0">
            <Row className="g-0">
                <Col>
                    <div className="MainDiv">
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
                                    <a href="/add-budget" className={`list-group-item list-group-item-action ${currentPath === '/add-expense' ? 'active' : ''} bg-light`}>
                                        Tạo ngân sách
                                    </a>
                                    <a href="/add-transit" className={`list-group-item list-group-item-action ${currentPath === '/add-transit' ? 'active' : ''} bg-light`}>
                                        Các giao dịch
                                    </a>
                                </div>
                            </div>

                            <div id="page-content-wrapper">
                                <TopBar onToggleSidebar={toggleSidebar} />
                                <Nav toggleSidebar={toggleSidebar} className="d-lg-none" />

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
                                        <Col md={6}>
                                            <Ex_InChart totalIncome={totalIncome} totalExpense={totalExpense} />
                                        </Col>
                                        <Col md={6} className='mt-4'>
                                            <SevenDaysChart />
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col md={6}>
                                            <TransactionTable />
                                        </Col>
                                        <Col md={6}>
                                            <Card className="mb-4 mt-4">
                                                <Card.Body>
                                                    <Card.Title>Chi tiêu hằng tháng</Card.Title>
                                                    <div>
                                                        <ExpenseChart />
                                                    </div>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col md={6}>
                                            <SevenDaysChart />
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
