import React from "react";
import "./CSS/Show_Packages.css"
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

function Show_Packages() {

    const [data, setData] = useState([]);
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    useEffect(() => {
        axios
            .get("http://localhost:4000/viewpackages", 
            { headers: 
                {
                    Authorization: `Bearer ${token}`
                }
            })
            .then((res) => 
            {
                if (res.status === 200) 
                {
                    const json = res.data;
                    setData(json);
                }
            })
            .catch((err) => {0
                console.log(err);
            });
    }, []);

    return (
        <>

            <div className="container-fluid">
                <div className="row">
                    <Navbar />
                </div>

                <div className="container">

                    <div id="Packages_Header">
                        <center id="Packages_Header_Text">Discover Our <span id="packages_text_highlight"> Exclusive </span>Travel Packages</center>
                    </div>

                    <div className="row">
                        {
                            data.map((row) => {
                                return (
                                    <div className="col-3">
                                        <div id="package-card">
                                            <img src={`http://localhost:5000/uploads/pakage/${row.main_image}`}id="package-img" />
                                            <h4 id="package-title">{row.location} | {row.duration}</h4>
                                            <p id="package-desc">{row.description}</p>
                                            <h5 id="package-price">₹{row.price} | Person </h5>
                                            <button id="viewmore-btn"onClick={() => navigate(`/packagedetails/${row.tour_id}`)}> View More</button>
                                            <button id="package-btn"onClick={() => navigate(`/tourbooking/${row.tour_id}`)}> Book Now</button>
                                       </div>
                                    </div>
                                );
                            })}
                    </div>
                </div>


                <div className="row">
                    <Footer />
                </div>
            </div>


        </>
    );
}

export default Show_Packages;

