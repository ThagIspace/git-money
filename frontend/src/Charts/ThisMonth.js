import React, { useContext, useState, useEffect } from 'react';
import { Card, Col } from 'react-bootstrap';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { IncomeContext } from '../context/IncomeContext';
import { ExpenseContext } from '../context/ExpenseContext';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';

// Utility function to format currency in VND
const formatCurrency = (value) => {
    return value.toLocaleString('vi-VN') + 'đ';
};

// Custom label for PieChart to render percentage inside the chart
// Custom label for PieChart to render percentage inside the chart
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.65; // Giảm radius để căn giữa phần trăm
    const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
    const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));

    return (
        <text
            x={x}
            y={y}
            fill="black"
            textAnchor="middle"
            dominantBaseline="central"
            fontSize="16"
        >
            {`${(percent * 100).toFixed(1)}%`}
        </text>
    );
};


const ThisMonth = () => {
    const { incomes } = useContext(IncomeContext);
    const { expenses } = useContext(ExpenseContext);
    const [currentMonthIncomes, setCurrentMonthIncomes] = useState([]);
    const [currentMonthExpenses, setCurrentMonthExpenses] = useState([]);

    useEffect(() => {
        const currentDate = new Date();
        const month = currentDate.getMonth();
        const year = currentDate.getFullYear();

        setCurrentMonthIncomes(incomes.filter(
            (income) => new Date(income.date).getMonth() === month && new Date(income.date).getFullYear() === year
        ));
        setCurrentMonthExpenses(expenses.filter(
            (expense) => new Date(expense.date).getMonth() === month && new Date(expense.date).getFullYear() === year
        ));
    }, [incomes, expenses]);

    const totalIncome = currentMonthIncomes.reduce((acc, income) => acc + income.amount, 0);
    const totalExpense = currentMonthExpenses.reduce((acc, expense) => acc + expense.amount, 0);

    // Data for the PieChart
    const data = [
        { name: 'Chi tiêu', value: totalExpense },
        { name: 'Thu nhập', value: totalIncome }
    ];

    const COLORS = ['red', 'green'];

    return (
        <Col md={4} sm={12}>
            <Card className="mb-4 mt-4">
                <Card.Body>
                    <div className="d-flex justify-content-between">
                        <div style={{ width: '50%' }}>
                            <ResponsiveContainer width="100%" height={180}>
                                <PieChart>
                                    <Legend
                                        layout="horizontal"
                                        verticalAlign="top"
                                        align="center"
                                        iconType="square"
                                    />
                                    <Pie
                                        data={data}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={35}
                                        outerRadius={60}
                                        labelLine={false}
                                        label={renderCustomizedLabel}
                                        fill="#8884d8"
                                        dataKey="value"
                                    >
                                        {data.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip formatter={formatCurrency} />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                        <div style={{ width: '50%', textAlign: 'right' }}>
                            <h5>Tháng này</h5>
                            <hr style={{ width: '50%', marginLeft: 'auto' }} />
                            <div className="d-flex flex-column align-items-end mt-2">
                                <div className="d-flex align-items-center">
                                    <FaArrowUp style={{ color: 'green', fontSize: '1.2em' }} />
                                    <span className="ml-2" style={{ fontWeight: 'bold', color: 'green' }}>
                                        {totalIncome.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                                    </span>
                                </div>
                                <div className="d-flex align-items-center mt-2">
                                    <FaArrowDown style={{ color: 'red', fontSize: '1.2em' }} />
                                    <span className="ml-2" style={{ fontWeight: 'bold', color: 'red' }}>
                                        {totalExpense.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                                    </span>
                                </div>
                            </div>
                            <hr style={{ width: '50%', marginLeft: 'auto' }} />
                            <div>
                                <strong style={{ color: (totalIncome - totalExpense) >= 0 ? 'green' : 'red' }}>
                                    {(totalIncome - totalExpense).toLocaleString('vi-VN', {
                                        style: 'currency',
                                        currency: 'VND',
                                    })}
                                </strong>
                            </div>

                        </div>
                    </div>
                </Card.Body>
            </Card>
        </Col>
    );
};

export default ThisMonth;
