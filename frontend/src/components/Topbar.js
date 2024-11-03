// Topbar.js
import React from 'react';
import { FaBars } from 'react-icons/fa';
import '../assets/style/topbar.css';

const TopBar = ({ onToggleSidebar }) => {
    return (
        <div className="topbar">
            <button
                className="menu-icon btn btn-link"
                onClick={onToggleSidebar} // Gọi hàm khi nhấn vào nút
            >
                <FaBars size={24} />
            </button>
            <span className="topbar-title">Tổng quan</span>
        </div>
    );
};

export default TopBar;
