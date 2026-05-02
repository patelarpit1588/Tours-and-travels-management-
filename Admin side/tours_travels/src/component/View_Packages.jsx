import React, { useState, useEffect } from "react"
import { useParams, useNavigate , Link } from "react-router-dom";
import axios from "axios";
import Logo from "./Logo";
import Sidebar from "./SideBar";
import Username from "./Admin_User_name";
import "./CSS/Tour_Tables.css"
import "./CSS/Structure_Stylesheet.css"


function View_Packages() {

    const [data, setData] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:5000/viewpackages")
            .then((res) => 
            {
                if (res.status === 200) 
                {
                    const json = res.data;
                    setData(json);
                }
            })
            .catch((err) => 
            {
                console.log(err);
            });
    }, []);

    

    const handleDelete = (tour_id) => 
    {
        if (!window.confirm("Are you sure you want to delete this package?")) 
        return;

        axios
        .delete(`http://localhost:5000/viewpackages/${tour_id}`)
        .then((res) => 
        {
            if(res.status == 200)
            {
                const json = res.data;

                if(json.status == "success")
                {
                    alert ("Package Deleted Successfully")
                    setData(prev => prev.filter(item => item.tour_id !== tour_id));
                }
                else
                {
                    alert(json.message)
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
        const table = window.$("#view_package_table");

        if (!window.$.fn.DataTable.isDataTable(table)) 
        {
        table.DataTable({
            searching: true,
            ordering: true,
            dom: "lBfrtip",
            buttons: ["excel", "csv"],

            lengthMenu: 
            [
                [5, 10, 15, 20, 25],
                [5, 10, 15, 20, 25]
            ],
            pageLength: 5   // default value
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

                {/* YAHAN overflowX hata diya - galat jagah lag raha tha */}
                <div className="col-sm-10" id="Traveller_details">

                    <div className="row">
                        <div id="Form-container">
                            <div style={{textAlign:"center"}}>
                                <div className="btn-group" id="Gruop_Buttons">
                                    <Link to={"/tour-package"} id="add_Package_Link">Add Package</Link>
                                    <Link to={"/view-package"} id="view_Package_Link">View Package</Link>
                                </div>
                            </div>

                            <h2 id="Headings">View Package</h2>

                            <div style={{ overflowX: "auto", width: "100%" }}>
                                <table
                                    cellPadding={10}
                                    cellSpacing={10}
                                    id="view_package_table"
                                    className="table table-bordered table-striped table-hover"
                                >
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Title</th>
                                            <th>Description</th>
                                            <th>Location</th>
                                            <th>Duration</th>
                                            <th>Price</th>
                                            <th>Main Image</th>
                                            <th>Added At</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {data.map((row) => {
                                            return (
                                                <tr>
                                                    <td>{row.tour_id}</td>
                                                    <td>{row.title}</td>
                                                    <td className="message-column">{row.description}</td>
                                                    <td>{row.location}</td>
                                                    <td>{row.duration}</td>
                                                    <td>{row.price}</td>
                                                    <td>
                                                        <img
                                                            src={`http://localhost:5000/uploads/pakage/${row.main_image}`}
                                                            id="view_package_image"
                                                            alt=""
                                                        />
                                                    </td>

                                                    <td>{new Date(row.created_at).toLocaleString("en-IN")}<br /><br/></td>

                                                    <td className="action-column">
                                                        <Link to={`/package_seats/${row.tour_id}`} className="btn btn-success btn-sm" id="btn_add_image"style={{padding:"8px"}}>Seats Details</Link>
                                                        <Link to={`/tour-images/${row.tour_id}`} className="btn btn-primary btn-sm" id="btn_add_image"style={{padding:"8px"}}>Add Images</Link>
                                                        <Link to={`/edit-package/${row.tour_id}`} className="btn btn-warning" id="btn_edit">Edit</Link>
                                                        <button className="btn btn-danger" id="btn_delete"    onClick={() => handleDelete(row.tour_id)}>Delete</button>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            <br />
        </>
    );
}

export default View_Packages;
