import React , {useEffect,useState} from "react"
import { Link } from "react-router-dom";
import axios from "axios";
import Logo from "./Logo";
import Sidebar from "./SideBar";
import Username from "./Admin_User_name";
import "./CSS/Structure_Stylesheet.css"
import "./CSS/Tour_Tables.css"

function Tour_Booking_Confirm() {

    const [data, setData] = useState([]);

    useEffect(() => 
    {
        axios
            .get("http://localhost:5000/view_confirm_booking")
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
                const table = window.$("#view_table");
        
                if (!window.$.fn.DataTable.isDataTable(table)) 
                {
                table.DataTable({
                    searching: true,
                    ordering: true,
                    dom: "lBfrtip",
                    buttons: ["excel", "csv", "pdf"],
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
                            <h2 id="Headings">Confirmed Bookings</h2><br/>

                            <center >
                                <Link to="/tour-booking"id="Booking_Status">All Bookings</Link>
                                <Link to="/pending-bookings"id="Booking_Status">Pending Bookings</Link>
                                <Link to="/confirm-bookings"id="Booking_Status">Confirm Bookings</Link>
                                <Link to="/cancle-bookings"id="Booking_Status">Cancle Bookings</Link>
                            </center>


                            <table cellPadding={10} cellSpacing={10} id="view_table"className="table table-bordered  table-striped table-hover">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>User Id</th>
                                        <th>Tour Id</th>
                                        <th>Date Id</th>
                                        <th>Person</th>
                                        <th>Total Amount</th>
                                        <th>Booking Status</th>
                                        <th>Created At</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        data.map((row) =>
                                        {
                                            return (
                                            
                                            <tr>
                                                <td>{row.booking_id}</td>
                                                <td>{row.user_id}</td>
                                                <td>{row.tour_id}</td>
                                                <td>{row.date_id}</td>
                                                <td>{row.persons}</td>
                                                <td>{row.total_amount}</td>
                                                <td>{row.booking_status}</td>
                                                <td>{new Date(row.created_at).toLocaleString("en-IN")}</td>
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

export default Tour_Booking_Confirm;