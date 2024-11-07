// DashboardP.js
import React, { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { IncomeContext } from '../context/IncomeContext';
import { ExpenseContext } from '../context/ExpenseContext';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { ExpenseChart } from '../charts/ExpenseChart';
import TransactionTable from '../charts/TransactionTable';
import TransactionTable2 from '../charts/TransactionTable2';
import SevenDaysChart from '../charts/Sevendays';
import IncomeChart from '../charts/IncomeChart';
import Ex_InChart from '../charts/Ex_InChart';
import Nav from '../components/Nav';
import TopBar from '../components/Topbar';
import Sidebar from '../components/Sidebar'; // Import Sidebar
import '../assets/style/sidebar.css';
import axios from 'axios';

const DashboardP = () => {
    const [isSidebarVisible, setSidebarVisible] = useState(false);
    const { incomes, setIncomes } = useContext(IncomeContext);
    const { expenses, setExpenses } = useContext(ExpenseContext);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [incomeResponse, expenseResponse] = await Promise.all([
                    axios.get('http://localhost:5000/api/v1/get-incomes'),
                    axios.get('http://localhost:5000/api/v1/get-expenses')
                ]);
                setIncomes(incomeResponse.data);
                setExpenses(expenseResponse.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [setIncomes, setExpenses]);

    const totalIncome = incomes.reduce((acc, income) => acc + income.amount, 0);
    const totalExpense = expenses.reduce((acc, expense) => acc + expense.amount, 0);
    const balance = totalIncome - totalExpense;

    const toggleSidebar = () => setSidebarVisible(!isSidebarVisible);

    return (
        <div className="mt-4">
            <div className={`d-flex ${isSidebarVisible ? 'sidebar-open' : ''}`} id="wrapper">
                <Sidebar />
                <div id="page-content-wrapper">
                    <TopBar onToggleSidebar={toggleSidebar} />
                    <Nav toggleSidebar={toggleSidebar} className="d-lg-none" />

                    <div className="container-fluid">
                        <Row>
                            {[{ title: 'Số Dư', value: balance }, { title: 'Tổng Thu Nhập', value: totalIncome }, { title: 'Tổng Chi Tiêu', value: totalExpense }].map((item, index) => (
                                <Col key={index} md={4}>
                                    <Card className="mb-4 mt-4">
                                        <Card.Body>
                                            <Card.Title>{item.title}</Card.Title>
                                            <Card.Text>
                                                {item.value.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>

                        <Row>
                            <Col md={6}>
                                <IncomeChart />
                            </Col>
                            <Col md={6}>
                                <Ex_InChart totalIncome={totalIncome} totalExpense={totalExpense} />
                            </Col>
                        </Row>

                        <Row>
                            <Col md={6} >
                                <TransactionTable />
                            </Col>
                            <Col md={6}>
                                <Card className="mb-4 mt-4">
                                    <Card.Body>
                                        <Card.Title>Chi tiêu hằng tháng</Card.Title>
                                        <ExpenseChart />
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
    );
};

export default DashboardP;
