import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import axios from "axios";
import Logo from "./Logo";
import Sidebar from "./SideBar";
import Username from "./Admin_User_name";
import "./CSS/Tour_Tables.css"
import "./CSS/Structure_Stylesheet.css"



function Tour_Replied_Enquiry() {

    const [data, setData] = useState([]);

    useEffect(() => 
    {
        axios
            .get("http://localhost:5000/view_replied_enquiry")
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
            <div className="row">
                <div className="col-sm-2">
                    <Logo />
                </div>

                <div className="col-sm-10">
                    <Username />
                </div>
            </div>

            <div className="row">
                <div className="col-sm-2">
                    <Sidebar />
                </div>
                <div className="col-sm-10" id="Traveller_details">
                    <div className="row" >
                        <div id="Form-container">
                            <h2 id="Headings">Replied Enquiries</h2>

                            <center>
                                <Link to="/tour-enquiry"id="Enquiry_Status">All Enquiry</Link>
                                <Link to="/tour-pending-enquiry"id="Enquiry_Status">Pending Enquiry</Link>
                                <Link to="/tour-replied-enquiry"id="Enquiry_Status">Replied Enquiry</Link>
                            </center>

                            <div style={{ overflowX: "auto", width: "100%" }}>
                                <table cellPadding={10} cellSpacing={10} id="view_enquiry_table" className="table table-bordered table-striped table-hover">
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
                        </div>
                    </div>
                </div>
            </div><br />
        </>
    )
}

export default Tour_Replied_Enquiry;