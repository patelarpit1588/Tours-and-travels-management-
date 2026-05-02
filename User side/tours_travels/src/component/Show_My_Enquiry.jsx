import React from "react";
import "./CSS/Dashboard.css"
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom"

function Show_My_Enquiry() {

    const [data, setData] = useState([]);

    useEffect(() => 
    {
        axios
            .get("http://localhost:4000/view_replied_enquiry_userside",
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

    useEffect(() => 
    {
    if (data.length > 0 && window.$) 
        {
        const table = window.$("#view_enquiry_table");

        if (!window.$.fn.DataTable.isDataTable(table)) 
        {
        table.DataTable({
            searching: true,
            ordering: true,
        });
        }
    }
    }, [data]);
    
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
                            <Link to="/my-enquiry"id="dashboard_links"className="active">My Enquiry</Link>
                            <Link to="/payment-history"id="dashboard_links">Payment History</Link>
                        </div>
                    </center>

                    <table cellPadding={10} cellSpacing={10} id="view_my_table" className="table table-bordered table-striped">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Username</th>
                                <th>Email Id</th>
                                <th>Phone No</th>
                                <th>Message</th>
                                <th>Status</th>
                                <th>Replay</th>
                                <th>Created At</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data.map((row) => 
                                {
                                    return (
                                        <tr>
                                            <td>{row.enquiry_id}</td>
                                            <td>{row.name}</td>
                                            <td>{row.email}</td>
                                            <td>{row.phone_no}</td>
                                            <td className="message-column">{row.message}</td>
                                            <td>{row.enquiry_status}</td>
                                            <td className="message-column">{row.reply_message}</td>
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

export default Show_My_Enquiry;

