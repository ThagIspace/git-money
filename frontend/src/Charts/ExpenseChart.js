import { Line } from 'react-chartjs-2';
import { useContext } from 'react';
import { ExpenseContext } from '../context/ExpenseContext';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    LineController,
    Tooltip,
    Legend,
} from 'chart.js';
import {
    TableContainer,
    Paper,
    Typography,
} from '@mui/material';
import { Card } from 'react-bootstrap';

// Register the required components for Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, LineController, Tooltip, Legend);

export const ExpenseChart = () => {
    const { expenses } = useContext(ExpenseContext);

    // Process expenses into monthly totals
    const monthlyTotals = {};
    expenses.forEach(expense => {
        const month = new Date(expense.date).toLocaleString('vi-VN', { month: 'short' });
        if (!monthlyTotals[month]) {
            monthlyTotals[month] = 0;
        }
        monthlyTotals[month] += expense.amount;
    });

    const labels = Object.keys(monthlyTotals);
    const dataPoints = Object.values(monthlyTotals);

    // Data for the chart
    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Chi tiêu',
                data: dataPoints,
                fill: false,
                backgroundColor: 'rgba(255, 99, 132, 0.6)',
                borderColor: 'rgba(255, 99, 132, 1)',
                tension: 0.4, // Smooth out the lines
            },
        ],
    };

    // Chart configuration options
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true,
                labels: {
                    color: 'black',
                    font: {
                        size: 14,
                    },
                },
            },
            tooltip: {
                mode: 'index',
                intersect: false,
            },
        },
        scales: {
            x: {
                ticks: {
                    color: 'black',
                },
                grid: {
                    display: false, // Hide grid lines for cleaner look
                },
            },
            y: {
                ticks: {
                    color: 'black',
                    maxTicksLimit: 5, // Limit the number of ticks on the y-axis
                },
                grid: {
                    color: '#e0e0e0',
                },
                beginAtZero: true,
            },
        },
    };

    return (
        <Card className='mb-4' style={{ overflow: 'hidden' }}>
            <TableContainer component={Paper} style={{ padding: '16px' }}>
                <Typography variant="h6" style={{ fontWeight: 'bold', marginBottom: '16px' }}>
                    Chi tiêu hằng tháng
                </Typography>
                <div style={{ height: '300px', maxWidth: '100%', overflowX: 'auto' }}>
                    <Line data={data} options={options} />
                </div>
            </TableContainer>
        </Card>
    );
};
