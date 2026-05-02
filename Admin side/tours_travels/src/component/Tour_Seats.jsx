import React , {useEffect,useState} from "react"
import { Link } from "react-router-dom";
import {useParams} from "react-router-dom"
import axios from "axios";
import Logo from "./Logo";
import Sidebar from "./SideBar";
import Username from "./Admin_User_name";
import "./CSS/Structure_Stylesheet.css"
import "./CSS/Tour_Tables.css"

function Tour_seats() {

    const {id} = useParams();
    const [data, setData] = useState([]);

    useEffect(() => 
    {
        axios
            .get(`http://localhost:5000/pacakges_seats/${id}`)
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
                            <h2 id="Headings">Seats Details</h2><br/>

                            <center >
                                <Link to="/view-package"id="Booking_Status">Back</Link>
                            </center><br/>


                            <table cellPadding={10} cellSpacing={10} id="view_table"className="table table-bordered  table-striped table-hover">
                                <thead>
                                    <tr>
                                        <th>Travel Date </th>
                                        <th>Maximum Seats</th>
                                        <th>Confirmed Seats </th>
                                        <th>Available Seats </th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        data.map((row) =>
                                        {
                                            return (
                                            
                                            <tr>
                                                <td>{row.start_date.split("T")[0].split("-").reverse().join("-")}</td>
                                                <td>{row.max_seats}</td>
                                                <td>{row.confirm_seats}</td>
                                                <td>{row.available_seats}</td>
                                                <td>{row.package_seats_status}</td>
                                                <td className="action-column">
                                                    <Link to={`/edit-package_seats/${row.date_id}`} className="btn btn-success btn-sm" id="btn_add_image"style={{padding:"8px"}}>Update Seats </Link>
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

export default Tour_seats;