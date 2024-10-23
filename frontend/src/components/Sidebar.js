import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../assets/style/nav.css';

const Sidebar = ({ visible }) => {
    return (
        <Nav className={`sidebar ${visible ? 'visible' : 'hidden'}`}>
            <div className="sidebar-sticky">
                <Nav.Item>
                    <Link to="/" className="nav-link">Dashboard</Link>
                </Nav.Item>
                <Nav.Item>
                    <Link to="/add-expense" className="nav-link">AddExpenseP</Link>
                </Nav.Item>
                <Nav.Item>
                    <Link to="/add-income" className="nav-link">AddIncomeP</Link>
                </Nav.Item>
                <Nav.Item>
                    <Link to="/add-transit" className="nav-link">AddTransaction</Link>
                </Nav.Item>
                {/* <Nav.Item>
                    <Link to="/list-expense" className="nav-link">ExpenseList</Link>
                </Nav.Item>
                <Nav.Item>
                    <Link to="/list-income" className="nav-link">IncomeList</Link>
                </Nav.Item>
                <Nav.Item>
                    <Link to="/list-transit" className="nav-link">TransactionList</Link>
                </Nav.Item> */}
            </div>
        </Nav>
    );
};

export default Sidebar;
