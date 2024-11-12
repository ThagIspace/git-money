import React, { useState, useEffect, useContext } from 'react';
import { IncomeContext } from '../context/IncomeContext';
import { ExpenseContext } from '../context/ExpenseContext';
import { Row, Col } from 'react-bootstrap';
import Balance from '../charts/Balance';
import ThisMonth from '../charts/ThisMonth';
import LastMonth from '../charts/LastMonth';
import { ExpenseChart } from '../charts/ExpenseChart';
import TransactionTable from '../charts/TransactionTable';
import TransactionTable2 from '../charts/TransactionTable2';
import SevenDaysChart from '../charts/Sevendays';
import IncomeChart from '../charts/IncomeChart';
import Ex_InChart from '../charts/Ex_InChart';
import Nav from '../components/Nav';
import TopBar from '../components/Topbar';
import Sidebar from '../components/Sidebar';
import BudgetChart from '../charts/BudgetChart';
import '../assets/style/sidebar.css';
import '../assets/style/dashboard.css';

const DashboardP = () => {
    const [isSidebarVisible, setSidebarVisible] = useState(false);
    const { incomes } = useContext(IncomeContext);
    const { expenses } = useContext(ExpenseContext);

    useEffect(() => {
        // Logic fetching dữ liệu từ API nếu cần
    }, []);

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
                        {/* Hiển thị tổng quan tài chính */}
                        <Row>
                            <Balance balance={balance} totalIncome={totalIncome} totalExpense={totalExpense} />
                            <ThisMonth />
                            <LastMonth />
                        </Row>

                        {/* Gọi các thành phần biểu đồ và bảng */}
                        <Row>
                            <Col md={6} sm={12}>
                                <IncomeChart />
                            </Col>
                            <Col md={6} sm={12}>
                                <ExpenseChart />
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6} sm={12}>
                                <SevenDaysChart />
                            </Col>
                            <Col md={6} sm={12}>
                                <Ex_InChart totalIncome={totalIncome} totalExpense={totalExpense} />
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6} sm={12}>
                                <TransactionTable />
                            </Col>
                            <Col md={6} sm={12}>
                                <TransactionTable2 />
                            </Col>
                        </Row>
                        <Row>
                            <Col md={12}>
                                <BudgetChart />
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardP;
