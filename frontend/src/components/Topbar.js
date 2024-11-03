// Topbar.js
import React from 'react';
import { FaBars } from 'react-icons/fa';
import '../assets/style/topbar.css';

const TopBar = ({ onToggleSidebar }) => {
    const handleLogout = () => {
        console.log('User logged out');
        window.location.href = '/home';
    };

    return (
        <div className="topbar fixed-top">
            <button
                className="menu-icon btn btn-link"
                onClick={onToggleSidebar}
            >
                <FaBars size={24} />
            </button>

            <span className="topbar-title">Tổng quan</span>

            <div className="logout-button ml-auto">
                <button
                    className="btn btn-danger"
                    onClick={handleLogout}
                >
                    Đăng xuất
                </button>
            </div>
        </div>
    );
};

export default TopBar;
