import React, { useEffect, useState } from "react"
import axios from "axios";
import Logo from "./Logo";
import Sidebar from "./SideBar";
import Username from "./Admin_User_name";
import "./CSS/Tour_Tables.css"
import "./CSS/Structure_Stylesheet.css"



function Tour_Users(){
    const [data,setData] = useState([])

    useEffect (() =>
    {
        axios
        .get("http://localhost:5000/viewusers")
        .then((res) =>
        {
            if(res.status == 200)
            {
                const json = res.data
                setData(json)
            }
        })
        .catch((err)=>
            console.log(err)
        )
    },[])
    
    const handleDelete = (user_id) => 
    {
        if (!window.confirm("Are you sure you want to Remove this User?")) 
        return;

        axios
        .delete(`http://localhost:5000/deleteuser/${user_id}`)
        .then((res) => 
        {
            if(res.status == 200)
            {
                const json = res.data;

                if(json.status == "success")
                {
                    alert ("User Remove Successfully")
                    setData(prev => prev.filter(item => item.user_id !== user_id));
                }
                else
                {
                    alert("User Not Deleted ")
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
            const table = window.$("#view_table");

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
                <div className="col-sm-10"id="Traveller_details">
                    <div className="row" >
                        <div id="Form-container">
                            <h2 id="Headings">View Users</h2>

                            <table cellPadding={10} cellSpacing={10} id="view_table"className="table table-bordered table-striped table-hover">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Username</th>
                                        <th>Email Id</th>
                                        <th>Contact No</th>
                                        <th>Registration At</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        data.map((row) =>
                                        {
                                            return (
                                            
                                            <tr>
                                                <td>{row.user_id}</td>
                                                <td>{row.username}</td>
                                                <td>{row.email}</td>
                                                <td>{row.contact_no}</td>
                                                <td>{new Date(row.registration_datetime).toLocaleString("en-IN")}</td>
                                                <td>
                                                    <button onClick={()=>handleDelete(row.user_id)}className="btn btn-danger"id="btn_edit">Delete</button>
                                                </td>
                                            </tr>
                                        )}
                                    )}    
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div><br />
        </>
    )
}

export default Tour_Users;