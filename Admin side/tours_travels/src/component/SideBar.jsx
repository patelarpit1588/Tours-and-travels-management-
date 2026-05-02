import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./CSS/Structure_Stylesheet.css";

function Sidebar() {

  const navigate = useNavigate();

  const handleLogout = () => 
  {
    localStorage.removeItem("token");
    navigate("/", { replace: true });
  };

  return (
    <>
      <div id="navigation_bar">
        <br />
        <h2 id="Links">Menu</h2>
        <hr />

            <Link to="/dashboard" id="Links">Dashboard</Link>
            <Link to="/tour-package" id="Links">Packages</Link>
            <Link to="/tour-users" id="Links">Users</Link>
            <Link to="/tour-booking" id="Links">Booking</Link>
            <Link to="/all-passanger" id="Links">Passanger</Link>
            <Link to="/all-payments" id="Links">Payments</Link>
            <Link to="/tour-enquiry" id="Links">Enquiry</Link>
            <Link to="/tour-reviews" id="Links">Reviews</Link>

        <hr />

        <span id="Links" onClick={handleLogout}>Logout </span>
      </div>
    </>
  );
}

export default Sidebar;
