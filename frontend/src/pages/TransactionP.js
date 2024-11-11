import React, { useContext, useState, useEffect } from "react";
import { IncomeContext } from "../context/IncomeContext";
import { ExpenseContext } from "../context/ExpenseContext";
import { BudgetContext } from "../context/BudgetContext";
import { Modal } from "react-bootstrap";
import IncomeForm from "../components/IncomeForm";
import ExpenseForm from "../components/ExpenseForm";
import TransactionList from "../components/TransactionList";
import Sidebar from "../components/Sidebar";
import TopBar from "../components/Topbar";
import Nav from "../components/Nav";
import "../assets/style/trans.css";

const TransactionP = () => {
    const {
        incomes,
        deleteIncome,
        setEditingIncome,
        editingIncome,
        updateIncome,
    } = useContext(IncomeContext);
    const {
        expenses,
        deleteExpense,
        setEditingExpense,
        editingExpense,
        updateExpense,
    } = useContext(ExpenseContext);
    const { budgets } = useContext(BudgetContext);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [monthlyTransactions, setMonthlyTransactions] = useState([]);
    const [expandedItemId, setExpandedItemId] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const [isModalVisible, setModalVisible] = useState(false);
    const [isSidebarVisible, setSidebarVisible] = useState(false);

    useEffect(() => {
        if (editingIncome || editingExpense) {
            setModalVisible(true);
        }
    }, [editingIncome, editingExpense]);

    useEffect(() => {
        const month = currentDate.getMonth();
        const year = currentDate.getFullYear();

        const filteredIncomes = incomes.filter(
            (inc) => new Date(inc.date).getMonth() === month && new Date(inc.date).getFullYear() === year
        );
        const filteredExpenses = expenses.filter(
            (exp) => new Date(exp.date).getMonth() === month && new Date(exp.date).getFullYear() === year
        );

        setMonthlyTransactions([...filteredExpenses, ...filteredIncomes]);
    }, [currentDate, incomes, expenses]);

    const handleMonthChange = (increment) => {
        setCurrentDate((prevDate) => new Date(prevDate.getFullYear(), prevDate.getMonth() + increment));
    };

    const toggleSidebar = () => setSidebarVisible((prev) => !prev);

    const getDefaultDate = () => new Date().toISOString().split('T')[0];

    const renderFormModal = () => {
        if (editingIncome) {
            return (
                <IncomeForm
                    formData={{
                        ...editingIncome,
                        date: editingIncome.date || getDefaultDate(),
                    }}
                    handleInputChange={(field, value) => setEditingIncome((prev) => ({ ...prev, [field]: value }))}
                    handleSubmit={(e) => {
                        if (e) e.preventDefault();
                        updateIncome(editingIncome);
                        setEditingIncome(null);
                        setModalVisible(false);
                    }}
                    onCancel={() => {
                        setEditingIncome(null);
                        setModalVisible(false);
                    }}
                />
            );
        }
        if (editingExpense) {
            return (
                <ExpenseForm
                    formData={{
                        ...editingExpense,
                        date: editingExpense.date || getDefaultDate(),
                    }}
                    handleInputChange={(field, value) => setEditingExpense((prev) => ({ ...prev, [field]: value }))}
                    handleSubmit={(e) => {
                        if (e) e.preventDefault();
                        updateExpense(editingExpense);
                        setEditingExpense(null);
                        setModalVisible(false);
                    }}
                    budgets={budgets}
                    onCancel={() => {
                        setEditingExpense(null);
                        setModalVisible(false);
                    }}
                />
            );
        }
        return null;
    };

    return (
        <div className={`d-flex ${isSidebarVisible ? "sidebar-open" : ""}`} id="wrapper">
            <Sidebar />
            <div id="page-content-wrapper">
                <TopBar onToggleSidebar={toggleSidebar} />
                <Nav toggleSidebar={toggleSidebar} className="d-lg-none" />
                <div className="container-fluid mt-5">
                    <div className="transaction-container">
                        <div className="transaction-header">
                            <button className="navigation-button" onClick={() => handleMonthChange(-1)}>&lt;</button>
                            <h4 className="transaction-title">Tháng {currentDate.getMonth() + 1} năm {currentDate.getFullYear()}</h4>
                            <button className="navigation-button" onClick={() => handleMonthChange(1)}>&gt;</button>
                        </div>

                        <TransactionList
                            monthlyTransactions={monthlyTransactions}
                            calculateNetTotal={() => {
                                const incomeSum = monthlyTransactions
                                    .filter((transaction) => transaction.type === "income")
                                    .reduce((sum, inc) => sum + inc.amount, 0);
                                const expenseSum = monthlyTransactions
                                    .filter((transaction) => transaction.type === "expense")
                                    .reduce((sum, exp) => sum + exp.amount, 0);
                                return incomeSum - expenseSum;
                            }}
                            handleExpand={(event, id) => {
                                setAnchorEl(event.currentTarget);
                                setExpandedItemId(id);
                            }}
                            handleClose={() => {
                                setAnchorEl(null);
                                setExpandedItemId(null);
                            }}
                            handleDeleteItem={(id, isIncome) => {
                                if (isIncome) {
                                    deleteIncome(id);
                                } else {
                                    deleteExpense(id);
                                }
                            }}
                            handleEditItem={(item, isIncome) => {
                                if (isIncome) {
                                    setEditingIncome(item);
                                } else {
                                    setEditingExpense(item);
                                }
                            }}
                            anchorEl={anchorEl}
                            expandedItemId={expandedItemId}
                        />

                        <Modal show={isModalVisible} onHide={() => setModalVisible(false)}>
                            <Modal.Header closeButton>
                                <Modal.Title>
                                    {editingIncome ? "Chỉnh Sửa Thu Nhập" : "Chỉnh Sửa Chi Phí"}
                                </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                {renderFormModal()}
                            </Modal.Body>
                        </Modal>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TransactionP;
