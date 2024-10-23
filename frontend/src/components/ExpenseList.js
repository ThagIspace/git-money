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

const ViewExpenses = () => {
    const { expenses, deleteExpense, loading } = useContext(ExpenseContext); // Lấy danh sách chi phí từ context

    const handleDelete = (id) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa khoản chi tiêu này không?')) {
            deleteExpense(id);
        }
    };

    if (loading) {
        return <CircularProgress />; // Hiển thị loading nếu đang tải dữ liệu
    }

    return (
        <div>
            <Typography variant="h4" gutterBottom>
                Danh Sách Chi Tiêu
            </Typography>
            <TableContainer component={Paper}>
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
                        {expenses.length > 0 ? ( // Kiểm tra xem có dữ liệu hay không
                            expenses.map((expense) => (
                                <TableRow key={expense._id}>
                                    <TableCell>{expense.title}</TableCell>
                                    <TableCell>${expense.amount.toFixed(2)}</TableCell>
                                    <TableCell>{expense.category}</TableCell>
                                    <TableCell>{expense.description}</TableCell>
                                    <TableCell>{new Date(expense.date).toLocaleDateString()}</TableCell>
                                    <TableCell>
                                        <IconButton onClick={() => handleDelete(expense._id)} color="error">
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
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

export default ViewExpenses;
