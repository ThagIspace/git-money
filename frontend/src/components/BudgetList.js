import React, { useContext, useEffect, useState } from 'react';
import { BudgetContext } from '../context/BudgetContext';
import { Card, Button, ProgressBar, Row, Col } from 'react-bootstrap';
import Swal from 'sweetalert2';
import Pagination from './Pagination';
import { TextField } from '@mui/material'; // Thêm TextField

const BudgetList = () => {
    const { budgets, deleteBudget, loading, fetchBudgets } = useContext(BudgetContext);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState(''); // Thêm state cho tìm kiếm
    const itemsPerPage = 3;

    useEffect(() => {
        fetchBudgets();
    }, []);

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Bạn có chắc chắn muốn xóa ngân sách này không?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Xóa',
            cancelButtonText: 'Hủy',
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
        }).then((result) => {
            if (result.isConfirmed) {
                deleteBudget(id);
                Swal.fire('Đã xóa!', 'Ngân sách đã được xóa thành công.', 'success');
            }
        });
    };

    if (loading) {
        return <div className="text-center my-5"><span>Đang tải...</span></div>;
    }

    // Logic lọc dữ liệu dựa trên từ khóa tìm kiếm
    const filteredBudgets = budgets.filter(
        (budget) =>
            budget.name.toLowerCase().includes(searchTerm.toLowerCase()) || // Lọc theo tên
            (budget.amount && budget.amount.toString().includes(searchTerm)) // Lọc theo số tiền
    );

    // Logic phân trang
    const totalItems = filteredBudgets.length;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentData = filteredBudgets.slice(startIndex, startIndex + itemsPerPage);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    return (
        <div className="container mt-5">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2 className="text-center">Danh sách Ngân Sách</h2>
                <TextField
                    label="Tìm theo tên và số tiền"
                    variant="outlined"
                    size="small"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <Row>
                {currentData.map((budget) => {
                    const spent = budget.spent || 0;
                    const amount = budget.amount || 0;
                    const remaining = amount - spent;
                    const progress = amount > 0 ? (spent / amount) * 100 : 0;

                    return (
                        <Col md={4} className="mb-4" key={budget._id}>
                            <Card className="h-100" style={{ borderColor: budget.color }}>
                                <Card.Body>
                                    <Card.Title className="d-flex justify-content-between align-items-center">
                                        <span>{budget.name}</span>
                                        <span>{amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })} Ngân Sách</span>
                                    </Card.Title>
                                    <ProgressBar now={progress} className="my-3" />
                                    <div className="d-flex justify-content-between">
                                        <small>{spent.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })} đã chi</small>
                                        <small>{remaining.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })} còn lại</small>
                                    </div>
                                    <Button variant="danger" className="mt-3 w-100" onClick={() => handleDelete(budget._id)}>
                                        Xóa
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    );
                })}
            </Row>
            {budgets.length === 0 && (
                <div className="text-center my-5">
                    <p>Không có dữ liệu</p>
                </div>
            )}

            {/* Sử dụng component Pagination */}
            <Pagination
                totalItems={totalItems}
                itemsPerPage={itemsPerPage}
                currentPage={currentPage}
                onPageChange={handlePageChange}
            />
        </div>
    );
};

export default BudgetList;
