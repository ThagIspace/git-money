// components/BudgetList.js
import React, { useContext } from 'react';
import { BudgetContext } from '../context/BudgetContext';
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

const BudgetList = () => {
    const { budgets, deleteBudget, loading } = useContext(BudgetContext);

    const handleDelete = (id) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa ngân sách này không?')) {
            deleteBudget(id);
        }
    };

    if (loading) {
        return <CircularProgress />;
    }

    return (
        <div className="container mt-5">
            <Typography variant="h4" gutterBottom>
                Danh Sách Ngân Sách
            </Typography>
            <TableContainer component={Paper} className="mt-4">
                <Table aria-label="budget table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Tên Ngân Sách</TableCell>
                            <TableCell>Số Tiền</TableCell>
                            <TableCell>Hành Động</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {budgets.map((budget) => (
                            <TableRow key={budget._id}>
                                <TableCell>{budget.name}</TableCell>
                                <TableCell>
                                    {budget.amount ? `${budget.amount.toLocaleString('vi-VN')} đ` : 'N/A'}
                                </TableCell>
                                <TableCell>
                                    <IconButton onClick={() => handleDelete(budget._id)} color="error">
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                        {budgets.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={3} align="center">
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

export default BudgetList;
