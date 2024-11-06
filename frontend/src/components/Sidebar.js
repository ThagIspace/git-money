// Sidebar.js
import React from 'react';
import { useLocation } from 'react-router-dom';

const Sidebar = () => {
    // Định nghĩa menuItems trong Sidebar
    const menuItems = [
        { path: '/', label: 'Dashboard' },
        { path: '/add-income', label: 'Tạo thu nhập' },
        { path: '/add-expense', label: 'Tạo chi tiêu' },
        { path: '/add-budget', label: 'Tạo ngân sách' },
        { path: '/add-transit', label: 'Các giao dịch' },
        { path: '/calendar', label: 'Lịch' }
    ];

    const location = useLocation();

    return (
        <div className="bg-light border-right" id="sidebar-wrapper">
            <div className="sidebar-heading">Easy Budget</div>
            <hr />
            <div className="list-group list-group-flush">
                {menuItems.map((item) => (
                    <a
                        key={item.path}
                        href={item.path}
                        className={`list-group-item list-group-item-action ${location.pathname === item.path ? 'active' : ''} bg-light`}
                    >
                        {item.label}
                    </a>
                ))}
            </div>
        </div>
    );
};

export default Sidebar;
