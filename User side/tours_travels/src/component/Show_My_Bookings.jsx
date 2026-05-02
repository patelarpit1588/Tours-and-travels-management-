import React from "react";
import "./CSS/Dashboard.css"
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import "./CSS/Tables.css"

function Show_My_Bookings() {

    const [data, setData] = useState([]);

    useEffect(() => 
    {
        axios
            .get("http://localhost:4000/view_my_booking_1",
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
                            <Link to="/my-bookings"id="dashboard_links"className="active">My Bookings</Link>
                            <Link to="/my-enquiry"id="dashboard_links">My Enquiry</Link>
                            <Link to="/payment-history"id="dashboard_links">Payment History</Link>
                        </div>
                    </center>

                    <table cellPadding={10} cellSpacing={10} id="view_my_table" className="table table-bordered table-striped">
                                    <thead>
                                        <tr>
                                            <th>Booking id</th>
                                            <th>Travel Date</th>
                                            <th>Person</th>
                                            <th>Booking Status</th>
                                            <th>Payment | Refund Status</th>
                                            <th>Action</th>
                                            <th>Refund</th>
                                            <th>Add Review</th>
                                            <th>Booking At</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            data.map((row) => 
                                            {
                                                return (
                                                    <tr>
                                                        <td>{row.booking_id}</td>
                                                        <td>{new Date(row.start_date).toLocaleDateString("en-IN")}</td>
                                                        <td>{row.persons}</td>
                                                        <td>{row.booking_status}</td>
                                                        <td>{row.payment_status}</td>
                                                        <td>
                                                        {
                                                            ( row.booking_status === "Confirm" || row.booking_status === "Cancelled" )
                                                            ?
                                                            <Link to={`/tourPayment/${row.booking_id}`} id="btn_pay_now"  className="btn btn-success">
                                                                View Payment
                                                            </Link> 
                                                            :
                                                            <Link to={`/tourPayment/${row.booking_id}`}  id="btn_pay_now"  className="btn btn-primary">
                                                                Pay now
                                                            </Link>
                                                        }
                                                        </td>
                                                        <td><Link to={`/tour-cancle_refunds/${row.booking_id}`} id="btn_pay_now"className="btn btn-danger">Cancle | Refund</Link></td>
                                                        <td>
                                                        {
                                                            row.booking_status === "Cancelled" ? 
                                                            (
                                                                <span style={{ color: "#999" }}>—</span>
                                                            ) 
                                                            : (row.booking_status === "Confirm" && row.payment_status === "Paid") ? 
                                                            (
                                                                !localStorage.getItem(`review_${row.tour_id}`) ? (
                                                                    <Link
                                                                        to={`/addreview/${row.tour_id}`}
                                                                        id="btn_pay_now"
                                                                        className="btn btn-dark"
                                                                    >
                                                                        Add Review
                                                                    </Link>
                                                                ) : 
                                                                (
                                                                    <span className="btn btn-warning" id="btn_pay_now">
                                                                        Reviewed ✓
                                                                    </span>
                                                                )
                                                            ) : 
                                                            (
                                                                <span className="btn btn-info" id="btn_pay_now">
                                                                    After Payment
                                                                </span>
                                                            )
                                                        }
                                                        </td>                                                     
                                                        <td>{new Date(row.created_at).toLocaleString("en-IN")}</td>
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

export default Show_My_Bookings;

