import React from 'react';
import { Container, Form, Button, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../assets/style/common.css'; // Bạn có thể thêm CSS tùy chỉnh nếu cần
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';

const Login = () => {
    return (
        <div className="login-page">
            <Container className="d-flex flex-column justify-content-center align-items-center min-vh-100">
                <Card className="p-4 shadow-lg" style={{ width: '100%', maxWidth: '450px' }}>
                    <div className="text-center mb-4">
                        <img
                            src="https://cdn.textstudio.com/output/sample/normal/8/6/7/4/budget-logo-73-14768.png"
                            alt="Logo"
                            className="mb-3"
                            style={{ width: '100px', height: '100px' }}
                        />
                        <h2 className="text-primary">EasyBudget</h2>
                    </div>
                    <h4 className="text-center mb-4">Đăng nhập</h4>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Tài khoản</Form.Label>
                            <div className="input-group">
                                <span className="input-group-text">
                                    <FontAwesomeIcon icon={faEnvelope} size="lg" />
                                </span>
                                <Form.Control type="text" placeholder="Nhập tài khoản" />
                            </div>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Mật khẩu</Form.Label>
                            <div className="input-group">
                                <span className="input-group-text">
                                    <FontAwesomeIcon icon={faLock} size="lg" />
                                </span>
                                <Form.Control type="password" placeholder="Nhập mật khẩu" />
                            </div>
                        </Form.Group>

                        <Button variant="primary" type="submit" className="w-100">
                            Xác nhận
                        </Button>
                    </Form>

                    <div className="text-center mt-3">
                        <Link to="/home" className="text-muted">
                            Quay lại
                        </Link>
                    </div>
                    <div className="text-center mt-4">
                        <Link to="/register">
                            <Button variant="outline-primary" className="w-100">
                                Đăng ký
                            </Button>
                        </Link>
                    </div>
                </Card>
                <div className="text-center mt-3">
                    <Link to="/terms">Terms of Service</Link> - <Link to="/privacy">Privacy Policy</Link> - <Link to="/cookies">Manage cookies</Link>
                </div>
            </Container>
        </div>
    );
};

export default Login;
