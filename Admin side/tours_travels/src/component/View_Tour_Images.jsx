import React, { useState, useEffect } from "react"
import { useParams, useNavigate ,Link } from "react-router-dom";
import axios from "axios";
import Logo from "./Logo";
import Sidebar from "./SideBar";
import Username from "./Admin_User_name";
import "./CSS/Tour_Tables.css"
import "./CSS/Structure_Stylesheet.css"


function View_Tour_Images() {

    const [data, setData] = useState([]);

    useEffect(() => 
    {
        axios
            .get("http://localhost:5000/viewtourimage")
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

    

    const handleDelete = (image_id) => 
    {
        if (!window.confirm("Are you sure you want to delete this Image?")) 
        return;

        axios
        .delete(`http://localhost:5000/view-image/${image_id}`)
        .then((res) => 
        {
            if(res.status == 200)
            {
                const json = res.data;

                if(json.status == "success")
                {
                    alert ("Image Deleted Successfully")
                    setData(prev => prev.filter(item => item.image_id !== image_id));
                }
                else
                {
                    alert("Image Not Deleted ")
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
                            <h2 id="Headings">View Images</h2>

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
                                            <th>Tour_id</th>
                                            <th>Image</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {data.map((row) => {
                                            return (
                                                <tr>
                                                    <td>{row.img_id}</td>
                                                    <td>{row.tour_id}</td>
                                                    <td>
                                                        <img
                                                            src={`http://localhost:5000/uploads/Tour_Images/${row.image}`}
                                                            id="view_package_image"
                                                            alt=""
                                                        />
                                                    </td>


                                                    <td>
                                                        <button className="btn btn-danger" id="btn_delete"    onClick={() => handleDelete(row.img_id)}>Delete</button>
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

export default View_Tour_Images;
