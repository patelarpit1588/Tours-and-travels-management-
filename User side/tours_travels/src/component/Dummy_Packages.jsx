import React from "react";
import "./CSS/Dummy_Packages.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { Link } from "react-router-dom";

function Dummy_Packages() {

    useEffect(() => {
        AOS.init({
            duration: 500,
            once: false,
        });
    }, []);


    return (
        <>
            <div id="Main_dummy_div" data-aos="fade-down">
                <div className="row">

                    <div className="col-5" id="Dummy_Section_Content_1">

                        <h1 id="dummy_desc">
                            <span id="dummy_highlight">Explore</span> More Destinations , <br />
                            Create More <span id="dummy_highlight">Memories.</span>
                        </h1>

                        <div className="row" id="Dummy_Section_Content_2">
                            <span id="dummy_Small_Desc">
                                Choose any package you like and start your journey without stress. We take care of everything so you can relax and enjoy your vacation.
                            </span>
                        </div><br />

                        <div className="row" id="Dummy_Section_Content_3">
                            <div className="row">
                                <div className="col-sm-12">
                                    <Link to="/packages" id="Btn_SeeMore_Packages">See More Packages</Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-12" id="dummy_packages_div">
                        <div className="row">
                            <center id="Our_Packages_text">
                                <span>Our </span>
                                <span id="dummy_highlight">Packages</span>
                            </center>
                        </div>
                        <div id="packageCarousel" className="carousel slide" data-bs-ride="carousel">
                            <div className="carousel-inner">

                                {/* SLIDE 1 */}
                                <div className="carousel-item active">
                                    <div className="row">

                                        <div className="col-6">
                                            <div className="package-card">
                                                <img
                                                    src="/Image/Tour_Image3.png"
                                                    className="package-img"
                                                />
                                                <h4 className="package-title">Goa, India</h4>
                                                <p className="package-desc">
                                                    Enjoy beaches, nightlife and beautiful sunsets. Perfect for a weekend escape.
                                                </p>
                                                <h5 className="package-price">₹5,999 / Person</h5>
                                                <button className="package-btn">Book Now</button>
                                            </div>
                                        </div>

                                        <div className="col-6">
                                            <div className="package-card">
                                                <img src="/Image/Tour_Image4.jpg"className="package-img"/>
                                                <h4 className="package-title">Manali, India</h4>
                                                <p className="package-desc">
                                                    Snow, mountains and adventure for an amazing nature trip.
                                                </p>
                                                <h5 className="package-price">₹7,499 / Person</h5>
                                                <button className="package-btn">Book Now</button>
                                            </div>
                                        </div>

                                    </div>
                                </div>

                                <div className="carousel-item active">
                                    <div className="row">

                                        <div className="col-6">
                                            <div className="package-card">
                                                <img
                                                    src="/Image/Tour_Image3.png"
                                                    className="package-img"
                                                />
                                                <h4 className="package-title">Goa, India</h4>
                                                <p className="package-desc">
                                                    Enjoy beaches, nightlife and beautiful sunsets. Perfect for a weekend escape.
                                                </p>
                                                <h5 className="package-price">₹5,999 / Person</h5>
                                                <button className="package-btn">Book Now</button>
                                            </div>
                                        </div>

                                        <div className="col-6">
                                            <div className="package-card">
                                                <img
                                                    src="/Image/Tour_Image4.jpg"
                                                    className="package-img"
                                                />
                                                <h4 className="package-title">Manali, India</h4>
                                                <p className="package-desc">
                                                    Snow, mountains and adventure for an amazing nature trip.
                                                </p>
                                                <h5 className="package-price">₹7,499 / Person</h5>
                                                <button className="package-btn">Book Now</button>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>

                            {/* BLACK ARROW BUTTONS */}
                            <button className="carousel-control-prev" type="button" data-bs-target="#packageCarousel" data-bs-slide="prev">
                                <span className="carousel-control-prev-icon" style={{ filter: "invert(5)", backgroundColor: "black" }}></span>
                            </button>

                            <button className="carousel-control-next" type="button" data-bs-target="#packageCarousel" data-bs-slide="next">
                                <span className="carousel-control-next-icon" style={{ filter: "invert(1)", backgroundColor: "black" }}></span>
                            </button>

                        </div>

                    </div>

                </div>
            </div>
        </>
    );
}

export default Dummy_Packages;
