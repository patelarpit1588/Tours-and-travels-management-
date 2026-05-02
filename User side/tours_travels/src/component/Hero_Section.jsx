import React from "react";
import "./CSS/Hero_Section.css";
import CountUp from "react-countup";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

function Hero_Section() {

    useEffect(() => {
        AOS.init({
            duration: 500,
            once: false,
        });
    }, []);


    return (
        <>
            <div id="Main_div">
                <div className="row" data-aos="fade-down">

                    <div className="col-7" id="Hero_Section_Content_1">

                        <h1 id="Hero_desc">
                            Lifelong <span id="highlight">Memories</span> Just <br />A Few Days Away
                        </h1>

                        <div className="row" id="Hero_Section_Content_2">
                            <span id="Hero_Small_Desc">
                                Explore breathtaking destinations, unique cultures, and unforgettable experiences curated just for you.
                                Whether you're searching for adventure or pure relaxation, your perfect journey begins the moment you choose to travel with us.
                            </span>
                        </div>

                        <div className="row" id="Stats_Row">

                            <div className="col-3 Stat_Box">
                                <h2 id="Stat_Number">
                                    <CountUp end={10} duration={7} />+
                                </h2>
                                <p id="Stat_Label">Years Experience</p>
                            </div>
                            
                            <div className="col-3 Stat_Box">
                                <h2 id="Stat_Number">
                                    <CountUp end={150} duration={3} />+
                                </h2>
                                <p id="Stat_Label">Destinations</p>
                            </div>

                            <div className="col-3 Stat_Box">
                                <h2 id="Stat_Number">
                                    <CountUp end={5000} duration={3} />+
                                </h2>
                                <p id="Stat_Label">Happy Travelers</p>
                            </div>

                            <div className="col-3 Stat_Box">
                                <h2 id="Stat_Number">
                                    <CountUp end={120} duration={3} />+
                                </h2>
                                <p id="Stat_Label">Tours Arranged</p>
                            </div>

                        </div>
                    </div>

                    <div className="col-5">
                        <center>
                            <img src="/Image/Image1(3).jpg" id="Hero_Section_Image_1" />
                        </center>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Hero_Section;
