import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Card, Dropdown, DropdownButton, Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const generateDataForLast7Days = () => {
    const today = new Date();
    const data = [];

    for (let i = 0; i < 7; i++) {
        const date = new Date();
        date.setDate(today.getDate() - i);

        // Định dạng lại tên ngày
        const dayNames = ["CN", "Th 2", "Th 3", "Th 4", "Th 5", "Th 6", "Th 7"];
        const dayName = dayNames[date.getDay()];

        data.unshift({
            day: `${dayName}, ngày ${date.getDate()}`,
            income: Math.floor(Math.random() * 1000000),
            expense: Math.floor(Math.random() * 1000000),
        });
    }

    return data;
};

const SevenDaysChart = () => {
    const [showModal, setShowModal] = useState(false);
    const [filter, setFilter] = useState('both');
    const [data, setData] = useState(generateDataForLast7Days());

    useEffect(() => {
        setData(generateDataForLast7Days());
    }, []);

    const handleFilterChange = (filterOption) => {
        setFilter(filterOption);
        setShowModal(false);
    };

    const filteredData = data.map((item) => ({
        ...item,
        income: filter === 'expense' ? 0 : item.income,
        expense: filter === 'income' ? 0 : item.expense,
    }));

    return (
        <Card className="p-3">
            <div className="d-flex justify-content-between">
                <h5>7 ngày qua</h5>
                <div onClick={() => setShowModal(true)} style={{ cursor: 'pointer' }}>⋮</div>
            </div>
            <ResponsiveContainer width="100%" height={400}>
                <BarChart data={filteredData}>
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip formatter={(value) => `${value.toLocaleString('vi-VN')} đ`} />
                    <Legend />
                    {filter !== 'expense' && (
                        <Bar dataKey="income" fill="green" name="Thu nhập" />
                    )}
                    {filter !== 'income' && (
                        <Bar dataKey="expense" fill="red" name="Chi tiêu" />
                    )}
                </BarChart>
            </ResponsiveContainer>

            {/* Modal để chọn loại dữ liệu hiển thị */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>7 NGÀY QUA</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <DropdownButton title="Số mục hiển thị:" variant="secondary">
                        <Dropdown.Item onClick={() => handleFilterChange('income')}>
                            Thu nhập
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => handleFilterChange('expense')}>
                            Chi tiêu
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => handleFilterChange('both')}>
                            Cả hai
                        </Dropdown.Item>
                    </DropdownButton>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        HỦY
                    </Button>
                    <Button variant="primary" onClick={() => setShowModal(false)}>
                        LƯU LẠI
                    </Button>
                </Modal.Footer>
            </Modal>
        </Card>
    );
};

export default SevenDaysChart;
