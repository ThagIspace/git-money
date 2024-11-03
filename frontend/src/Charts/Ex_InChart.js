import React from 'react';
import {
    PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { Card, Col, Row } from 'react-bootstrap';

// Utility function to format numbers with '.' separator and VNĐ currency
const formatCurrency = (value) => {
    return value.toLocaleString('vi-VN') + 'đ';
};

// Custom label for PieChart to render percentage inside the chart
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
    const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));

    return (
        <text
            x={x}
            y={y}
            fill="black"
            textAnchor={x > cx ? 'start' : 'end'}
            dominantBaseline="central"
        >
            {`${(percent * 100).toFixed(1)}%`}
        </text>
    );
};

const Ex_InChart = ({ totalIncome, totalExpense }) => {
    // Data for the PieChart
    const data = [
        { name: 'Thu nhập', value: totalIncome },
        { name: 'Chi tiêu', value: totalExpense }
    ];

    const COLORS = ['#0088FE', '#FF8042']; // Colors for Pie chart

    return (
        <Row>
            {/* Pie Chart */}
            <Col md={12}>
                <Card className="mb-4 mt-4">
                    <Card.Body>
                        <Card.Title>Thu nhập và Chi tiêu</Card.Title>
                        <ResponsiveContainer width="100%" height={400}>
                            <PieChart>
                                <Pie
                                    data={data}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    outerRadius={150}
                                    label={renderCustomizedLabel} // Show percentage inside the pie
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {data.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip formatter={formatCurrency} /> {/* Format the currency with 'VNĐ' and '.' */}
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    );
};

export default Ex_InChart;
