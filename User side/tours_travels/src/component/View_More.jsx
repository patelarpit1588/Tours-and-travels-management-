import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./CSS/View_More.css"
import { useRef } from "react";
import { jwtDecode }  from "jwt-decode";


function View_More () 
{
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
  const user_name = decoded.user_name;

  const [data, setData] = useState(null);
  const [image, setImage] = useState([])
  const [review, setReview] = useState([])
  const [rating, setRating] = useState({avg_rating: 0,total_reviews: 0})
  const [seats , setSeats] = useState([])
  const trip_id = useRef();
  const user_rating = useRef();
  const user_review_msg = useRef();

  


  useEffect(() => 
  {
    axios
      .get(`http://localhost:4000/packagedetails/${id}`) 
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  useEffect(() => 
  {
    axios
      .get(`http://localhost:4000/pacakges_seats/${id}`) 
      .then((res) => setSeats(res.data))
      .catch((err) => console.log(err));
  }, [id]);


  useEffect(() => 
  {
    axios
      .get(`http://localhost:4000/packageImages/${id}`) 
      .then((res) => setImage(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  useEffect(() => 
  {
    axios
      .get(`http://localhost:4000/packageReview/${id}`) 
      .then((res) => setReview(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  useEffect(() => 
  {
    axios
      .get(`http://localhost:4000/tourrating/${id}`)
      .then((res) => setRating(res.data))
      .catch((err) => console.log(err));
  },[id]);

  function showStars(rating) 
  {
    return "⭐".repeat(rating);
  }
  const ratingCount = {
  5: review.filter((r) => Number(r.rating) === 5).length,
  4: review.filter((r) => Number(r.rating) === 4).length,
  3: review.filter((r) => Number(r.rating) === 3).length,
  2: review.filter((r) => Number(r.rating) === 2).length,
  1: review.filter((r) => Number(r.rating) === 1).length,
};

const totalReviews = review.length;

  const handleclick = () => 
  {
    let trip_number = trip_id.current.value
    let rating_stars = user_rating.current.value
    let review_msg = user_review_msg.current.value

    const formdata = new FormData();

    formdata.append("tourid", trip_number)
    formdata.append("tour_rating", rating_stars)
    formdata.append("tour_review_message", review_msg)

    if(!rating_stars)
    {
        alert("Please Select Your Rating")
        return;
    }
    if(review_msg == "")
    {
        alert("Please Enter Your Review Message")
        return;
    }

    axios
        .post("http://localhost:4000/addreview", formdata,
        { headers: 
          {
              Authorization: `Bearer ${token}`
          }
        })
        .then((res) => 
        {
          if (res.status == 200) 
          {
            const json = res.data;
            if (json.status == "success") 
            {
              alert("Review Added Successfully")
              setReview
              (
                review.concat({
                  username:user_name,
                  rating: rating_stars,
                  review_text: review_msg
                })
              );
              axios
                .get(`http://localhost:4000/tourrating/${id}`)
                .then(res => setRating(res.data));
            }
          }
        })
        .catch((err) => {
            console.log(err);
        })
  }

  if (!data) return <h2>Loading...</h2>;

  return (
    <>
      <div className="container-fluid" id="Main_View_More_Div">

        <div id="tourSlider" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-indicators">
            {image.map((_, index) => (
              <button key={index} data-bs-target="#tourSlider" data-bs-slide-to={index} className={index === 0 ? "active" : ""}/> 
            ))}
          </div>

          <div className="carousel-inner">
            {image.map((img, index) => (
              <div key={index} className={`carousel-item ${index === 0 ? "active" : ""}`} >
                <img src={`http://localhost:5000/uploads/Tour_Images/${img.image}`} className="d-block w-100 main-slider-img"/>
              </div>
            ))}
          </div>

          <button className="carousel-control-prev" type="button" data-bs-target="#tourSlider" data-bs-slide="prev">
            <span className="carousel-control-prev-icon"></span>
          </button>

          <button className="carousel-control-next" type="button" data-bs-target="#tourSlider" data-bs-slide="next">
            <span className="carousel-control-next-icon"></span>
          </button>
        </div>
            <div className="row"id="seats_Availiblity_Div">
              {
                seats.map((rev) => 
                {
                  return (
                  <div className="col-sm-3">
                    <div id="seat_div"className="row">
                        <div className="col-sm-6">
                            <strong >Date </strong>
                            {new Date(rev.start_date).toLocaleDateString("en-GB")}
                        </div>

                        {
                          rev.available_seats <= 0 ? 
                          (
                            <div className="col-sm-6">
                                <strong id="seat_div_header" style={{ color: "red" }}>Available Seats </strong>
                                <h6 id="seat_div_value" style={{ color: "red" }}>
                                  {rev.available_seats}
                                </h6>
                            </div>
                          ) : 
                          (
                            <div className="col-sm-6">
                              <strong id="seat_div_header">Available Seats </strong>
                              <h6 id="seat_div_value" style={{ color: "green" }}>
                                {rev.available_seats}
                              </h6>
                            </div>
                          )}
                      </div>
                  </div>
                )})
              }
    
              </div>
  

        <div className="row">
          <div className="col-sm-9" id="Tour_details">
            <div id="basic_detail">
              <h1 id="Tour_name">{data.title} </h1>
              <span id="stars_rating">{rating.avg_rating}⭐ ( {rating.total_reviews} Reviews ) </span> 
              <h2 id="Tour_price">₹ {data.price}</h2> 

              <label htmlFor="" id="Tour_Labels">Location : </label>
              <span id="Tour_Values"> {data.location}</span> <br />

              <label htmlFor="" id="Tour_Labels">Duration : </label>
              <span id="Tour_Values"> {data.duration}</span><br />

              <p id="Tour_Description">{data.description}</p>

              <button id="Booking_btn"onClick={() => navigate(`/tourbooking/${id}`)}>Book Now</button>
            </div>

            <div className="review-summary-card">
              <h3 className="review-title">Customer Rating Summary</h3>

              <div className="review-overview">
                <h1 className="avg-rating">
                  {rating.avg_rating || 0}
                  <span>⭐</span>
                </h1>
                <p className="total-review-text">
                  Based on <strong>{totalReviews}</strong> customer reviews
                </p>
              </div>

              <div className="rating-summary">
                {[5, 4, 3, 2, 1].map((star) => {
                  const percentage =
                    totalReviews > 0
                      ? (ratingCount[star] / totalReviews) * 100
                      : 0;

                  return (
                    <div className="rating-row" key={star}>
                      <span className="star-label">{star} ⭐</span>

                      <div className="rating-line">
                        <div
                          className="fill"
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>

                      <span className="review-count">
                        {ratingCount[star]} reviews
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="col-sm-3"id="show_review_div">
            <h2 id="Review_header_text">Customer Review</h2>
            <div className="row"id="Tour_Review">
              {
              review.map((rev) => (
                <div id="Review_box">
                  <div className="review_value">
                    <h6>{rev.username}</h6>
                    <h5 style={{ fontSize: "15px" }}> {showStars(Number(rev.rating))}</h5>                    
                    <h6>{rev.review_text}</h6 >
                  </div>
                </div>
              ))
            }
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default View_More;
