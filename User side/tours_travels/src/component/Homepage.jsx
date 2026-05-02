import React from "react";
import Hero_Section from "./Hero_Section";
import Navbar from "./Navbar";
import Destination_Section from "./Destination.jsx";
import Contact_Us_Section from "./Contact_Us.jsx";
import Dummy_Packages from "./Dummy_Packages.jsx";
import Footer from "./Footer.jsx";
import About from "./About_Us.jsx";
import Show_Packages from "./Show_Packages.jsx";

function Homepage() {
    return (
        <>
            <Navbar />

            <div className="container-fluid">
              
                <div className="row">
                    <Hero_Section />
                    {/* <About/> */}
                    <Destination_Section/>
                    <Dummy_Packages/>
                    {/* <Show_Packages/> */}
                    <Contact_Us_Section />
                    <Footer/>
                </div>    
            </div>        
        </>
    )
}

export default Homepage;