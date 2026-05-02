import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./CSS/Payment.css"

function Tour_Payment() {
    const { id } = useParams();
    const navigate = useNavigate();

    const pay_mode = useRef();
    const pay_amount = useRef();
    const [data, setData] = useState([]);
    const [summary_data, set_summary_data] = useState({total_amount: 0, paid_amount: 0,due_amount: 0});
    const isSeatFull = Number(summary_data.available_seats) === 0;
    const isFullPayment = summary_data.paid_amount >= summary_data.total_amount;

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
            .get(`http://localhost:4000/view_my_payment_history/${id}`,
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

    const handleClick = () =>
    {
        const amount = Number(pay_amount.current.value)
        const mode = pay_mode.current.value

        const formdata = new FormData()
        formdata.append("payment_mode" , mode)
        formdata.append("payment_amount" , amount)

        if (!isFullPayment && isSeatFull) 
        {
            alert("Seats Are No Longer Available. You Cannot Complete Payment. Please Submit A Refund Request To Receive A Refund. [ 80% ]");
            return;
        }
        if(!mode)
        {
            alert("Please Select Payment Mode")
            return;
        }
        if(amount == "" || amount <= 0)
        {
            alert("Please Enter The Valid Amount")
            return;
        }
        if ( summary_data.booking_status === "Cancelled" && summary_data.payment_status === "Refund Approved" ) 
        {
            alert("This booking has been cancelled and refund has already been processed. You cannot make payment.");
            return;
        }
        if ( summary_data.due_amount <= 0   ) 
        {
            alert("Your Payment Is Already Completed.");
            return;
        }   
        if (amount > summary_data.due_amount) 
        {
            alert("You Cannot Pay More Than The Due Amount.");
            return;
        }
        if (summary_data.available_seats < summary_data.persons) 
        {
            alert( `You have booked ${summary_data.persons} passenger(s), but currently only ${summary_data.available_seats} seat(s) are available. Therefore, you cannot proceed with the payment. If you have already made a payment, you may request an 80% refund.` );
            return;
        }
        axios
        .post(`http://localhost:4000/pay_payment/${id}`,formdata,
        {
            headers: 
            {
                Authorization: "Bearer " + localStorage.getItem("token"),
                "Content-Type": "multipart/form-data"
            }
        })
        .then((res) => 
            {
                if (res.status == 200) 
                {
                    const json = res.data;

                    if (json.status === "failed")
                    {
                        alert(json.message);
                        return;
                    }

                    if (json.status == "success") 
                    {
                        alert("Your Payment Has Been Successfully")
                        navigate("/my-bookings")
                    }
                }
            })
            .catch((err) => 
            {
                console.log(err);
            })        
    }
    return (
        <>
        <div id="background_123">
            <div className="container" id="Main_Payment_Div">
                    <div className="row" id="payment_summery_card_div">
                        <div className="col-3" id="payment_summery_card">
                            <label id="Payment_Labels">Total Amount</label><br />
                            <label id="Payment_Count">{summary_data.total_amount}</label>
                        </div>
                        <div className="col-4" id="payment_summery_card">
                            <label id="Payment_Labels">Paid Amount</label><br />
                            <label id="Payment_Count">{summary_data.paid_amount}</label>
                        </div>
                        <div className="col-3" id="payment_summery_card">
                            <label id="Payment_Labels">Due Amount</label><br />
                            <label id="Payment_Count">{summary_data.due_amount}</label>
                        </div>
                    </div>

                    <div className="row" id="payment_main_div">
                        <div className="col-3" id="payment_div">
                            <label id="payment_method_label"> Payment Method :</label>
                            <select className="form-control"ref={pay_mode}disabled={summary_data.due_amount <= 0}>
                                <option value="">-- Select Payment Method --</option>
                                <option value="UPI">UPI</option>
                                <option value="Credit Card">Credit Card</option>
                                <option value="Debit Card">Debit Card</option>
                                <option value="NetBanking">NetBanking</option>
                            </select><br/>

                            <label id="payment_method_label"> Amount :</label>
                            <input type="number" className="form-control"ref={pay_amount}disabled={summary_data.due_amount <= 0}></input>

                            <button id="btn_pay"onClick={handleClick}disabled={summary_data.due_amount <= 0}>Pay</button>

                        </div>
                        <div id="payment_history_div">
                            <table cellPadding={10} cellSpacing={10} id="view_my_table" className="table table-bordered table-striped">
                                <thead>
                                    <tr>
                                        <th>Payment Id</th>
                                        <th>Payment Mode</th>
                                        <th>Amount</th>
                                        <th>Payment Time</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        data.map((row) => {
                                            return (
                                                <tr>
                                                    <td>{row.payment_id}</td>
                                                    <td>{row.payment_mode}</td>
                                                    <td>{row.amount}</td>
                                                    <td>{new Date(row.payment_date).toLocaleString("en-IN")}</td>
                                                </tr>
                                            )
                                        }
                                        )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Tour_Payment;
