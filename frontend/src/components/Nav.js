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

    isDesktop = () => {
        return window.innerWidth >= 768; // Adjust based on your breakpoint
    };

    handleResize = () => {
        // Update navbarCollapsed state if we're switching to desktop mode
        if (this.isDesktop() && !this.state.navbarCollapsed) {
            this.setState({ navbarCollapsed: true });
        }
    };

    componentDidMount() {
        window.addEventListener('resize', this.handleResize);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize);
    }

    render() {
        const { navbarCollapsed } = this.state;

        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
                {/* Conditionally render the Toggle Menu button based on screen size */}
                {this.isDesktop() && (
                    <button className="btn btn-primary" onClick={this.props.toggleSidebar}>
                        Menu
                    </button>
                )}

                <button className="navbar-toggler" type="button" onClick={this.toggleNavbar} aria-controls="navbarSupportedContent" aria-expanded={!navbarCollapsed} aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className={`collapse navbar-collapse ${navbarCollapsed ? '' : 'show'}`} id="navbarSupportedContent">
                    {/* Show the navbar items only in mobile mode */}
                    {!this.isDesktop() && (
                        <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
                            <li className="nav-item active">
                                <a className="nav-link" href="/">Dashboard <span className="sr-only">(current)</span></a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="add-transit">Tạo giao dịch</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="add-expense">Tạo chi tiêu</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="add-income">Tạo thu nhập</a>
                            </li>
                        </ul>
                    )}
                </div>

                {/* Nút Đăng xuất nằm ở cuối bên phải */}
                <div className="logout-button">
                    <a href="home" className="btn btn-danger">Đăng xuất</a>
                </div>
            </nav>
        );
    }
}

export default Nav;
