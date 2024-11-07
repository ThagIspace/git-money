import React, { useContext, useState } from 'react';
import { IncomeContext } from '../context/IncomeContext';
import { DropdownButton, Dropdown } from 'react-bootstrap';

import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    Modal,
    Button,
} from '@mui/material';
import { FaEllipsisV } from 'react-icons/fa';

const IncomeChart = () => {
    const { incomes } = useContext(IncomeContext);
    const [showModal, setShowModal] = useState(false);
    const [itemsToShow, setItemsToShow] = useState(5);

    const handleItemsToShowChange = (number) => {
        setItemsToShow(number);
        setShowModal(false);
    };

    return (
        <div className="mt-4" style={{ border: '1px solid #ccc', borderRadius: '20px', overflow: 'hidden' }}>
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
            <Modal open={showModal} onClose={() => setShowModal(false)}>
                <div style={{ padding: '20px', background: 'white', margin: 'auto', width: '300px', top: '20%', position: 'relative' }}>
                    <Typography variant="h6" gutterBottom>
                        CÁC THU NHẬP
                    </Typography>
                    <DropdownButton title="Số mục hiển thị:" variant="secondary">
                        {[1, 2, 3, 4, 5].map((number) => (
                            <Dropdown.Item key={number} onClick={() => handleItemsToShowChange(number)}>
                                {number}
                            </Dropdown.Item>
                        ))}
                    </DropdownButton>
                    <div className="mt-3 d-flex justify-content-end">
                        <Button variant="contained" color="secondary" onClick={() => setShowModal(false)} style={{ marginRight: '10px' }}>
                            HỦY
                        </Button>
                        <Button variant="contained" color="primary" onClick={() => setShowModal(false)}>
                            LƯU LẠI
                        </Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default IncomeChart;
