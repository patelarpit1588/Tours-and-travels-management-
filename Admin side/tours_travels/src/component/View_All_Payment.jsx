import React , {useEffect,useState} from "react"
import { Link } from "react-router-dom";
import {useParams} from "react-router-dom"
import axios from "axios";
import Logo from "./Logo";
import Sidebar from "./SideBar";
import Username from "./Admin_User_name";
import "./CSS/Structure_Stylesheet.css"
import "./CSS/Tour_Tables.css"

function Tour_All_Payments() {

    const {id} = useParams();
    const [data, setData] = useState([]);

    useEffect(() => 
    {
        axios
            .get(`http://localhost:5000/view_all_payment`)
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
                            <h2 id="Headings">All Payment Details</h2><br/>

                            <table cellPadding={10} cellSpacing={10} id="view_table"className="table table-bordered  table-striped table-hover">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Booking Id</th>
                                        <th>User Id</th>
                                        <th>User Name</th>
                                        <th>Payment Mode</th>
                                        <th>Amount</th>
                                        <th>Payment Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        data.map((row) =>
                                        {
                                            return (
                                            
                                            <tr>
                                                <td>PAY-{row.payment_id}</td>
                                                <td>{row.booking_id}</td>
                                                <td>{row.user_id}</td>
                                                <td>{row.username}</td>
                                                <td>{row.payment_mode}</td>
                                                <td>{row.amount}</td>
                                                <td>{new Date(row.payment_date).toLocaleString("en-IN")}</td>
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

export default Tour_All_Payments;