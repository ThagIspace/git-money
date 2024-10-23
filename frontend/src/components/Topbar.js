import React from 'react';
import { FaBars } from 'react-icons/fa'; // Icon for the menu button
import '../assets/style/nav.css';

const TopBar = ({ onToggleSidebar }) => {
    const handleLogout = () => {
        // Logic xử lý đăng xuất
        console.log('User logged out');
        window.location.href = '/login';
    };

    return (
        <div className="topbar">
            <FaBars className="menu-icon" onClick={onToggleSidebar} />
            <button
                className="logout-btn"
                onClick={handleLogout}
            >
                Đăng xuất
            </button>
        </div>
    );
};

export default TopBar;
