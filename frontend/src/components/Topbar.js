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
        <div className="topbar fixed-top"> {/* Đảm bảo thanh topbar cố định */}
            <button
                className="menu-icon btn btn-link"
                onClick={onToggleSidebar}
            >
                <FaBars size={24} /> {/* Biểu tượng dấu 3 gạch */}
            </button>

            <span className="topbar-title">Tổng quan</span> {/* Chữ Tổng quan nằm ở giữa */}

            <button
                className="logout-btn btn btn-danger"
                onClick={handleLogout}
            >
                Đăng xuất
            </button>
        </div>
    );
};

export default TopBar;
