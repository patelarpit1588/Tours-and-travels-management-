import React, { useState, useEffect } from "react"
import axios from "axios";
import Logo from "./Logo";
import Sidebar from "./SideBar";
import Username from "./Admin_User_name";
import "./CSS/Tour_Tables.css"
import "./CSS/Structure_Stylesheet.css"


function Tour_Review() {

    const [data, setData] = useState([]);

    useEffect(() => 
    {
        axios
            .get("http://localhost:5000/viewreview")
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

    const handleDelete = (review_id) => 
    {
        if (!window.confirm("Are you sure you want to Remove this User?")) 
        return;

        axios
        .delete(`http://localhost:5000/deletereview/${review_id}`)
        .then((res) => 
        {
            if(res.status == 200)
            {
                const json = res.data;

                if(json.status == "success")
                {
                    alert ("Review Deleted Successfully")
                    setData(prev => prev.filter(item => item.review_id !== review_id));
                }
                else
                {
                    alert("Review Not Deleted ")
                }
            }
        })
        .catch((err) => {
            alert(err)
        })
    };

    useEffect(() => 
    {
        if (data.length > 0 && window.$) 
        {
            const table = window.$("#view_review_table");

            if (!window.$.fn.DataTable.isDataTable(table)) 
            {
                table.DataTable
                ({
                    ordering: true,
                    lengthMenu: [9],
                    dom: "lfrtip",
                });
            }
        }
    }, [data]);
    
    return (
        <>
            <div class="row">
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
                            <h2 id="Headings">View Reviews</h2>

                            <div style={{ overflowX: "auto", width: "100%" }}>
                                <table cellPadding={10} cellSpacing={10} id="view_review_table" className="table table-bordered table-striped table-hover">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Tour Id</th>
                                            <th>User Id</th>
                                            <th>Rating</th>
                                            <th>Message</th>
                                            <th>Created At</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            data.map((row) => {
                                                return (
                                                    <tr>
                                                        <td>{row.review_id}</td>
                                                        <td>{row.tour_id}</td>
                                                        <td>{row.user_id}</td>
                                                        <td>{row.rating}</td>
                                                        <td className="message-column">{row.review_text}</td>
                                                        <td>{new Date(row.created_at).toLocaleString("en-IN")}</td>
                                                        <td>
                                                            <button className="btn btn-danger" id="btn_delete"onClick={()=>handleDelete(row.review_id)}>Delete</button>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
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

export default Tour_Review;