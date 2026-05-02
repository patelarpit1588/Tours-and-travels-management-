import React, { useState } from "react";
import "./CSS/Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function Navbar() {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const [showDropdown, setShowDropdown] = useState(false);

    let userEmail = "";

    if (token) 
    {
        try 
        {
            const decoded = jwtDecode(token);
            userEmail = decoded.email;
        } 
        catch (error) 
        {
            console.log("Invalid token");
        }
    }

    const handleLogout = () => 
    {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <div className="row" id="navbar">
            <div className="col-sm-2">
                <span id="logo_text_1" style={{ color: "rgba(0, 132, 255, 1)" }}>
                    Travel
                </span>
                <span id="logo_text_2" style={{ color: "rgba(255, 0, 162, 1)" }}>
                    Wise
                </span>
            </div>

            <div className="col-sm-10" id="navbar_div">
                <Link to="/" id="navbarlinks">Home</Link>
                <Link to="/packages" id="navbarlinks">Packages</Link>
                <Link to="/Aboutus" id="navbarlinks">About Us</Link>
                <Link to="/my-bookings" id="navbarlinks">Dashboard</Link>

                {token ? 
                (
                    <div id="user-menu">
                        <div onClick={() => setShowDropdown(!showDropdown)} id="navbarlinks" style={{color:"red",cursor:"pointer"}}>
                            <span id="profile-text">Profile</span>
                            <span id="arrow">▼</span>
                        </div>

                        {showDropdown && (
                            <div id="user-dropdown">
                                <div id="dropdown-header">
                                    <div id="signed-text">Signed in as</div>
                                    <div id="dropdown-email">{userEmail}</div>
                                </div>

                                <div id="dropdown-divider"></div>

                                <button onClick={handleLogout} id="logout-button">
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                ) : 
                (
                    <Link to="/login" id="navbarlinks">Sign In</Link>
                )}
            </div>
        </div>
    );
}

export default Navbar;