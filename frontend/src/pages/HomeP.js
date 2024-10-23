import React from 'react';
import { Container, Navbar, Nav, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../assets/style/homeP.css'; // Import file CSS cho style

const HomeP = () => {
    return (
        <div className="home-container">
            {/* Navbar */}
            <Navbar bg="primary" expand="lg" variant="dark" className="navbar">
                <Container>
                    <Navbar.Brand as={Link} to="/">
                        <img src="/logo.png" width="40" height="40" />Milk
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                            <Nav.Link as={Link} to="/">Home</Nav.Link>
                            <Nav.Link as={Link} to="/bank-sync">Bank sync</Nav.Link>
                        </Nav>
                        <Nav className="ml-auto">
                            <Button variant="outline-light" as={Link} to="/login" className="mx-2">Log in</Button>
                            <Button variant="outline-light" as={Link} to="/register">Sign up</Button>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            {/* Main Section */}
            <Container className="main-section text-center">
                <Row className="justify-content-center">
                    <Col md={8}>
                        <img src="/wallet-icon.png" alt="Wallet Icon" className="wallet-icon" />
                        <h1>FAST BUDGET WEB</h1>
                        <p>Manage your personal finances in the web</p>
                        <p className="subscription-info">A subscription is required to access the service (Premium/Ultra)</p>
                        <div className="btn-group">
                            <Button variant="light" className="main-btn mx-2" as={Link} to="/login">LOGIN</Button>
                            <Button variant="light" className="main-btn mx-2" as={Link} to="/register">REGISTRATION</Button>
                        </div>
                        <p className="free-trial-text">Create an account or log in to try the web app for free!</p>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default HomeP;
