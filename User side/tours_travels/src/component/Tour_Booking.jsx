import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./CSS/Show_Packages.css"
import "./CSS/Tour_Booking.css"

function Tour_Booking() 
{
    const { id } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [tour_date, set_tour_Date] = useState([]);
    const [selectedDateId, setSelectedDateId] = useState("");

    const [rating, setRating] = useState({ avg_rating: 0, total_reviews: 0 })
    const [persons, setPersons] = useState(0);
    const [seats , setSeats] = useState();
    const dateRef = useRef();

    const subtotalAmount = persons > 0 ? persons * data[0]?.price : 0;
    const discountPercent = data[0]?.discount || 0;

    const discount_amount = (subtotalAmount * discountPercent) / 100;
    const after_discount = subtotalAmount - discount_amount
    const CGST = after_discount * 0.025;
    const SGST = after_discount * 0.025;
    const TotalGST = CGST + SGST
    const totalAmount = after_discount + TotalGST;


    const handleclick = () =>
    {

        const formdata = new FormData()
        formdata.append("date_id", selectedDateId)
        formdata.append("person", persons)
        formdata.append("total_amount",totalAmount)

        if (!seats?.available_seats || seats.available_seats === 0) 
        {
            alert("Seats Are Full. Please Try After Some Time.");
            return;
        }

        if (persons > seats.available_seats) 
        {
            alert(`Only ${seats.available_seats} Seats Available.`);
            return;
        }

        if (!selectedDateId) 
        {
            alert("Please Select Travel Date");
            return;
        }

        if (persons == "") 
        {
            ("Please select number of persons");
            return;
        }

        const passanger_details = []
        
        for(let i=1; i <= persons ; i++)
        {
            const name = document.getElementById("name"+i).value;
            const age = document.getElementById("age"+i).value;
            const gender = document.getElementById("gender"+i).value;

            if(name == "" || age == "" || gender == "")
            {
                alert("Please Fill All Details For Passenger " + i);
                return;
            }

            if(isNaN(age) || age <= 0)
            {
                alert("Enter Valid Age For Passenger " + i);
                return;
            }

            passanger_details.push
            ({
                name: name,
                age: age,
                gender: gender
            });
        }

        formdata.append("passanger", JSON.stringify(passanger_details))

        axios
        .post(`http://localhost:4000/addbooking/${id}` , formdata,
        {
           headers:
           { 
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
        .then((res) => 
        {
            if(res.status == 200)
            {
                const json = res.data;

                if(json.status == "success")
                {
                    alert ("Your Booking Request Has Been Sent Successfully")
                    navigate("/my-bookings")
                }
                else
                {
                    alert("Booking failed")
                }
            }
        })
        .catch((err) => {
            alert(err)
        })
    }

    useEffect(() => 
    {
        axios
            .get(`http://localhost:4000/tourrating/${id}`)
            .then((res) => setRating(res.data))
            .catch((err) => console.log(err));
    }, [id]);

    useEffect(() => 
    {

        axios
            .get(`http://localhost:4000/packageseatsdetails/${id}/${selectedDateId}`)
            .then((res) => 
            {
                setSeats(res.data);
            })
            .catch((err) => console.log(err));

    }, [selectedDateId]);

    useEffect(() => 
    {
        axios
            .get(`http://localhost:4000/singlePackageCard/${id}`,
                {
                    headers:
                    {
                        Authorization: localStorage.getItem("token")
                    }
                })
            .then((res) => 
            {
                if (res.status === 200) 
                    {
                    const json = res.data;
                    setData(json);
                }
            })
            .catch((err) => 
            {
                console.log(err);
            });
    }, []);
    

    useEffect(() => 
    {
        axios
            .get(`http://localhost:4000/package_dates/${id}`,
                {
                    headers:
                    {
                        Authorization: localStorage.getItem("token")
                    }
                })
            .then((res) => 
            {
                if (res.status === 200) 
                {
                    const json = res.data;
                    set_tour_Date(json);
                }
            })
            .catch((err) => 
            {
                console.log(err);
            });
    }, []);

    

    return (
        <>
            <div className="container-fluid" id="Main_View_More_Div">
                <div className="row">
                    {
                        data.map((row) => 
                        {
                            return (
                                <div id="single_package_card">
                                    <div className="row">
                                        <div className="col-3" id="single_package_image_div">
                                            <img src={`http://localhost:5000/uploads/pakage/${row.main_image}`} id="single_package_image" />
                                        </div>

                                        <div className="col-8" id="single_package_info_div">
                                            <h2 id="single-package-title">{row.title} | {row.duration} </h2>
                                            <span id="stars_rating">{rating.avg_rating}⭐ ( {rating.total_reviews} Reviews ) </span>
                                            <h2 id="single-package-location"> {row.location}</h2>
                                            <p id="single-package-desc">
                                                This tour package provides a comfortable and well-organized travel experience with transportation, accommodation, and sightseeing included.
                                                The itinerary is planned to ensure safe travel, quality meals, and a smooth journey suitable for all age groups.
                                            </p>
                                            <h5 id="single-package-price">₹{row.price} | Person </h5>
                                        </div>

                                        <hr />
                                        <div className="row" id="booking-form-div">
                                            <div className="col-8" id="Booking-form">
                                                <div className="row" id="select_Date">

                                                    <div className="col-sm-3">
                                                        <label>Available Seats:</label><br />
                                                        <input type="text"className="form-control"value={seats?.available_seats || 0} disabled></input>
                                                    </div>


                                                    <div className="col-sm-3">
                                                        <label>Travel Date :</label><br />
                                                        <select className="form-control" value={selectedDateId} onChange={(e) => setSelectedDateId(e.target.value)}>                                                            <option value="">-- Select Date --</option>
                                                            {
                                                                tour_date.map((row) => (
                                                                    <option value={row.date_id}>
                                                                        {row.start_date.split("T")[0].split("-").reverse().join("-")}
                                                                    </option>
                                                                ))
                                                            }
                                                        </select>
                                                    </div>
                                                    <div className="col-sm-6">
                                                        <label>Number Of Person : </label><br />
                                                        <select className="form-control" value={persons} disabled={!seats?.available_seats || seats.available_seats === 0} onChange={(e) => 
                                                        {
                                                            const selectedPersons = parseInt(e.target.value);

                                                            if (selectedPersons > seats?.available_seats) 
                                                                {
                                                                    alert(`Only ${seats.available_seats} Seat Available`);
                                                                    setPersons(0);
                                                                    return;
                                                                }
                                                            setPersons(selectedPersons);
                                                        }}>                                                            
                                                            <option value="">-- Select Persons --</option>
                                                            <option value="1">1</option>
                                                            <option value="2">2</option>
                                                            <option value="3">3</option>
                                                            <option value="4">4</option>
                                                            <option value="5">5</option>
                                                            <option value="6">6</option>
                                                        </select>
                                                    </div>
                                                </div>

                                                <div className="row">
                                                {
                                                (() => {
                                                    let boxes = [];

                                                    for (let i = 1; i <= persons; i++) {
                                                    boxes.push(
                                                        <div className="row"id="passanger_form">
                                                            <h6>Passenger {i}</h6> 

                                                            <div className="col-sm-5"> 
                                                                <input type="text" id={"name"+i} className="form-control" placeholder="Name" />
                                                            </div>

                                                            <div className="col-sm-3">                                                        
                                                                <input type="text" id={"age"+i} className="form-control" placeholder="Age" />
                                                            </div>

                                                            <div className="col-sm-4"> 
                                                                <select id={"gender"+i} className="form-control">
                                                                    <option value="">Select Gender</option>
                                                                    <option value="Male">Male</option>
                                                                    <option value="Female">Female</option>
                                                                </select>
                                                            </div>    
                                                        </div>
                                                    );
                                                    }
                                                    return boxes;
                                                })()
                                                }
                                                </div>
                                            </div>

                                            <div className="col-3" id="Calculation_div">
                                                <center>
                                                    <img src="/Image/Logo.jpg" id="Booking_Page_Logo"/>
                                                </center>
                                                <div className="row">
                                                    <div className="col-12">
                                                        <center><h4 id="Package_Calc_label_1">Booking Summary</h4></center>
                                                    </div>
                                                </div><hr/>

                                                <div className="row">
                                                    <div className="col-6">
                                                        <h6 id="Package_Calc_label">Price (Per Person): </h6>
                                                    </div>

                                                    <div className="col-6 text-end">
                                                        <h6 id="Package_Price">₹{row.price}</h6>
                                                    </div>
                                                </div>

                                                <div className="row">
                                                    <div className="col-6">
                                                        <h6 id="Package_Calc_label">Total Persons:</h6>
                                                    </div>

                                                    <div className="col-6 text-end">
                                                        <h6 id="Package_Price">{persons}</h6>
                                                    </div>
                                                </div><hr/>

                                                <div className="row">
                                                    <div className="col-6">
                                                        <h6 id="Package_Calc_label">Base Amount:</h6>
                                                        <h6 id="Package_Calc_label">Discount ( { row.discount} % ) : </h6>
                                                        <h6 id="Package_Calc_label"><b>Sub Total Amount: </b></h6>
                                                        
                                                    </div>

                                                    <div className="col-6 text-end">
                                                        <h6 id="Package_Price">₹{subtotalAmount}</h6>
                                                        <h6 id="Package_Price">- ₹{discount_amount}</h6>
                                                        <h6 id="Package_Price"><b>₹{after_discount}</b></h6>
                                                    </div>
                                                </div><hr/>

                                                <div className="row">
                                                    <div className="col-6">
                                                        <h6 id="Package_Calc_label">CGST ( 2.5 % ):</h6>
                                                        <h6 id="Package_Calc_label">SGST ( 2.5 % ):</h6>
                                                        <h6 id="Package_Calc_label"><b>Total GST :</b></h6>
                                                    </div>

                                                    <div className="col-6 text-end">
                                                        <h6 id="Package_Price">₹{CGST}</h6>
                                                        <h6 id="Package_Price">₹{SGST}</h6>
                                                        <h6 id="Package_Price"><b>₹{TotalGST}</b></h6>
                                                    </div>
                                                </div><hr/>
                                                
                                                <div className="row">
                                                    <div className="col-6">
                                                        <h6 id="Package_Calc_final_label">Grand Total :</h6>
                                                    </div>

                                                    <div className="col-6 text-end">
                                                        <h6 id="Package_final_Price">₹{totalAmount}</h6>
                                                    </div>
                                                </div>

                                                <div className="row">
                                                    <div className="col-12">
                                                        <button id="Package_Book_button"className="form-control"onClick={handleclick}>Proceed to Payment</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            );
                        })}
                </div>
            </div>
        </>
    );
};

export default Tour_Booking;

