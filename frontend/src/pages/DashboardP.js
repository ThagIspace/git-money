import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { IncomeContext } from '../context/IncomeContext';
import { ExpenseContext } from '../context/ExpenseContext';
import { Container, Row, Col, Card } from 'react-bootstrap';
import Sidebar from '../components/Sidebar';
import TopBar from '../components/Topbar';
import { BalanceChart } from '../Charts/BalanceChart';
import TransactionTable from '../components/TransactionTable';
import TransactionTable2 from '../components/TransactionTable2';
import Charts from '../Charts/Charts';
import '../assets/style/nav.css';

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

                    {/* Gọi biểu đồ từ Charts */}
                    <Charts totalIncome={totalIncome} totalExpense={totalExpense} barData={barData} />

                    <Row>
                        <Col md={12}>
                            <Card className="mb-4 mt-4">
                                <Card.Body>
                                    <Card.Title>Số Dư Theo Thời Gian</Card.Title>
                                    <div style={{ height: '400px' }}>
                                        <BalanceChart />
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>

                    {/* Thêm 2 bảng giao dịch nằm kế bên nhau */}
                    <Row>
                        <Col md={6}>
                            <TransactionTable />
                        </Col>
                        <Col md={6}>
                            <TransactionTable2 />
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
};

export default DashboardP;
