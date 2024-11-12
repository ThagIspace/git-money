import React, { useContext, useState } from 'react';
import { ExpenseContext } from '../context/ExpenseContext';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Typography,
    CircularProgress,
    TextField
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Pagination from './Pagination';
import Swal from 'sweetalert2';
import '../assets/style/list.css'

const ExpenseList = () => {
    const { expenses, deleteExpense, setEditingExpense, loading } = useContext(ExpenseContext);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState(''); // State for search input
    const itemsPerPage = 5;

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Bạn có chắc chắn muốn xóa khoản chi tiêu này không?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Xóa',
            cancelButtonText: 'Hủy',
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
        }).then((result) => {
            if (result.isConfirmed) {
                deleteExpense(id);
                Swal.fire('Đã xóa!', 'Khoản chi tiêu đã được xóa thành công.', 'success');
            }
        });
    };

    const handleEdit = (expense) => {
        setEditingExpense(expense);
    };

    if (loading) {
        return (
            <div className="d-flex justify-content-center mt-5">
                <CircularProgress />
            </div>
        );
    }

    // Filter logic based on search term
    const filteredExpenses = expenses.filter(
        (expense) =>
            expense.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (expense.amount && expense.amount.toString().includes(searchTerm)) ||
            (expense.category && expense.category.toLowerCase().includes(searchTerm.toLowerCase()))
    );


    // Pagination logic
    const totalItems = filteredExpenses.length;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentData = filteredExpenses.slice(startIndex, startIndex + itemsPerPage);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    return (
        <div className="container mt-5">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <Typography variant="h4" gutterBottom>
                    Danh Sách Chi Tiêu
                </Typography>
                <TextField
                    label="Tìm theo tên, danh mục, số tiền"
                    variant="outlined"
                    size="small"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <TableContainer component={Paper} className="mt-4 abc-list-container">
                <Table className="abc-list">
                    <TableHead>
                        <TableRow>
                            <TableCell>Tiêu Đề</TableCell>
                            <TableCell>Số Tiền</TableCell>
                            <TableCell>Danh Mục</TableCell>
                            <TableCell>Mô Tả</TableCell>
                            <TableCell>Ngày</TableCell>
                            <TableCell>Hành Động</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {currentData.map((expense) => (
                            <TableRow key={expense._id || Math.random().toString(36).substr(2, 9)}>
                                <TableCell data-label="Tiêu Đề">{expense.title}</TableCell>
                                <TableCell data-label="Số Tiền">{expense.amount ? `${expense.amount.toLocaleString('vi-VN')} đ` : 'N/A'}</TableCell>
                                <TableCell data-label="Danh Mục">{expense.category}</TableCell>
                                <TableCell data-label="Mô Tả">{expense.description}</TableCell>
                                <TableCell data-label="Ngày">{new Date(expense.date).toLocaleDateString()}</TableCell>
                                <TableCell data-label="Hành Động">
                                    <IconButton onClick={() => handleEdit(expense)} color="primary">
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton onClick={() => handleDelete(expense._id)} color="error">
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                        {currentData.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={6} align="center">
                                    Không có dữ liệu
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Pagination Controls */}
            <Pagination
                totalItems={totalItems}
                itemsPerPage={itemsPerPage}
                currentPage={currentPage}
                onPageChange={handlePageChange}
            />
        </div>
    );
};

export default ExpenseList;
