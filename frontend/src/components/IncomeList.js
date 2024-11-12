import React, { useContext, useState } from 'react';
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
    TextField
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Swal from 'sweetalert2';
import Pagination from './Pagination';
import '../assets/style/list.css';

const IncomeList = () => {
    const { incomes, deleteIncome, setEditingIncome, loading } = useContext(IncomeContext);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState(''); // State for search input
    const itemsPerPage = 5;

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
                Swal.fire('Đã xóa!', 'Khoản thu nhập đã được xóa thành công.', 'success');
            }
        });
    };

    if (loading) {
        return (
            <div className="d-flex justify-content-center mt-5">
                <CircularProgress />
            </div>
        );
    }

    // Filter logic based on search term
    const filteredIncomes = incomes.filter(
        (income) =>
            income.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (income.amount && income.amount.toString().includes(searchTerm))
    );

    // Pagination logic
    const totalItems = filteredIncomes.length;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentData = filteredIncomes.slice(startIndex, startIndex + itemsPerPage);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    return (
        <div className="container mt-5">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <Typography variant="h4" gutterBottom>
                    Danh Sách Thu Nhập
                </Typography>
                <TextField
                    label="Tìm theo tên, số tiền"
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
                            <TableCell>Mô Tả</TableCell>
                            <TableCell>Ngày</TableCell>
                            <TableCell>Hành Động</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {currentData.map((income) => (
                            <TableRow key={income._id || income.id || Math.random().toString(36).substr(2, 9)}>
                                <TableCell data-label="Tiêu Đề">{income.title}</TableCell>
                                <TableCell data-label="Số Tiền">{income.amount ? `${income.amount.toLocaleString('vi-VN')} đ` : 'N/A'}</TableCell>
                                <TableCell data-label="Mô Tả">{income.description}</TableCell>
                                <TableCell data-label="Ngày">{new Date(income.date).toLocaleDateString()}</TableCell>
                                <TableCell data-label="Hành Động">
                                    <IconButton onClick={() => setEditingIncome(income)} color="primary">
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton onClick={() => handleDelete(income._id)} color="error">
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                        {currentData.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={5} align="center">
                                    Không có dữ liệu
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Pagination Component */}
            <Pagination
                totalItems={totalItems}
                itemsPerPage={itemsPerPage}
                currentPage={currentPage}
                onPageChange={handlePageChange}
            />
        </div>
    );
};

export default IncomeList;
