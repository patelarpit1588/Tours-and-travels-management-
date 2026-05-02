import React, { useEffect, useRef, useState } from "react"
import { useParams, Link } from "react-router-dom"
import DatePicker, { DateObject } from "react-multi-date-picker";

import axios from "axios"
import Logo from "./Logo";
import Sidebar from "./SideBar";
import Username from "./Admin_User_name";
import "./CSS/Structure_Stylesheet.css"
import "./CSS/Tour_Package.css"

function Edit_Tour_Package_Seats() {

    const { id } = useParams();
    const [data, setData] = useState([])
    const [maxSeats, setMaxSeats] = useState("");
    const [confirmSeats, setConfirmSeats] = useState(0);

    useEffect(() => 
    {
        axios
            .get(`http://localhost:5000/pacakges_seat_update/${id}`)
            .then((res) => 
            {
                setData(res.data[0].tour_id.toString())
                setMaxSeats(res.data[0].max_seats.toString()); 
                setConfirmSeats(res.data[0].confirm_seats);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [id]);

    const handleclick = (e) => 
    {
        if (Number(maxSeats) < confirmSeats) 
        {
            alert(`The seat capacity cannot be set lower than the current booked seats ( ${confirmSeats} ). Please select a higher value.`);            
            return;
        }

        e.preventDefault();
        axios.put(`http://localhost:5000/update-max-person/${id}`,
            {
                max_person: maxSeats
            })
            .then((res) => 
            { 
                alert("Seats Updated Successfully")
            })
            .catch((err) => 
            {
                console.log(err.response?.data);
                alert(err.response?.data?.message || "Server Error");
            });
    }
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

                            <center>
                                <div className="btn-group" id="Gruop_Buttons">
                                    <Link to={`/package_seats/${data}`} id="view_Package_Link">Back</Link>
                                </div>
                            </center>

                            <h2 id="Page_header">Edit Seats</h2> <br />
                            <form>
                                <div className="row">

                    

                                    <div className="col-sm-6">
                                        <label htmlFor="">Max.Persons :</label>
                                        <select className="form-control" value={maxSeats} onChange={(e) => setMaxSeats(e.target.value)}>
                                            <option value="0">0</option>
                                            <option value="5">5</option>
                                            <option value="10">10</option>
                                            <option value="15">15</option>
                                            <option value="20">20</option>
                                            <option value="25">25</option>
                                            <option value="30">30</option>
                                            <option value="35">35</option>
                                            <option value="40">40</option>
                                            <option value="45">45</option>
                                            <option value="50">50</option>
                                            <option value="55">55</option>
                                            <option value="60">60</option>
                                            <option value="65">65</option>
                                            <option value="70">70</option>
                                            <option value="75">75</option>
                                            <option value="80">80</option>
                                            <option value="85">85</option>
                                            <option value="90">90</option>
                                            <option value="95">95</option>
                                            <option value="100">100</option>
                                        </select><br />
                                    </div><br/>

                                    <button type="button" className="btn btn-primary btn-lg" id="Add_Package_btn" onClick={handleclick}>Update Seats</button>

                                </div>
                                
                            </form>

                        </div>
                    </div>
                </div><br />
            </div>
        </>
    )
}
export default Edit_Tour_Package_Seats;