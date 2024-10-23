import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../assets/style/nav.css';

const Sidebar = ({ visible }) => {
    return (
        <Nav className={`sidebar ${visible ? 'visible' : 'hidden'}`}>
            <div className="sidebar-sticky">
                <Nav.Item>
                    <Link to="/" className="nav-link">Bảng Điều Khiển</Link>
                </Nav.Item>
                <Nav.Item>
                    <Link to="/add-expense" className="nav-link">Thêm Chi Phí</Link>
                </Nav.Item>
                <Nav.Item>
                    <Link to="/add-income" className="nav-link">Thêm Thu Nhập</Link>
                </Nav.Item>
                <Nav.Item>
                    <Link to="/add-transit" className="nav-link">Thêm Giao Dịch</Link>
                </Nav.Item>
                {/* <Nav.Item>
                    <Link to="/list-expense" className="nav-link">Danh Sách Chi Phí</Link>
                </Nav.Item>
                <Nav.Item>
                    <Link to="/list-income" className="nav-link">Danh Sách Thu Nhập</Link>
                </Nav.Item>
                <Nav.Item>
                    <Link to="/list-transit" className="nav-link">Danh Sách Giao Dịch</Link>
                </Nav.Item> */}
            </div>
        </Nav>
    );
};

export default Sidebar;
