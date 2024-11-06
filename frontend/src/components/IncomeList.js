// components/IncomeList.js
import React, { useContext } from 'react';
import { IncomeContext } from '../context/IncomeContext';
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
import Swal from 'sweetalert2';

const IncomeList = () => {
    const { incomes, deleteIncome, loading } = useContext(IncomeContext);

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Bạn có chắc chắn muốn xóa khoản thu nhập này không?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Xóa',
            cancelButtonText: 'Hủy',
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
        }).then((result) => {
            if (result.isConfirmed) {
                deleteIncome(id);
                Swal.fire(
                    'Đã xóa!',
                    'Khoản thu nhập đã được xóa thành công.',
                    'success'
                );
            }
        });
    };

    if (loading) {
        return <CircularProgress />;
    }

    return (
        <div className="container mt-5">
            <Typography variant="h4" gutterBottom>
                Danh Sách Thu Nhập
            </Typography>
            <TableContainer component={Paper} className="mt-4">
                <Table aria-label="incomes table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Tiêu Đề</TableCell>
                            <TableCell>Số Tiền</TableCell>
                            <TableCell>Mô Tả</TableCell>
                            <TableCell>Ngày</TableCell>
                            <TableCell>Hành Động</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {incomes.map((income) => (
                            <TableRow key={income._id}>
                                <TableCell>{income.title}</TableCell>
                                <TableCell>
                                    {income.amount ? `${income.amount.toLocaleString('vi-VN')} đ` : 'N/A'}
                                </TableCell>
                                <TableCell>{income.description}</TableCell>
                                <TableCell>{new Date(income.date).toLocaleDateString()}</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => handleDelete(income._id)} color="error">
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                        {incomes.length === 0 && (
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

export default IncomeList;
