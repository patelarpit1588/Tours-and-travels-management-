import React, { useEffect } from "react";  // Correct
import "./CSS/About_Us.css";
import "./CSS/navbar.css";
import Navbar from "./Navbar";
import Footer from "./Footer";
import AOS from "aos";
function About() {

    useEffect(() => {
        AOS.init({
            duration: 1500,
            once: false,
        });
    }, []);

    return (
        <>
            <Navbar />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-5" id="About_div_image" data-aos="fade-down">
                        <center> <img src="/Image/IMAGE7(1).jpg" id="about_image_12" /></center>
                    </div>
                    <div className="col-7" id="About_div_text" data-aos="fade-down">
                        <span id="Welcome_Message_1">Your <span style={{ color: "red" }}>Travel</span> , Our <span style={{ color: "red" }}>Vision</span> </span> <br />
                        <span id="Welcome_Message_2">Welcome to TravelWise
                        </span>

                        <div className="row" id="Paragraphs">
                            <p id="Paragraph_Header">Who We Are</p>
                            <p id="Paragraph_Desc">TravelWise is a modern, customer-centric travel company dedicated to creating smooth and unforgettable travel experiences. With a blend of expertise, smart planning, and personalized service, we ensure every journey is comfortable, organized, and truly memorable.</p>
                        </div>

                        <div className="row" id="Paragraphs">
                            <p id="Paragraph_Header">Our Mission & Vision</p>
                            <p id="Paragraph_Desc">Our mission is to design meaningful journeys that combine comfort, value, and unforgettable memories. Our vision is to become a global travel leader known for trust, quality, and exceptional customer experiences.</p>
                        </div>

                    </div>
                </div>


                <div className="row">
                    <div id="about-container">
                        <div className="row">
                            <div className="col-sm-12">
                                <center Id="Why_Choose_Text">
                                    We Provide Quality Services For Every Traveler
                                </center>
                            </div>
                        </div>

                        <div className="container">
                            <div className="row" id="Service_div" data-aos="fade-down">
                                <div className="col-sm-4" id="service">
                                    <div id="service_content" style={{ border: "2px solid rgb(255,0,55)" }}>
                                        <p id="service_bold" style={{ color: "rgb(255,0,55)" }}>Flight Reservations</p>
                                        <p id="service_desc">Book domestic & international flights at best prices.</p>
                                    </div>
                                </div>
                                <div className="col-sm-4" id="service" data-aos="fade-down">
                                    <div id="service_content" style={{ border: "2px solid rgb(0, 110, 255) " }}>
                                        <p id="service_bold" style={{ color: "rgb(0, 110, 255)" }}>Hotel & Resort Bookings</p>
                                        <p id="service_desc">Hand-picked hotels & resorts with verified reviews.</p>
                                    </div>
                                </div>
                                <div className="col-sm-4" id="service" data-aos="fade-down">
                                    <div id="service_content" style={{ border: "2px solid #ffb700" }}>
                                        <p id="service_bold" style={{ color: "#ffb700" }}>Holiday Packages</p>
                                        <p id="service_desc">Tailor-made packages for unforgettable experiences.</p>
                                    </div>
                                </div>
                                <div className="col-sm-4" id="service" data-aos="fade-down">
                                    <div id="service_content" style={{ border: "2px solid rgb(8, 203, 0)" }}>
                                        <p id="service_bold" style={{ color: "rgb(8, 203, 0)" }}>Cab & Transfers</p>
                                        <p id="service_desc">Airport pickups & local transport made easy.</p>
                                    </div>
                                </div>
                                <div className="col-sm-4" id="service" data-aos="fade-down">
                                    <div id="service_content" style={{ border: "2px solid rgba(128, 0, 255, 1)" }}>
                                        <p id="service_bold" style={{ color: "rgba(128, 0, 255, 1)" }}>Visa Assistance</p>
                                        <p id="service_desc">Expert help for smooth visa processing.</p>
                                    </div>
                                </div>
                                <div className="col-sm-4" id="service" data-aos="fade-down">
                                    <div id="service_content" style={{ border: "2px solid rgba(221, 0, 255, 1)" }}>
                                        <p id="service_bold" style={{ color: "rgba(221, 0, 255, 1)" }}>Travel Insurance</p>
                                        <p id="service_desc">Protect your trip with comprehensive coverage.</p>
                                    </div>
                                </div>
                                <div className="col-sm-4" id="service" data-aos="fade-down">
                                    <div id="service_content" style={{ border: "2px solid rgba(255, 0, 157, 1)" }}>
                                        <p id="service_bold" style={{ color: "rgba(255, 0, 157, 1)" }}>24×7 Support</p>
                                        <p id="service_desc">Dedicated assistance whenever you need it.</p>
                                    </div>
                                </div>
                                <div className="col-sm-4" id="service" data-aos="fade-down">
                                    <div id="service_content" style={{ border: "2px solid rgba(22, 73, 10, 1)" }}>
                                        <p id="service_bold" style={{ color: "rgba(22, 73, 10, 1)" }}>Adventure & Activities</p>
                                        <p id="service_desc">Thrilling experiences like trekking, scuba, and paragliding.</p>
                                    </div>
                                </div>

                                <div className="col-sm-4" id="service" data-aos="fade-down">
                                    <div id="service_content" style={{ border: "2px solid rgba(255, 125, 3, 1)" }}>
                                        <p id="service_bold" style={{ color: "rgba(255, 125, 3, 1)" }}>Mobile & Online Support</p>
                                        <p id="service_desc">Manage bookings and get assistance through apps or chat.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>




                    <div className="row"id="Bottom_About">
                       
                        <div className="col-6" id="About_div_text1" data-aos="fade-down">
                            <span id="Welcome_Message_1">Your <span style={{ color: "rgba(19, 31, 195, 1)" }}>Trust</span> , Our <span style={{ color: "rgba(19, 31, 195, 1)" }}>Priority</span> </span> <br />
                            <span id="Welcome_Message_2">Safe Travel Guaranteed
                            </span><br/><br/>

                            <div className="row" id="About_Bottom_Paragraphs">
                                <p id="About_Bottom_Paragraph_Header"> Our Values</p>
                                <p id="About_Bottom_Paragraph_Desc">We believe in trust, transparency, and customer satisfaction. Every trip we plan is guided by honesty, responsibility, and a commitment to deliver a safe and enjoyable travel experience. Our values inspire us to treat every traveler like family and ensure they receive genuine care at every step of the journey.</p>
                            </div>

                            <div className="row" id="Paragraphs">
                                <p id="About_Bottom_Paragraph_Header">Why Choose Us</p>
                                <p id="About_Bottom_Paragraph_Desc">With years of experience in the travel industry, we offer well-organized trips, verified accommodations, and smooth travel support. Our team works 24/7 to make your journey stress-free. From affordable packages to personalized plans, we ensure that you get the best travel experience without any hassle.</p>
                            </div>
                        </div>

                        <div className="col-4" id="About_div_image" data-aos="fade-down">
                            <center> <img src="../public/Image/IMAGE48.png" id="about_image_12" /></center>
                        </div>
                    </div>
                </div>


                <div className="row">
                    <Footer />
                </div>
            </div>


        </>
    );
}

export default About;

