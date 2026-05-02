import React from "react";
import "./CSS/Destination.css";
import { Link } from "react-router-dom";
import CountUp from "react-countup";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";


function Destination_Section() {


    useEffect(() => {
        AOS.init({
            duration: 1500,
            once: false,
        });
    }, []);


    return (
        <>
            <div id="Destination_Main_Div">
                <div className="row" data-aos="fade-down">

                    <div className="col-sm-3">
                        <div className="Image_Box">
                            <img src="/Image/Tour_Image2.jpg" id="Hero_Section_Image_3" />
                        </div>
                    </div>

                    <div className="col-sm-3">
                        <div className="Image_Box">
                            <img src="/Image/Tour_Image3.png" id="Hero_Section_Image_2" />
                        </div>

                        <h3 id="Destination_Text">Destinations</h3>

                        <div className="Image_Box">
                            <img src="/Image/Tour_Image4.jpg" id="Hero_Section_Image_2" />
                        </div>
                    </div>

                    <div className="col-sm-6" id="Hero_Section_Content_1">
                        <br />
                        <h2 id="Destination_desc">
                            Plan <span id="Destiny_hero">Easy </span>, Pay <span id="Destiny_hero">Less </span>& Experience <span id="Destiny_hero">More </span>
                        </h2>

                        <div className="row" id="Destiny_Content_2">
                            <span id="Destiny_Small_Desc">
                                Plan Easy, Pay Less, and Experience More isn’t just a tagline — it’s a smarter way to travel. We make your journey effortless by simplifying every step of the planning process.
                                With budget-friendly options, you get to explore top destinations, enjoy premium stays, and create memories without worrying about costs.
                                Our curated packages offer maximum value at smart prices, ensuring every moment of your trip feels special.
                                When planning becomes easy, spending becomes lighter, and experiences become richer that’s when travel truly feels unforgettable.
                            </span>
                        </div>

                        <button id="SeeMore">See More Destinations</button>

                    </div>
                </div>
            </div>
        </>
    );
}

export default Destination_Section;
