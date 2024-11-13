import React, { useContext, useState } from 'react';
import { IncomeContext } from '../context/IncomeContext';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Paper,
    Typography,
} from '@mui/material';
import { FaEllipsisV } from 'react-icons/fa';
import SelectableModal from '../components/SelectableModal'; // Import SelectableModal
import { Card } from 'react-bootstrap';

const IncomeChart = () => {
    const { incomes } = useContext(IncomeContext);
    const [showModal, setShowModal] = useState(false);
    const [itemsToShow, setItemsToShow] = useState(5);

    const handleItemsToShowChange = (number) => {
        setItemsToShow(number);
        setShowModal(false);
    };

    // Các tùy chọn cho modal
    const options = [
        { label: '1 mục', onSelect: () => handleItemsToShowChange(1) },
        { label: '2 mục', onSelect: () => handleItemsToShowChange(2) },
        { label: '3 mục', onSelect: () => handleItemsToShowChange(3) },
        { label: '4 mục', onSelect: () => handleItemsToShowChange(4) },
    ];

    return (
        <Card className='mt-4 mb-4' style={{ overflow: 'hidden' }}>
            <TableContainer component={Paper} className="p-3">
                <div className="d-flex justify-content-between align-items-center mb-2">
                    <Typography style={{ fontWeight: 'bold', fontSize: '1rem' }} gutterBottom>
                        Các thu nhập
                    </Typography>
                    <FaEllipsisV onClick={() => setShowModal(true)} style={{ cursor: 'pointer' }} />
                </div>
                <Table aria-label="incomes table">
                    <TableBody>
                        {incomes.slice(0, itemsToShow).map((income, index, array) => (
                            <TableRow key={income._id || index}>
                                <TableCell style={index === array.length - 1 ? { borderBottom: 'none' } : {}}>{income.title}</TableCell>
                                <TableCell
                                    align="right"
                                    style={{ color: 'green', ...(index === array.length - 1 ? { borderBottom: 'none' } : {}) }}
                                >
                                    {income.amount ? `${income.amount.toLocaleString('vi-VN')} đ` : 'N/A'}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Sử dụng SelectableModal */}
            <SelectableModal
                show={showModal}
                onClose={() => setShowModal(false)}
                title="CÁC THU NHẬP"
                options={options} // Truyền các tùy chọn
            />
        </Card>
    );
};

export default IncomeChart;
