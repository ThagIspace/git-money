import React from 'react';
import { Container, Navbar, Nav, Button, Row, Col, Form } from 'react-bootstrap';
import { Link as ScrollLink } from 'react-scroll';
import '../assets/style/homeP.css'; // Import file CSS cho style
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faYoutube, faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';

const HomeP = () => {
    return (
        <div className="">
            {/* Navbar */}
            <Navbar fixed="top" expand="lg" className="shadow-sm ">
                <Container>
                    <Navbar.Brand href="/">
                        <img src="https://cdn.textstudio.com/output/sample/normal/8/6/7/4/budget-logo-73-14768.png" alt="Logo" className="navbar-logo white" />
                        <span style={{ color: 'white' }}>EasyBudget</span>
                    </Navbar.Brand>

                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto navbar-bg">
                            <Button variant="outline-primary" href="/login" className="ms-2">Đăng nhập</Button>
                            <Button variant="outline-primary" href="/register" className="ms-2">Đăng ký</Button>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>


            {/* Hero Section */}
            <div id="home" className="hero-section"> {/* Add an id to the section */}
                <Container>
                    {/* <img src="https://cdn.textstudio.com/output/sample/normal/8/6/7/4/budget-logo-73-14768.png" alt="Logo" className="hero-logo" /> */}
                    <h1>Chào mừng đến với EasyBudget</h1>
                    <p>Giải pháp trọn gói giúp bạn quản lý mọi thứ.</p>
                    <Button href='/login' variant="danger   " size="lg" className='mb-5'>Bắt Đầu Ngay</Button>
                    <div className="benefits">
                        <Row>
                            <Col md={4} >
                                <img src="https://tse1.mm.bing.net/th?id=OIP.HmIKPhC2MHmojZ9vBjDoGgHaFj&pid=Api&P=0&h=220" alt="Feature 1" />
                                <h4>Quản lý dễ dàng</h4>
                                <p>Theo dõi tài chính của bạn chỉ trong vài cú nhấp chuột.</p>
                            </Col>
                            <Col md={4} >
                                <img src="https://tse2.mm.bing.net/th?id=OIP.oW56SAjspEqOXkJxDiotDgHaHa&pid=Api&P=0&h=220" alt="Feature 2" />
                                <h4>Báo cáo chi tiết</h4>
                                <p>Cung cấp các báo cáo toàn diện để bạn luôn nắm rõ tình hình.</p>
                            </Col>
                            <Col md={4} >
                                <img src="https://tse2.mm.bing.net/th?id=OIP.PVOAUEjn36U1gqrKQlhQBAHaE8&pid=Api&P=0&h=220" alt="Feature 3" />
                                <h4>Giao diện thân thiện</h4>
                                <p>Giao diện dễ sử dụng, không cần nhiều thao tác phức tạp.</p>
                            </Col>
                        </Row>
                    </div>
                </Container>
            </div>

            {/* Overview Section */}
            <div id="overview" className="overview-section"> {/* Add an id to the section */}
                <Container>
                    <h2>Tổng quan</h2>
                    <p>Bạn có thể hình dung dòng tiền của mình chỉ bằng cách lướt qua trang Tổng quan có thể tùy chỉnh hoàn toàn.</p>
                    <p>Tại đây bạn có thể tìm thấy ngân sách mà bạn sử dụng thường xuyên nhất.</p>

                    {/* Add the uploaded image */}
                    <div className="overview-image-container">
                        <img src="image1.png" alt="Overview" className="overview-image" />
                    </div>
                </Container>
            </div>

            {/* Contact Section */}
            <div id="contact" className="contact-section"> {/* Add an id to the section */}
                <Container>
                    <h2>Liên hệ với chúng tôi</h2>
                    <p>Nếu bạn có bất kỳ thắc mắc nào, hãy liên hệ với chúng tôi!</p>
                    <Form>
                        <Row>
                            <Col md={6}>
                                <Form.Group controlId="formName">
                                    <Form.Label>Tên của bạn</Form.Label>
                                    <Form.Control type="text" placeholder="Nhập tên của bạn" />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group controlId="formEmail">
                                    <Form.Label>Địa chỉ email</Form.Label>
                                    <Form.Control type="email" placeholder="Nhập địa chỉ email của bạn" />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Form.Group controlId="formMessage" className="mt-3">
                            <Form.Label>Tin nhắn</Form.Label>
                            <Form.Control as="textarea" rows={5} placeholder="Viết tin nhắn tại đây" />
                        </Form.Group>
                        <Button variant="primary" type="submit" className="mt-3 mb-3">
                            Gửi ngay
                        </Button>
                    </Form>
                    <div className="social-icons">
                        <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faYoutube} size="5x" /> {/* Increase size to 3x */}
                        </a>
                        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faFacebook} size="5x" /> {/* Increase size to 3x */}
                        </a>
                        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faInstagram} size="5x" /> {/* Increase size to 3x */}
                        </a>
                    </div>
                </Container>
            </div>
            {/* Footer */}
            <footer className="footer">
                <Container>
                    <p className="mb-0">&copy; {new Date().getFullYear()} Milk tới chơi!!!!!!!!!</p>
                </Container>
            </footer>
        </div>
    );
};

export default HomeP;
