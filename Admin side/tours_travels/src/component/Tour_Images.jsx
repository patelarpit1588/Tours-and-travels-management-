import React, { useRef, useState } from "react"
import { useParams, useNavigate , Link } from "react-router-dom";
import axios from "axios";
import Logo from "./Logo";
import Sidebar from "./SideBar";
import Username from "./Admin_User_name";
import "./CSS/Structure_Stylesheet.css"
import "./CSS/Tour_Images.css"


function Tour_Images()
{
    const { id } = useParams();
    const tourid = useRef()
    const [file,Setfile] = useState([])
    const [preview,setPreview] = useState(null);
    

    const handleClick = (e) =>
    {
        e.preventDefault();

        let tour_id = tourid.current.value
            
        const formdata =new FormData();
        formdata.append ("tourid",tour_id)
        for (let i = 0; i < file.length; i++) 
        {
            formdata.append("tourimg", file[i]);
        }

        axios
        .post("http://localhost:5000/addtourimage" , formdata ,
        {
            headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => 
        {
            if(res.status == 200)
            {
                const json = res.data;

                if(json.status == "success")
                {
                    alert ("Image Added Successfully")
                }
                else
                {
                    alert("Image Not Added")
                }
            }
        })
        .catch((err) => {
            alert(err)
        })
    }

    const handleImage = (e) => 
    {
        const files = Array.from(e.target.files);  
        Setfile(files);

        const previews = files.map((file) => URL.createObjectURL(file));
        setPreview(previews);
    };



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

                            <center>
                                <div class="btn-group"id="Gruop_Buttons">
                                    <Link to={"/view-package"}id="add_Package_Link">Back</Link>
                                    <Link to={"/view-images"}id="view_Package_Link">View Images</Link>
                                </div> 
                            </center>

                            <h2 id="Page_header">Add Tour Images</h2> <br />

                            <div className="row">
                                <div className="col-sm-3">
                                    <label htmlFor="">Tour Id:</label>
                                    <input type="text" className="form-control"ref={tourid} value={id} disabled/>
                                </div>

                                <div className="col-sm-4">
                                    <label htmlFor="">Images :</label>
                                    <input type="file"onChange={handleImage} className="form-control" multiple />
                                </div>
                            
                                <div className="col-sm-2">
                                    <br />
                                    <button className="btn btn-primary"id="Add_Images"onClick={handleClick}>Add Images</button>
                                </div>

                            </div>

                            <div className="row">
                                <div className="col-sm-12"id="Preview_Images">
                                {preview && preview.map((img) => (
                                    <img src={img} />
                                ))}                                
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div><br />
        </>
    )
}

export default Tour_Images;