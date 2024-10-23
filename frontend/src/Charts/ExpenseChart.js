import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    LineController,
    Tooltip,
    Legend
} from 'chart.js';
import { useContext } from 'react';
import { ExpenseContext } from '../context/ExpenseContext'; // Assuming the context is available

// Register the required components for Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, LineController, Tooltip, Legend);

export const ExpenseChart = () => {
    const { expenses } = useContext(ExpenseContext); // Get the expense data from context

    // Process expenses into monthly totals
    const monthlyTotals = {};
    expenses.forEach(expense => {
        const month = new Date(expense.date).toLocaleString('vi-VN', { month: 'short' });
        if (!monthlyTotals[month]) {
            monthlyTotals[month] = 0;
        }
        monthlyTotals[month] += expense.amount;
    });

    const labels = Object.keys(monthlyTotals); // Labels for each month
    const dataPoints = Object.values(monthlyTotals); // Expense amounts for each month

    // Data for the chart
    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Chi tiêu hằng tháng',
                data: dataPoints,
                fill: false,
                backgroundColor: 'red',
                borderColor: 'rgba(255,99,132,1)',
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
                        size: 14
                    }
                }
            },
        },
        scales: {
            x: {
                ticks: {
                    color: 'black',
                },
            },
            y: {
                ticks: {
                    color: 'black',
                },
                beginAtZero: true,
            },
        },
    };

    return (
        <div style={{ height: '300px', width: '100%' }}>
            <Line data={data} options={options} />
        </div>
    );
};
