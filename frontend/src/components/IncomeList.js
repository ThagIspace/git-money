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

const IncomeList = () => {
    const { incomes, deleteIncome, loading } = useContext(IncomeContext);

    const handleDelete = (id) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa khoản thu nhập này không?')) {
            deleteIncome(id);
        }
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
