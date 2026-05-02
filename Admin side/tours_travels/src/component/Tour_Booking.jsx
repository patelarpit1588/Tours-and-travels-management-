import React , {useEffect,useState} from "react"
import axios from "axios";
import Logo from "./Logo";
import Sidebar from "./SideBar";
import Username from "./Admin_User_name";
import "./CSS/Structure_Stylesheet.css"
import "./CSS/Tour_Tables.css"
import { Link , useNavigate} from "react-router-dom";

function Tour_Booking() {

    const [data, setData] = useState([]);

    useEffect(() => 
    {
        axios
            .get("http://localhost:5000/viewbooking")
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


    const handleRefund = (booking_id) =>
{
    if (!window.confirm("Are you sure you want to approve this refund?"))
    return;

    axios
    .post(`http://localhost:5000/approve_refund/${booking_id}`)
    .then((res) =>
    {
        if(res.status == 200)
        {
            const json = res.data;

            if(json.status == "success")
            {
                alert("Refund Approved Successfully");

                setData(old_data =>
                    old_data.map(row =>
                    {
                        if (row.booking_id === booking_id)
                        {
                            row.refund_status = "Approved";

                            if (row.persons === 0)
                            {
                                row.booking_status = "Cancelled";
                            }
                        }
                        return row;
                    })
                );
            }
        }
    })
    .catch((err) =>
    {
         console.log("FULL ERROR:", err.response?.data);
    alert(JSON.stringify(err.response?.data))
    });
};

    const handleRejectRefund = (booking_id) => 
    {

        axios.post( `http://localhost:5000/reject_refund/${booking_id}`, {},
        {
            headers: 
            {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        })

        .then((res) => 
        {
            alert("Refund Request Rejected Successfully.");
            window.location.reload();
        })
        .catch((err) => 
        {
            alert(err.response?.data?.message);
        });
    };

    useEffect(() =>
    {
        if (data && data.length > 0)
        {
            const tableRef = $("#view_table");

            if ($.fn.DataTable.isDataTable(tableRef))
            {
                tableRef.DataTable().destroy();
            }

            tableRef.DataTable(
            {
                dom: "lBfrtip",
                buttons:
                [
                    "excel",
                    "csv",
                    {
                        extend: "pdfHtml5",
                        text: "PDF",
                        orientation: "portrait",
                        pageSize: "A4",

                        customize: function (doc)
                        {
                            doc.content = [];

                            const sortedData = [...data].sort((a, b) =>
                            {
                                const order = { "Confirm": 1, "Pending": 2, "Cancelled": 3 };
                                return order[a.booking_status] - order[b.booking_status];
                            });

                            doc.content.push(
                            {
                                text: "TravelWise Tours Travels",
                                alignment: "center",
                                fontSize: 16,
                                bold: true,
                                margin: [0, 0, 0, 3]
                            });

                            doc.content.push(
                            {
                                text: "Booking Report",
                                alignment: "center",
                                fontSize: 11,
                                margin: [0, 0, 0, 12]
                            });

                            let totalPerson = 0, activePerson = 0, pendingPerson = 0, cancelledPerson = 0;
                            let totalAmount = 0, paidAmount = 0, activeAmount = 0, dueAmount = 0, refundAmount = 0, cancellationCharge = 0;

                            sortedData.forEach(b =>
                            {
                                totalPerson += Number(b.persons || 0);
                                totalAmount += Number(b.total_amount || 0);
                                paidAmount += Number(b.paid_amount || 0);

                                activeAmount += Number(b.active_amount || 0);
                                dueAmount += Number(b.due_amount || 0);
                                refundAmount += Number(b.refund_amount || 0);
                                cancellationCharge += Number(b.cancellation_charge || 0);

                                const activeP = b.passengers?.filter(p => p.passanger_status === "Active").length || 0;
                                const cancelP = b.passengers?.filter(p => p.passanger_status === "Cancelled").length || 0;

                                activePerson += activeP;
                                cancelledPerson += cancelP;

                                if (b.booking_status === "Pending")
                                {
                                    pendingPerson += Number(b.persons || 0);
                                }
                            });

                            const summary =
                            [
                                ["Total Person", totalPerson],
                                ["Active Person", activePerson],
                                ["Pending Person", pendingPerson],
                                ["Cancelled Person", cancelledPerson],
                                ["Total Amount", "₹" + totalAmount],
                                ["Paid Amount", "₹" + paidAmount],
                                ["Active Amount", "₹" + activeAmount],
                                ["Due Amount", "₹" + dueAmount],
                                ["Refund Amount", "₹" + refundAmount],
                                ["Cancellation Charge", "₹" + cancellationCharge]
                            ];

                            doc.content.push(
                            {
                                table:
                                {
                                    widths: ["80%", "20%"],
                                    body:
                                    [
                                        [
                                            {
                                                text: "Summary Report",
                                                colSpan: 2,
                                                fillColor: "#2c3e50",
                                                color: "white",
                                                alignment: "center",
                                                bold: true,
                                                margin: [0, 5, 0, 5]
                                            },
                                            {}
                                        ],
                                        ...summary.map(r =>
                                        [
                                            { text: r[0], margin: [4, 4, 4, 4] },
                                            { text: r[1], alignment: "center", margin: [4, 4, 4, 4] }
                                        ])
                                    ]
                                },
                                layout:
                                {
                                    hLineWidth: () => 0.6,
                                    vLineWidth: () => 0.6,
                                    paddingTop: () => 3,
                                    paddingBottom: () => 3
                                },
                                margin: [0, 0, 0, 12]
                            });

                            const body =
                            [
                                [
                                    "Booking ID", "Tour Id", "Date Id", "Person", "Total Amount", "Paid Amount", "Status", "Payment"
                                ]
                            ];

                            body[0] = body[0].map(h =>
                            ({
                                text: h,
                                fillColor: "#2c3e50",
                                color: "white",
                                bold: true,
                                alignment: "center",
                                margin: [3, 5, 3, 5]
                            }));

                            sortedData.forEach(b =>
                            {
                                let bg = "#ffffff";

                                if (b.booking_status === "Confirm")
                                {
                                    bg = "#d4edda";
                                }
                                else if (b.booking_status === "Pending")
                                {
                                    bg = "#ffe5b4";
                                }
                                else
                                {
                                    bg = "#f8d7da";
                                }

                                body.push(
                                [
                                    { text: "BOOKING-" + b.booking_id, fillColor: bg, alignment: "center" },
                                    { text: b.tour_id, fillColor: bg, alignment: "center" },
                                    { text: b.date_id, fillColor: bg, alignment: "center" },
                                    { text: b.persons, fillColor: bg, alignment: "center" },
                                    { text: "₹" + b.total_amount, fillColor: bg, alignment: "center" },
                                    { text: "₹" + b.paid_amount, fillColor: bg, alignment: "center" },
                                    { text: b.booking_status, fillColor: bg, alignment: "center", bold: true },
                                    { text: b.payment_status, fillColor: bg, alignment: "center" }
                                ]);
                            });

                            doc.content.push(
                            {
                                text: "Booking Details",
                                bold: true,
                                margin: [5, 5, 5, 5]
                            });

                            doc.content.push(
                            {
                                table:
                                {
                                    headerRows: 1,
                                    widths: ["16%", "10%", "10%", "8%", "16%", "16%", "12%", "12%"],
                                    body: body
                                },
                                layout:
                                {
                                    paddingTop: () => 6,
                                    paddingBottom: () => 6,
                                    hLineWidth: () => 0.5,
                                    vLineWidth: () => 0.5
                                },
                                margin: [0, 0, 0, 18]
                            });

                            sortedData.forEach(b =>
                            {
                                doc.content.push(
                                {
                                    text: "",
                                    pageBreak: "before"
                                });

                                const active = (b.paid_amount || 0) - (b.refund_amount || 0);
                                const activeP = Number(b.active_person ?? b.persons ?? 0);
                                const cancelP = Number(b.cancelled_person ?? 0);

                                doc.content.push(
                                {
                                    table:
                                    {
                                        widths: ["25%", "25%", "25%", "25%"],
                                        body:
                                        [
                                            [
                                                {
                                                    text: "BOOKING ID - " + b.booking_id,
                                                    colSpan: 4,
                                                    fillColor: "#eeeeee",
                                                    bold: true,
                                                    margin: [5, 5, 5, 5]
                                                },
                                                {},
                                                {},
                                                {}
                                            ],
                                            ["Tour : " + b.tour_id, "Total Persons : " + b.persons, "Active Person : " + activeP, "Cancelled Person : " + cancelP],
                                            ["Booking Status : " + b.booking_status, "Payment Status : " + b.payment_status, "Total Amount : ₹ " + b.total_amount, "Paid Amount : ₹ " + b.paid_amount],
                                            ["Due Amount : ₹ " + b.due_amount, "Active Amount : ₹ " + active, "Refund Amount : ₹ " + b.refund_amount, "Cancellation Charge : ₹ " + b.cancellation_charge]
                                        ]
                                    },
                                    layout:
                                    {
                                        hLineWidth: () => 0.6,
                                        vLineWidth: () => 0.6,
                                        paddingTop: () => 5,
                                        paddingBottom: () => 5
                                    },
                                    margin: [0, 0, 0, 12]
                                });

                                let pBody = [["#", "Name", "Age", "Gender", "Status"]];

                                pBody[0] = pBody[0].map(h =>
                                ({
                                    text: h,
                                    fillColor: "#2c3e50",
                                    color: "white",
                                    bold: true,
                                    alignment: "center",
                                    margin: [0, 5, 0, 5]
                                }));

                                b.passengers.forEach((p, i) =>
                                {
                                    let bg = p.passanger_status === "Cancelled" ? "#f8d7da" : "#d4edda";

                                    pBody.push(
                                    [
                                        { text: i + 1, alignment: "center", fillColor: bg },
                                        { text: p.name, alignment: "center", fillColor: bg },
                                        { text: p.age, alignment: "center", fillColor: bg },
                                        { text: p.gender, alignment: "center", fillColor: bg },
                                        { text: p.passanger_status, alignment: "center", bold: true, fillColor: bg }
                                    ]);
                                });

                                doc.content.push(
                                {
                                    text: "Passenger Details",
                                    bold: true
                                });

                                doc.content.push(
                                {
                                    table:
                                    {
                                        headerRows: 1,
                                        widths: ["8%", "32%", "15%", "15%", "30%"],
                                        body: pBody
                                    },
                                    layout:
                                    {
                                        paddingTop: () => 6,
                                        paddingBottom: () => 6,
                                        hLineWidth: () => 0.4,
                                        vLineWidth: () => 0.4
                                    },
                                    margin: [0, 5, 0, 12]
                                });

                                let payBody = [["#", "Mode", "Amount", "Date"]];

                                payBody[0] = payBody[0].map(h =>
                                ({
                                    text: h,
                                    fillColor: "#2c3e50",
                                    color: "white",
                                    bold: true,
                                    alignment: "center"
                                }));

                                b.payments.forEach((p, i) =>
                                {
                                    payBody.push(
                                    [
                                        { text: i + 1, alignment: "center" },
                                        { text: p.payment_mode, alignment: "center" },
                                        { text: "₹" + p.amount, alignment: "center", bold: true },
                                        { text: p.payment_date, alignment: "center" }
                                    ]);
                                });

                                doc.content.push(
                                {
                                    text: "Payment Details",
                                    bold: true
                                });

                                doc.content.push(
                                {
                                    table:
                                    {
                                        headerRows: 1,
                                        widths: ["10%", "35%", "25%", "30%"],
                                        body: payBody
                                    },
                                    layout:
                                    {
                                        fillColor: (i) => i % 2 === 0 ? "#f5f5f5" : null,
                                        paddingTop: () => 6,
                                        paddingBottom: () => 6,
                                        hLineWidth: () => 0.4,
                                        vLineWidth: () => 0.4
                                    }
                                });
                            });

                            doc.defaultStyle =
                            {
                                fontSize: 8.5,
                                lineHeight: 1.2
                            };
                        }
                    }
                ]
            });
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
                            <h2 id="Headings">View Bookings</h2><br/>

                            <center>
                                <Link to="/tour-booking"id="Booking_Status">All Bookings</Link>
                                <Link to="/pending-bookings"id="Booking_Status">Pending Bookings</Link>
                                <Link to="/confirm-bookings"id="Booking_Status">Confirm Bookings</Link>
                                <Link to="/cancle-bookings"id="Booking_Status">Cancle Bookings</Link>
                            </center>

                            <div class="view-table-wrapper">
                                <table cellPadding={10} cellSpacing={10} id="view_table"className="table table-bordered table-striped table-hover">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Tour Id</th>
                                            <th>Date Id</th>
                                            <th>Person</th>
                                            <th>Total Amount</th>
                                            <th>Paid Amount</th>
                                            <th>Cancellation Passanger Ids</th>
                                            <th>Booking Status</th>
                                            <th>Payment Status</th>
                                            <th>Refund Status</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            data.map((row) =>
                                            {
                                                return (
                                                
                                                <tr>
                                                    <td>BOOKING-{row.booking_id}</td>
                                                    <td>{row.tour_id}</td>
                                                    <td>{row.date_id}</td>
                                                    <td>{row.persons}</td>
                                                    <td>{row.total_amount}</td>
                                                    <td>{row.paid_amount}</td>
                                                    <td>{row.cancle_passanger_id}</td>
                                                    <td>{row.booking_status}</td>
                                                    <td>{row.payment_status}</td>
                                                    <td>{row.refund_status}</td>

                                                    <td>
                                                    <Link id="btn_edit_1" to={`/view-passanger/${row.booking_id}`} className="btn btn-primary" > View </Link>
                                                    {
                                                        row.refund_status === "Pending" ? 
                                                        (
                                                            <>
                                                                <button id="btn_edit_1" className="btn btn-warning ms-2" onClick={() => handleRefund(row.booking_id)} > Approve </button>
                                                                <button id="btn_edit_1" className="btn btn-danger ms-2" onClick={() => handleRejectRefund(row.booking_id)} > Reject </button>
                                                            </>
                                                        ) : null
                                                    }
                                                    </td>
                                                </tr>
                                            )}
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div><br />
        </>
    )
}

export default Tour_Booking;