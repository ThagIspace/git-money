// Nav.js
import React from 'react';
import '../assets/style/sidebar.css';

class Nav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            navbarCollapsed: true,
        };
    }

    toggleNavbar = () => {
        this.setState((prevState) => ({
            navbarCollapsed: !prevState.navbarCollapsed,
        }));
    };

    render() {
        const { navbarCollapsed } = this.state;

        return (
            <div className='fixed-top'>
                <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom d-lg-none"> {/* Hiển thị trên mobile, ẩn trên desktop */}
                    <button className="navbar-toggler" type="button" onClick={this.toggleNavbar} aria-controls="navbarSupportedContent" aria-expanded={!navbarCollapsed} aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className={`collapse navbar-collapse ${navbarCollapsed ? '' : 'show'}`} id="navbarSupportedContent">
                        <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
                            <li className="nav-item active">
                                <a className="nav-link" href="/">Dashboard</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="add-transit">Các giao dịch</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="add-expense">Tạo chi tiêu</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="add-budget">Tạo ngân sách</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="add-income">Tạo thu nhập</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="calendar">Lịch</a>
                            </li>
                        </ul>
                    </div>

                    <div className="logout-button ml-auto">
                        <a href="home" className="btn btn-danger">Đăng xuất</a>
                    </div>
                </nav>
            </div>
        );
    }
}

export default Nav;
