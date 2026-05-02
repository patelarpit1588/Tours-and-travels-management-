import React , {useEffect,useState} from "react"
import { Link } from "react-router-dom";
import {useParams} from "react-router-dom"
import axios from "axios";
import Logo from "./Logo";
import Sidebar from "./SideBar";
import Username from "./Admin_User_name";
import "./CSS/Structure_Stylesheet.css"
import "./CSS/Tour_Tables.css"
import "./CSS/individual_booking_data_page.css"

function Tour_Passanger() {

    const {id} = useParams();
    const [data, setData] = useState([]);

    const [Bookdata, setBookingData] = useState({});
    const [payment_data , setpaymentdata] = useState([]);

    useEffect(() => 
    {
        axios
            .get(`http://localhost:5000/view_indiviual_booking/${id}`)
            .then((res) => 
            {
                if (res.status == 200) 
                {
                    const json = res.data
                    setBookingData(json[0])
                }
            })
            .catch((err) => 
            {
                console.log(err);
            })
    },[])

    useEffect(() => 
    {
        axios
            .get(`http://localhost:5000/view_indiviual_payment/${id}`)
            .then((res) => 
            {
                if (res.status == 200) 
                {
                    const json = res.data
                    setpaymentdata(json)
                }
            })
            .catch((err) => 
            {
                console.log(err);
            })
    },[])


    useEffect(() => 
    {
        axios
            .get(`http://localhost:5000/view_passanger/${id}`)
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
                        <div id="Form-container"><br/>
                            <center >
                                <Link to="/tour-booking"id="Booking_Status">Back</Link>
                            </center>

                            <h2 id="Headings">Booking Details</h2><br/>

                            <div className="row">
                                <div id="count_cards_1">
                                    <div id="card_details_1">
                                        <center>
                                            <img src="/Image/boy.gif" alt="My GIF" width="80" height="80"/>
                                            <p id="count_card_heading_1">Total Person</p>
                                            <p id="counting_1">{Bookdata.persons}</p>
                                        </center>

                                    </div>
                                </div>

                                <div id="count_cards_1">
                                    <div id="card_details_1">
                                            <center>
                                            <img src="/Image/user.gif" alt="My GIF" width="80" height="80"/>
                                            {/* <svg id="Count_Image" xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="#000000"><path d="M38-160v-94q0-35 18-63.5t50-42.5q73-32 131.5-46T358-420q62 0 120 14t131 46q32 14 50.5 42.5T678-254v94H38Zm700 0v-94q0-63-32-103.5T622-423q69 8 130 23.5t99 35.5q33 19 52 47t19 63v94H738ZM358-481q-66 0-108-42t-42-108q0-66 42-108t108-42q66 0 108 42t42 108q0 66-42 108t-108 42Zm360-150q0 66-42 108t-108 42q-11 0-24.5-1.5T519-488q24-25 36.5-61.5T568-631q0-45-12.5-79.5T519-774q11-3 24.5-5t24.5-2q66 0 108 42t42 108ZM98-220h520v-34q0-16-9.5-31T585-306q-72-32-121-43t-106-11q-57 0-106.5 11T130-306q-14 6-23 21t-9 31v34Zm260-321q39 0 64.5-25.5T448-631q0-39-25.5-64.5T358-721q-39 0-64.5 25.5T268-631q0 39 25.5 64.5T358-541Zm0 321Zm0-411Z"/></svg> */}
                                            <p id="count_card_heading_1">Active Person</p>
                                            <p id="counting_1">{Bookdata.active_person}</p>
                                        </center>
                                    </div>
                                </div>

                                <div id="count_cards_1">
                                    <div id="card_details_1">
                                        <center>
                                            <img src="/Image/cancel.gif" alt="My GIF" width="80" height="80"/>
                                            {/* <svg id="Count_Image" xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="#000000"><path d="M562-524h268v-186H562v186Zm135-37-105-79v-40l104 79 104-79v40l-103 79ZM60-120q-24 0-42-18T0-180v-600q0-24 18-42t42-18h840q24 0 42 18t18 42v600q0 24-18 42t-42 18H60Zm531-60h309v-600H60v600h7q44-69 112.5-109T329-329q81 0 149.5 40T591-180ZM329-400q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35ZM143-180h372q-35.61-42.27-84.3-65.64Q382-269 329-269t-101.5 23.5Q179-222 143-180Zm186-280q-25.5 0-42.75-17.25T269-520q0-25.5 17.25-42.75T329-580q25.5 0 42.75 17.25T389-520q0 25.5-17.25 42.75T329-460Zm151-20Z"/></svg> */}
                                            <p id="count_card_heading_1">Cancelled Person</p>
                                            <p id="counting_1">{Bookdata.cancelled_person}</p>
                                        </center>

                                    </div>
                                </div>

                                <div id="count_cards_1">
                                    <div id="card_details_1">
                                        <center>
                                            <img src="/Image/receipt.gif" alt="My GIF" width="80" height="80"/>
                                            {/* <svg id="Count_Image" xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="#000000"><path d="M540-420q-50 0-85-35t-35-85q0-50 35-85t85-35q50 0 85 35t35 85q0 50-35 85t-85 35ZM220-280q-24.75 0-42.37-17.63Q160-315.25 160-340v-400q0-24.75 17.63-42.38Q195.25-800 220-800h640q24.75 0 42.38 17.62Q920-764.75 920-740v400q0 24.75-17.62 42.37Q884.75-280 860-280H220Zm100-60h440q0-42 29-71t71-29v-200q-42 0-71-29t-29-71H320q0 42-29 71t-71 29v200q42 0 71 29t29 71Zm480 180H100q-24.75 0-42.37-17.63Q40-195.25 40-220v-460h60v460h700v60ZM220-340v-400 400Z"/></svg>  */}                                 
                                                <p id="count_card_heading_1">Paid Amount </p> 
                                            <p id="counting_1">₹{Bookdata.paid_amount}</p>
                                        </center>
                                    </div>
                                </div>

                                <div id="count_cards_1">
                                    <div id="card_details_1">
                                        <center>
                                            <img src="/Image/verified.gif" alt="My GIF" width="80" height="80"/>
                                            {/* <svg id="Count_Image" xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="#000000"><path d="M266.12-430q20.88 0 35.38-14.62 14.5-14.62 14.5-35.5 0-20.88-14.62-35.38-14.62-14.5-35.5-14.5-20.88 0-35.38 14.62-14.5 14.62-14.5 35.5 0 20.88 14.62 35.38 14.62 14.5 35.5 14.5Zm214 0q20.88 0 35.38-14.62 14.5-14.62 14.5-35.5 0-20.88-14.62-35.38-14.62-14.5-35.5-14.5-20.88 0-35.38 14.62-14.5 14.62-14.5 35.5 0 20.88 14.62 35.38 14.62 14.5 35.5 14.5Zm213 0q20.88 0 35.38-14.62 14.5-14.62 14.5-35.5 0-20.88-14.62-35.38-14.62-14.5-35.5-14.5-20.88 0-35.38 14.62-14.5 14.62-14.5 35.5 0 20.88 14.62 35.38 14.62 14.5 35.5 14.5ZM480.27-80q-82.74 0-155.5-31.5Q252-143 197.5-197.5t-86-127.34Q80-397.68 80-480.5t31.5-155.66Q143-709 197.5-763t127.34-85.5Q397.68-880 480.5-880t155.66 31.5Q709-817 763-763t85.5 127Q880-563 880-480.27q0 82.74-31.5 155.5Q817-252 763-197.68q-54 54.31-127 86Q563-80 480.27-80Zm.23-60Q622-140 721-239.5t99-241Q820-622 721.19-721T480-820q-141 0-240.5 98.81T140-480q0 141 99.5 240.5t241 99.5Zm-.5-340Z"/></svg> */}
                                            <p id="count_card_heading_1">Active Amount</p>
                                            <p id="counting_1">₹{Bookdata.active_amount}</p>
                                        </center>
                                    </div>
                                </div>

                                <div id="count_cards_1">
                                    <div id="card_details_1">
                                        <center>
                                            <img src="/Image/more.gif" alt="My GIF" width="80" height="80"/>   
                                            {/* <svg id="Count_Image" xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="#000000"><path d="m421-298 283-283-46-45-237 237-120-120-45 45 165 166Zm59 218q-82 0-155-31.5t-127.5-86Q143-252 111.5-325T80-480q0-83 31.5-156t86-127Q252-817 325-848.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 82-31.5 155T763-197.5q-54 54.5-127 86T480-80Zm0-60q142 0 241-99.5T820-480q0-142-99-241t-241-99q-141 0-240.5 99T140-480q0 141 99.5 240.5T480-140Zm0-340Z"/></svg> */}
                                            <p id="count_card_heading_1">Due Amount</p>
                                            <p id="counting_1">₹{Bookdata.due_amount}</p>
                                        </center>
                                    </div>
                                </div>

                                <div id="count_cards_1">
                                    <div id="card_details_1">
                                        <center>
                                            <img src="/Image/economy.gif" alt="My GIF" width="80" height="80"/>
                                            {/* <svg id="Count_Image" xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="#000000"><path d="m330-288 150-150 150 150 42-42-150-150 150-150-42-42-150 150-150-150-42 42 150 150-150 150 42 42ZM480-80q-82 0-155-31.5t-127.5-86Q143-252 111.5-325T80-480q0-83 31.5-156t86-127Q252-817 325-848.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 82-31.5 155T763-197.5q-54 54.5-127 86T480-80Zm0-60q142 0 241-99.5T820-480q0-142-99-241t-241-99q-141 0-240.5 99T140-480q0 141 99.5 240.5T480-140Zm0-340Z"/></svg> */}
                                            <p id="count_card_heading_1">Refund Amount</p>
                                            <p id="counting_1">₹{Bookdata.refund_amount}</p>
                                        </center>
                                    </div>
                                </div>

                                <div id="count_cards_1">
                                    <div id="card_details_1">
                                        <center>
                                            <img src="/Image/non-refundable.gif" alt="My GIF" width="80" height="80"/>   
                                            {/* <svg id="Count_Image" xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="#000000"><path d="M290-80q-53.86 0-91.93-38.07Q160-156.14 160-210v-540q0-53.86 38.07-91.93Q236.14-880 290-880h510v600q-26 0-43 21t-17 49q0 28 17 49t43 21v60H290Zm-70-240q15-10 32.5-15t37.5-5h30v-480h-30q-29.17 0-49.58 20.42Q220-779.17 220-750v430Zm160-20h360v-480H380v480Zm-160 20v-500 500Zm69.54 180H699q-9-15-14-33t-5-37q0-20 5-37.5t15-32.5H289.61q-28.61 0-49.11 20.42Q220-239.17 220-210q0 29 20.5 49.5t49.04 20.5Z"/></svg> */}
                                            <p id="count_card_heading_1">Total Cancellation Charge</p>
                                            <p id="counting_1">₹{Bookdata.cancellation_charge}</p>
                                        </center>

                                    </div>
                                </div>
                            </div>

                            <h2 id="Headings">Passanger Details</h2><br/>


                            <table cellPadding={10} cellSpacing={10} id="view_table"className="table table-bordered  table-striped table-hover">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Name</th>
                                        <th>Age</th>
                                        <th>Gender</th>
                                        <th>Passanger Status</th>
                                        <th>Refund Status</th>
                                        <th>Refund Processed Date</th>            
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        data.map((row) =>
                                        {
                                            return (
                                            
                                            <tr>
                                                <td>{row.passanger_id}</td>
                                                <td>{row.name}</td>
                                                <td>{row.age}</td>
                                                <td>{row.gender}</td>
                                                <td>{row.passanger_status}</td>
                                                <td>{row.refund_status}</td>
                                                <td>{(row.cancle_date)}</td>
                                            </tr>
                                        )}
                                    )}
                                </tbody>
                            </table>

                            <h2 id="Headings">Payment Details</h2><br/>

                            <table cellPadding={10} cellSpacing={10} id="view_table"className="table table-bordered  table-striped table-hover">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Payment Mode</th>
                                        <th>Payment Amount</th>
                                        <th>Payment Date</th>            
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        payment_data.map((row) =>
                                        {
                                            return (
                                            
                                            <tr>
                                                <td>{row.payment_id}</td>
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

export default Tour_Passanger;