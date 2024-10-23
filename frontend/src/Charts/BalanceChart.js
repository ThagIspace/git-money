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

// Đăng ký các scale và các thành phần khác của Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, LineController, Tooltip, Legend);

// Dữ liệu của biểu đồ
const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
        {
            label: 'Balance',
            data: [12000, 19000, 3000, 5000, 20000, 30000, 45000],
            fill: false,
            backgroundColor: 'blue',
            borderColor: 'rgba(75,192,192,1)',
        },
    ],
};

// Tùy chọn cấu hình biểu đồ
const options = {
    responsive: true,
    maintainAspectRatio: false, // Điều này sẽ giúp biểu đồ co dãn theo kích thước của container
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

// Component biểu đồ BalanceChart
export const BalanceChart = () => {
    return (
        <div style={{ height: '300px', width: '100%' }}>
            <Line data={data} options={options} />
        </div>
    );
};
