import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./CSS/Cancellation.css"

function Tour_Refunds() 
{
    const { id } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [summary_data, set_summary_data] = useState({total_amount: 0, paid_amount: 0,due_amount: 0});
    const [selectedIds, setSelectedIds] = useState([]);

    const totalPassengers = Number(summary_data.persons) || 0;
    const totalAmount = Number(summary_data.total_amount) || 0;
    const paidAmount = Number(summary_data.paid_amount) || 0;
    const alreadyRefunded = Number(summary_data.refund_amount) || 0;

    const isSeatFull = Number(summary_data.available_seats) === 0;

    const isFullPayment = paidAmount >= totalAmount;


    const per_person_amt = totalPassengers > 0 ? paidAmount / totalPassengers : 0;

    let per_person_refund_amount = 0;

    if (!isFullPayment) 
    {
        if (isSeatFull) 
        {
            // Case 1 → 100%
            per_person_refund_amount = Math.round(per_person_amt * 0.80);
        } 
        else 
        {
            // Case 2 → 80%
            per_person_refund_amount = Math.round(per_person_amt * 0.80);
        }
    } 
    else 
    {
        // Full payment → 80%
        per_person_refund_amount = Math.round(per_person_amt * 0.80);
    }

    const calculated_refund = per_person_refund_amount * selectedIds.length;

    const max_refundable = paidAmount - alreadyRefunded;

    const total_refund_amount = selectedIds.length > 0 ? Math.min( calculated_refund, max_refundable > 0 ? max_refundable : 0 ) : 0;

    let cancellation_charge_Amount = 0;

    if (!isFullPayment && isSeatFull) 
    {
        // 🔥 Seat full → no penalty
        cancellation_charge_Amount = Math.round(per_person_amt * 0.20);
    } 
    else 
    {
        // Normal case
        cancellation_charge_Amount = Math.round(per_person_amt * 0.20);
    }
    const total_cancellation_Charge = cancellation_charge_Amount * selectedIds.length;

    const [sendRequest, setSendRequest] = useState(false);

    useEffect(() => 
    {
        axios
        .get(`http://localhost:4000/view_my_booking/${id}`, 
            {
                headers:   
                {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            }) 
        .then((res) => set_summary_data(res.data[0]))
        .catch((err) => console.log(err));
    }, [id]);

    useEffect(() => 
    {
        axios
            .get(`http://localhost:4000/view_passanger/${id}`,
            {
                headers: 
                {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            })
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
    },[id])

    useEffect(() => {
        if (!isFullPayment && data.length > 0) {
            const activePassengers = data
                .filter(
                    (row) => row.passanger_status !== "Cancelled"
                )
                .map((row) => row.passanger_id);

            setSelectedIds(activePassengers);
        }
    }, [data, isFullPayment]);

    const handleCheckbox = (passengerId) => 
    {

    if (selectedIds.includes(passengerId)) 
    {
        setSelectedIds(selectedIds.filter(id => id !== passengerId));
    } 
    else
    {
        setSelectedIds([...selectedIds, passengerId]);
    }
};

useEffect(() => {

    if (!sendRequest) return;
    
    axios.post(
        `http://localhost:4000/send_refund_request/${id}`,
        {
            passenger_ids: selectedIds,
        },
        {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        }
    )
    .then((res) => {

        alert("Refund Request Sent To Admin");
        navigate('/my-bookings')

        setSelectedIds([]);
        setSendRequest(false);

    })
    .catch((err) => {

        console.log(err);
        setSendRequest(false);

    });

}, [sendRequest]);


    
    return (
        <>
            <div className="container" id="Main_Cancle_Div">
                    <div className="row" id="cancle_summery_card_div">
                        <div id="cancle_summery_card">
                            <label id="Payment_Labels_1">Paid Amount</label><br />
                            <label id="Payment_Count_1">{summary_data.paid_amount}</label> 
                        </div>
                        <div id="cancle_summery_card">
                            <label id="Payment_Labels_1">Active Amount</label><br />
                            <label id="Payment_Count_1">{summary_data.active_amount}</label> 
                        </div>
                        <div id="cancle_summery_card">
                            <label id="Payment_Labels_1">Refund Amount</label><br />
                            <label id="Payment_Count_1">{summary_data.refund_amount}</label>
                        </div>
                        <div id="cancle_summery_card">
                            <label id="Payment_Labels_1">Cancellation Charge</label><br />
                            <label id="Payment_Count_1">{summary_data.cancellation_charge}</label>
                        </div>
                    </div>

                    <div className="row" id="cancle_warning_div">
                        <div className="col-sm-1">
                            <img src="/Image/warning.gif" id="warning_message"></img>
                        </div>
                        <div className="col-sm-11">
                            <p id="warn-message">
                                {
                                    !isFullPayment && isSeatFull ? "Seats are full. Full booking will be cancelled and 80% refund will be provided."
                                    : !isFullPayment ? "Partial payment detected. Full booking cancellation only. 80% refund will be provided." : "80% refund applicable on cancellation."
                                }
                            </p>                   
                        </div>
                    </div>

                    <div className="row" id="cancle_main_div">

                        <div id="passanger_history_div">
                            <table cellPadding={10} cellSpacing={10} id="view_my_table" className="table table-bordered table-striped">
                                <thead>
                                    <tr>
                                        <th></th>
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
                                        data.map((row) => {
                                            return (
                                                <tr>
                                    <td> <input type="checkbox" checked={selectedIds.includes( row.passanger_id )} onChange={() => handleCheckbox( row.passanger_id )}disabled={(!isFullPayment) || row.passanger_status === "Cancelled" ||  row.refund_status === "Pending" || row.refund_status === "Rejected"} /> </td>                                                    
                                                    <td>{row.name}</td>
                                                    <td>{row.age}</td>
                                                    <td>{row.gender}</td>
                                                    <td>{row.passanger_status}</td>
                                                    <td>{row.refund_status}</td>
                                                    <td>{(row.cancle_date)}</td>
                                                </tr>
                                            )
                                        }
                                        )}
                                </tbody>
                            </table>

                            
                            <div className="col-sm-12"id="refund_policy_div">
                                <div className="row">
                                    <h2 id="policy_heading">Refund & Cancellation Policy :</h2>
                                    <h2 id="policy_content">1. Refunds are calculated strictly on the Paid Amount.</h2>
                                    <h2 id="policy_content">2. Upon full payment, passengers may be cancelled individually or the entire booking may be cancelled.</h2>
                                    <h2 id="policy_content">3. In case of partial payment, individual passenger cancellation is not permitted; only full booking cancellation is allowed.</h2>
                                    <h2 id="policy_content">4. 80% of the Paid Amount will be refunded, and 20% will be deducted as a cancellation charge.</h2>
                                    <h2 id="policy_content">5. If the booking is under partial payment and seats become fully booked, full booking cancellation will be allowed with 80% refund and <br/>20% cancellation charges.</h2>
                                    <h2 id="policy_content">6. If the tour is cancelled by the company, a 100% refund will be provided.</h2>
                                    <h2 id="policy_content">7. Refund requests are subject to administrative approval.</h2>
                                    <h2 id="policy_content">8. Once approved, the refund amount will be credited within 7 working days.</h2>
                                    <h2 id="policy_content">9. While a refund request is pending, a new request cannot be submitted.</h2></div>
                            </div>
                        </div>
                        

                            <div className="col-3" id="cancle_div">

                            <div className="row">
                                <div className="col-12">
                                    <center><label id="Cancle_pay_Labels_1">Refund Amount Summary</label></center>
                                </div>
                            </div><hr/>
                                        
                            <div className="row">
                                <div className="col-8">
                                    <label id="Cancle_pay_Labels_header">Booking Deatils</label><br />
                                    <label id="Cancle_pay_Labels">Total Paid Amount</label><br />
                                    <label id="Cancle_pay_Labels">Total Person</label><br />
                                    <label id="Cancle_pay_Labels">Per Person Paid Amount</label><br />
                                </div>
                                
                                <div className="col-4 text-end">
                                    <br/><label id="Cancle_pay_Count_2">₹{summary_data.paid_amount}</label><br/>
                                    <label id="Cancle_pay_Count_2">÷ {totalPassengers}</label><br/>
                                    <label id="Cancle_pay_Count_2">₹{Math.round(per_person_amt)}</label><br/>
                                </div>
                            </div><hr/>

                            <div className="row">

                                <div className="col-8">
                                    <label id="Cancle_pay_Labels_header">
                                    {
                                        (!isFullPayment && isSeatFull)? "Refund Details ( 80% )" : "Refund Details ( 80% )"
                                    }
                                    </label>
                                    <label id="Cancle_pay_Labels">Refund Per Person </label>
                                    <label id="Cancle_pay_Labels">Selected Person For Cancellation</label>
                                    <label id="Cancle_pay_Labels">Total Maximum Refund</label><br />
                                </div>

                                <div className="col-4 text-end">
                                    <br/><label id="Cancle_pay_Count_2">₹{Math.round(per_person_refund_amount)}</label><br/>
                                    <label id="Cancle_pay_Count_2">x {selectedIds.length}</label><br/>
                                    <label id="Cancle_pay_Count_2">₹{Math.round(total_refund_amount)}</label><br/>
                                </div>
                            </div><hr/>


                            <div className="row">
                                <div className="col-8">
                                    <label id="Cancle_pay_Labels_header">
                                        {
                                        (!isFullPayment && isSeatFull) ? "Cancellation Charge Details ( 20 % )" : "Cancellation Charge Details ( 20 % )"
                                    }</label><br />
                                    <label id="Cancle_pay_Labels">Cancellation Charge Per Person </label><br />
                                    <label id="Cancle_pay_Labels">Selected Person For Cancellation</label><br />
                                    <label id="Cancle_pay_Labels">Total Cancellation Charge</label><br />
                                </div>

                                <div className="col-4 text-end">
                                    <br/><label id="Cancle_pay_Count_2">₹{Math.round(cancellation_charge_Amount)}</label><br/>
                                    <label id="Cancle_pay_Count_2">x {selectedIds.length}</label><br/>
                                    <label id="Cancle_pay_Count_2">₹{Math.round(total_cancellation_Charge)}</label><br/>
                                </div>
                            </div><hr/>

                            
                            <div className="row">
                                <div className="col-6">
                                    <label id="Grand">Total Refund Amount</label><br />  
                                </div> 

                                <div className="col-6 text-end">
                                    <label id="Grand_Refund_Amount">₹{total_refund_amount}</label><br/>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-sm-12">
                                    <button className="btn btn-danger" disabled={selectedIds.length === 0} id="cancle_request_btn"
                                    onClick={() => 
                                    {
                                        if (summary_data.paid_amount <= 0) 
                                        {
                                            alert("Please Complete Payment Before Requesting Refund.");
                                            return;
                                        }
                                        if (summary_data.refund_status == "Pending") 
                                        {
                                            alert("A Refund Request Is Already Pending For This Booking. Please Wait For Admin Approval Before Submitting Another Request.");
                                            return;
                                        }
                                        setSendRequest(true); 
                                    }} > Send Refund Request </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </>
    );
};

export default Tour_Refunds;

// “Agar hum 100% refund allow kar dete, to user intentionally partial payment karke
// wait kar sakta hai ki seats full ho jaaye aur bina kisi penalty ke cancel kar de.”

// “Isse system me unfair advantage milta aur genuine users ke liye problem create
// hoti.”

// “Isliye humne 20% cancellation charge rakha hai, taaki commitment maintain rahe
// aur misuse na ho.”
