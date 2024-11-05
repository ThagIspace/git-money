// components/ExpenseList.js
import React, { useContext } from 'react';
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
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const ExpenseList = () => {
    const { expenses, deleteExpense, loading } = useContext(ExpenseContext);

    const handleDelete = (id) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa khoản chi tiêu này không?')) {
            deleteExpense(id); // Gọi hàm deleteExpense để cập nhật lại ngân sách sau khi xóa
        }
    };

    if (loading) {
        return <CircularProgress />;
    }

    return (
        <div className="container mt-5">
            <Typography variant="h4" gutterBottom>
                Danh Sách Chi Tiêu
            </Typography>
            <TableContainer component={Paper} className="mt-4">
                <Table aria-label="expenses table">
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
                        {expenses.map((expense) => (
                            <TableRow key={expense._id}>
                                <TableCell>{expense.title}</TableCell>
                                <TableCell>
                                    {expense.amount ? `${expense.amount.toLocaleString('vi-VN')} đ` : 'N/A'}
                                </TableCell>
                                <TableCell>{expense.category}</TableCell>
                                <TableCell>{expense.description}</TableCell>
                                <TableCell>{new Date(expense.date).toLocaleDateString()}</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => handleDelete(expense._id)} color="error">
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                        {expenses.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={6} align="center">
                                    Không có dữ liệu
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default ExpenseList;
