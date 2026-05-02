import React from "react";
import "./CSS/Dashboard.css"
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom"

function Show_My_Payment_History() {

    const [data, setData] = useState([]);

    useEffect(() => 
    {
        axios
            .get("http://localhost:4000/view_my_all_payment_history",
            {
                headers: 
                {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            })
            .then((res) => 
            {
                if (res.status == 200) 
                {
                    const json = res.data
                    setData(json)
                }
            })
            .catch((err) => 
            {
                console.log(err);
            })
    },[])
 
    return (
        <>

            <div className="container-fluid">
                <div className="row">
                    <Navbar />
                </div>

                <div className="container"id="Dashboard_links_div">
                    <center>
                        <div id="Navigation_Links">
                            <Link to="/my-bookings"id="dashboard_links">My Bookings</Link>
                            <Link to="/my-enquiry"id="dashboard_links">My Enquiry</Link>
                            <Link to="/payment-history"id="dashboard_links"className="active">Payment History</Link>
                        </div>
                    </center>

                    <table cellPadding={10} cellSpacing={10} id="view_my_table" className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th>Payment Id</th>
                                            <th>Payment Mode</th>
                                            <th>Amount</th>
                                            <th>Payment Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            data.map((row) => 
                                            {
                                                return (
                                                    <tr>
                                                        <td>{row.payment_id}</td>
                                                        <td>{row.payment_mode}</td>
                                                        <td>{row.amount}</td>
                                                        <td>{new Date(row.payment_date).toLocaleString("en-IN")}</td>
                                                    </tr>
                                                )
                                            }
                                            )}
                                    </tbody>
                                </table>
                </div>


                <div className="row">
                    <Footer />
                </div>
            </div>


        </>
    );
}

export default Show_My_Payment_History;

