// Sidebar.js
import React from 'react';
import { useLocation } from 'react-router-dom';
import { FaTh, FaListAlt, FaCalendarAlt, FaWallet, FaCreditCard, FaChartPie } from 'react-icons/fa';

const Sidebar = () => {
    // Định nghĩa menuItems với biểu tượng và đường dẫn
    const menuItems = [
        { path: '/', label: 'Tổng quan', icon: <FaTh /> },
        { path: '/calendar', label: 'Lịch', icon: <FaCalendarAlt /> },
        { path: '/add-transit', label: 'Các giao dịch', icon: <FaListAlt /> },
        { path: '/add-income', label: 'Tạo thu nhập', icon: <FaWallet /> },
        { path: '/add-expense', label: 'Tạo chi phí', icon: <FaCreditCard /> },
        { path: '/add-budget', label: 'Tạo ngân sách', icon: <FaChartPie /> },
    ];

    const location = useLocation();

    return (
        <div className="sidebar" id="sidebar-wrapper">
            <div className="sidebar-heading">Fast Budget</div>
            <hr />
            <div className="list-group list-group-flush">
                {menuItems.map((item) => (
                    <a
                        key={item.path}
                        href={item.path}
                        className={`list-group-item list-group-item-action ${location.pathname === item.path ? 'active' : ''}`}
                    >
                        <span className="icon">{item.icon}</span>
                        <span className="label">{item.label}</span>
                    </a>
                ))}
            </div>
        </div>
    );
};

export default Sidebar;
