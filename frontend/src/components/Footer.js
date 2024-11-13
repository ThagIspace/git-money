// Footer.js
import React from 'react';
import '../assets/style/footer.css';

const Footer = () => {
    return (
        <div className="footer">
            <svg className="footer-wave" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                <path
                    fill="#20c4cc" // Màu nền xanh
                    fillOpacity="1"
                    d="M0,96L48,122.7C96,149,192,203,288,224C384,245,480,235,576,208C672,181,768,139,864,144C960,149,1056,203,1152,197.3C1248,192,1344,128,1392,96L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                ></path>
            </svg>
        </div>
    );
};

export default Footer;
