import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { Card, Col, Row } from 'react-bootstrap';

const Charts = ({ totalIncome, totalExpense, barData }) => {
    // Dữ liệu cho biểu đồ tròn
    const data = [
        { name: 'Income', value: totalIncome },
        { name: 'Expenses', value: totalExpense }
    ];

    const COLORS = ['#0088FE', '#FF8042']; // Màu sắc cho biểu đồ

    return (
        <Row>
            {/* Biểu đồ tròn */}
            <Col md={6}>
                <Card className="mb-4 mt-4">
                    <Card.Body>
                        <Card.Title>Income vs Expenses</Card.Title>
                        <PieChart width={400} height={400}>
                            <Pie
                                data={data}
                                cx={200}
                                cy={200}
                                labelLine={false}
                                outerRadius={150}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </Card.Body>
                </Card>
            </Col>

            {/* Biểu đồ cột */}
            <Col md={6}>
                <Card className="mb-4 mt-4">
                    <Card.Body>
                        <Card.Title>Monthly Income vs Expenses</Card.Title>
                        <ResponsiveContainer width="100%" height={400}>
                            <BarChart data={barData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="income" fill="#0088FE" />
                                <Bar dataKey="expense" fill="#FF8042" />
                            </BarChart>
                        </ResponsiveContainer>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    );
};

export default Charts;
