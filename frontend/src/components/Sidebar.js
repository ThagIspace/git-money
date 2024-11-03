import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../assets/style/nav.css';

const Sidebar = ({ visible, toggleSidebar }) => {
    return (
        <Nav className={`sidebar ${visible ? 'visible' : 'hidden'}`}>
            <div className="sidebar-sticky">
                <Nav.Item>
                    <Link to="/" className="btn btn-block nav-link">
                        Bảng Điều Khiển
                    </Link>
                </Nav.Item>
                <Nav.Item>
                    <Link to="/add-expense" className="btn  btn-block nav-link">
                        Thêm Chi Phí
                    </Link>
                </Nav.Item>
                <Nav.Item>
                    <Link to="/add-income" className="btn btn-block nav-link">
                        Thêm Thu Nhập
                    </Link>
                </Nav.Item>
                <Nav.Item>
                    <Link to="/add-transit" className="btn btn-block nav-link">
                        Các Giao Dịch
                    </Link>
                </Nav.Item>
            </div>
        </Nav>
    );
};

export default Sidebar;
