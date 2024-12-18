import React, { useState, useContext, useEffect } from 'react';
import { ExpenseContext } from '../context/ExpenseContext';
import { BudgetContext } from '../context/BudgetContext';
import { Button, Row, Col, Modal } from 'react-bootstrap';
import ExpenseForm from '../components/ExpenseForm'; // Import ExpenseForm
import ExpenseList from '../components/ExpenseList';
import TopBar from '../components/Topbar';
import Nav from '../components/Nav';
import Sidebar from '../components/Sidebar';

const AddExpenseP = () => {
    const { addExpense, updateExpense, editingExpense, setEditingExpense } = useContext(ExpenseContext);
    const { budgets, updateBudgetSpent } = useContext(BudgetContext);
    const [isModalVisible, setModalVisible] = useState(false);
    const [isSidebarVisible, setSidebarVisible] = useState(false);

    const [formData, setFormData] = useState({
        title: '',
        amount: '',
        category: '',
        description: '',
        date: new Date().toISOString().split('T')[0],
    });

    useEffect(() => {
        if (editingExpense) {
            setFormData({
                title: editingExpense.title || '',
                amount: editingExpense.amount ? editingExpense.amount.toString() : '',
                category: editingExpense.category || '',
                description: editingExpense.description || '',
                date: editingExpense.date ? new Date(editingExpense.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
            });
            setModalVisible(true);
        }
    }, [editingExpense]);

    const toggleSidebar = () => setSidebarVisible(!isSidebarVisible);

    const handleInputChange = (field, value) => {
        if (field === 'amount') {
            value = value.replace(/\./g, ''); // Xóa dấu chấm để tránh lỗi nhập số
        }
        setFormData({ ...formData, [field]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const expenseAmount = Number(formData.amount.replace(/\./g, ''));

        if (editingExpense) {
            const oldCategory = editingExpense.category;
            const oldAmount = editingExpense.amount;

            updateExpense({ ...formData, amount: expenseAmount, _id: editingExpense._id });

            if (oldCategory !== formData.category) {
                // Cập nhật ngân sách cho thay đổi danh mục
                updateBudgetSpent(oldCategory, -oldAmount);
                updateBudgetSpent(formData.category, expenseAmount);
            } else if (oldAmount !== expenseAmount) {
                // Cập nhật ngân sách cho thay đổi số tiền
                updateBudgetSpent(formData.category, expenseAmount - oldAmount);
            }

            setEditingExpense(null);
        } else {
            addExpense({ ...formData, amount: expenseAmount });
            updateBudgetSpent(formData.category, expenseAmount);
        }

        resetForm();
        setModalVisible(false);
    };

    const resetForm = () => {
        setFormData({
            title: '',
            amount: '',
            category: '',
            description: '',
            date: new Date().toISOString().split('T')[0],
        });
    };

    return (
        <div className='mt-5'>
            <div className={`d-flex ${isSidebarVisible ? 'sidebar-open' : ''}`} id="wrapper">
                <Sidebar />
                <div id="page-content-wrapper">
                    <TopBar onToggleSidebar={toggleSidebar} />
                    <Nav toggleSidebar={toggleSidebar} className="d-lg-none" />
                    <div className="container-fluid">
                        <Row className="justify-content-center mt-5">
                            <Col md={6}>
                                <div className="text-center">
                                    <Button variant="primary" onClick={() => setModalVisible(true)}>Thêm Chi Phí</Button>
                                </div>
                                <Modal show={isModalVisible} onHide={() => setModalVisible(false)}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>{editingExpense ? 'Chỉnh Sửa Chi Phí' : 'Thêm Chi Phí'}</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <ExpenseForm
                                            formData={formData}
                                            handleInputChange={handleInputChange}
                                            handleSubmit={handleSubmit}
                                            budgets={budgets}
                                            onCancel={() => setModalVisible(false)}
                                        />
                                    </Modal.Body>
                                </Modal>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <ExpenseList />
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddExpenseP;
