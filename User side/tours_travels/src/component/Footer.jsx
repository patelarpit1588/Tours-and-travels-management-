import React from "react";
import "./CSS/Footer.css";
import { Link } from "react-router-dom";

function Footer() {
    return (
        <>
            <div id="Main_Footer_Div">
                <div id="footer_container">

                    <div className="row">

                        <div className="col-3">
                            <h2 id="footer_logo">
                                <span id="blue">Travel</span>
                                <span id="pink">Wise</span>
                            </h2>
                            <p id="footer_tagline">
                                Your Journey, Our Expertise — Explore More, Worry Less.
                            </p>
                        </div>

                        <div className="col-3">
                            <h4 id="footer_heading">Quick Links</h4>
                            <div className="row">
                                <div className="col-4">
                                <Link to="/" id="footer_links">Home</Link>
                                <Link to="/packages" id="footer_links">Packages</Link>
                                <Link to="/AboutUs" id="footer_links">About Us</Link>
                                <Link to="/register" id="footer_links">Sign Up</Link>
                                <Link to="/login" id="footer_links">Sign In</Link>
                            </div>
                            <div className="col-4">
                                 <Link to="/" id="footer_links">Home</Link>
                                <Link to="/packages" id="footer_links">Packages</Link>
                                <Link to="/AboutUs" id="footer_links">About Us</Link>
                                <Link to="/register" id="footer_links">Sign Up</Link>
                                <Link to="/login" id="footer_links">Sign In</Link>
                            </div>
                            <div className="col-4">
                                <Link to="/" id="footer_links">Home</Link>
                                <Link to="/packages" id="footer_links">Packages</Link>
                                <Link to="/AboutUs" id="footer_links">About Us</Link>
                                <Link to="/register" id="footer_links">Sign Up</Link>
                                <Link to="/login" id="footer_links">Sign In</Link>
                            </div>
                            </div>
                        </div>

                        <div className="col-3">
                            <h4 id="footer_heading">Contact Info</h4>
                            <p id="footer_details">📍 402 , Rajhans Montessa Complex , <br/>Dumas Road , Surat - 390007<br/>Gujarat, India</p>
                            <p id="footer_details">📞 +91 98765 43210</p>
                            <p id="footer_details">📧 support@travelwise.com</p>
                        </div>

                         <div className="col-3">
                        
                            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3129.3176146155674!2d72.74789246417754!3d21.13620432662037!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be0528431271647%3A0xc580cdb2cda7fedb!2sRajhans%20Montessa!5e0!3m2!1sen!2sin!4v1764484894124!5m2!1sen!2sin" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                        </div>
                    </div>
                </div>

                <div id="footer_bottom">
                    © 2026 TravelWise. All Rights Reserved.
                </div>

            </div>
        </>
    );
}

export default Footer;
