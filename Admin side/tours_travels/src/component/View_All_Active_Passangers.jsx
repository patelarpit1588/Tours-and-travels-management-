import React , {useEffect,useState} from "react"
import { Link } from "react-router-dom";
import {useParams} from "react-router-dom"
import axios from "axios";
import Logo from "./Logo";
import Sidebar from "./SideBar";
import Username from "./Admin_User_name";
import "./CSS/Structure_Stylesheet.css"
import "./CSS/Tour_Tables.css"

function Tour_All_Active_Passanger() {

    const {id} = useParams();
    const [data, setData] = useState([]);

    useEffect(() => 
    {
        axios
            .get(`http://localhost:5000/view_all_active_passanger`)
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
                    searchPanes: 
                    {
                        initCollapsed: true, 
                    },
                    columnDefs: 
                    [
                        {
                            searchPanes: { show: true },
                        }
                    ]
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
                            <h2 id="Headings">All Active Passanger Details</h2><br/>

                            <center>
                                <Link to="/all-passanger"id="Booking_Status">All Passanger </Link>
                                <Link to="/all-active-passanger"id="Booking_Status">Active Passanger </Link>
                                <Link to="/all-cancelled-passanger"id="Booking_Status">Cancelled Passanger</Link>
                            </center>


                            <table cellPadding={10} cellSpacing={10} id="view_table"className="table table-bordered  table-striped table-hover">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Booking Id</th> 
                                        <th>Name</th>
                                        <th>Age</th>
                                        <th>Gender</th>
                                        <th>Passanger Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        data.map((row) =>
                                        {
                                            return (
                                            
                                            <tr>
                                                <td>{row.passanger_id}</td>
                                                <td>{row.booking_id}</td>
                                                <td>{row.name}</td>
                                                <td>{row.age}</td>
                                                <td>{row.gender}</td>
                                                <td>{row.passanger_status}</td>
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

export default Tour_All_Active_Passanger;