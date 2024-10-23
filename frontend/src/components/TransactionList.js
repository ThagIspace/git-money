import React, { useContext } from 'react';
import { TransactionContext } from '../context/TransactionContext';
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

const TransactionList = () => {
    const { transactions, deleteTransaction, loading } = useContext(TransactionContext); // Lấy danh sách giao dịch từ context

    const handleDelete = (id) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa giao dịch này không?')) {
            deleteTransaction(id); // Gọi hàm để xóa giao dịch
        }
    };

    if (loading) {
        return <CircularProgress />; // Hiển thị loading nếu đang tải dữ liệu
    }

    return (
        <div className="container mt-5">
            <Typography variant="h4" gutterBottom>
                Danh Sách Giao Dịch
            </Typography>
            <TableContainer component={Paper} className="mt-4">
                <Table aria-label="transactions table">
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
                        {transactions.map((trans) => (
                            <TableRow key={trans._id}>
                                <TableCell>{trans.title}</TableCell>
                                <TableCell>
                                    {trans.amount ? `${trans.amount.toLocaleString('vi-VN')} VNĐ` : 'N/A'}
                                </TableCell>
                                <TableCell>{trans.category}</TableCell>
                                <TableCell>{trans.description}</TableCell>
                                <TableCell>{new Date(trans.date).toLocaleDateString()}</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => handleDelete(trans._id)} color="error">
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                        {transactions.length === 0 && (
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

export default TransactionList;
