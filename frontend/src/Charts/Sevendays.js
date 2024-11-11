import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Card } from 'react-bootstrap';
import SelectableModal from '../components/SelectableModal'; // Import SelectableModal
import { FaEllipsisV } from 'react-icons/fa';


const generateDataForLast7Days = () => {
    const today = new Date();
    const data = [];

    for (let i = 0; i < 7; i++) {
        const date = new Date();
        date.setDate(today.getDate() - i);

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

    // Các tùy chọn cho modal
    const options = [
        { label: 'Thu nhập', onSelect: () => handleFilterChange('income') },
        { label: 'Chi tiêu', onSelect: () => handleFilterChange('expense') },
        { label: 'Cả hai', onSelect: () => handleFilterChange('both') },
    ];

    return (
        <Card className="p-3">
            <div className="d-flex justify-content-between">
                <h5>7 ngày qua</h5>
                <FaEllipsisV onClick={() => setShowModal(true)} style={{ cursor: 'pointer' }} />
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

            {/* Sử dụng SelectableModal với các tùy chọn */}
            <SelectableModal
                show={showModal}
                onClose={() => setShowModal(false)}
                title="7 NGÀY QUA"
                options={options} // Truyền các tùy chọn
            />
        </Card>
    );
};

export default SevenDaysChart;
