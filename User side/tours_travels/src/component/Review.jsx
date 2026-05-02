import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { jwtDecode }  from "jwt-decode";

import axios from "axios";
import "./CSS/View_More.css"

function Tour_Review() 
{

    const { id } = useParams();
    const navigate = useNavigate()
    
    const token = localStorage.getItem("token");
    const decoded = jwtDecode(token);
    const user_name = decoded.user_name;
    const [alreadyReviewed, setAlreadyReviewed] = useState(false);
  
    const trip_id = useRef();
    const user_rating = useRef();
    const user_review_msg = useRef();

  useEffect(() => 
  {
    const reviewStatus = localStorage.getItem(`review_${id}`);
    if (reviewStatus === "true") 
    {
        setAlreadyReviewed(true);
    }
  }, [id]);
  
      
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
              localStorage.setItem(`review_${trip_number}`, "true");
              alert("Review Added Successfully")
              navigate(`/packagedetails/${trip_number}`)
            }
          }
        })
        .catch((err) => {
            console.log(err);
        })
  }
  
  return(
  <div id="background_124">
    <div id="Add_review_div">
    <input type="hidden"defaultValue={id} ref={trip_id}></input> 
    
    <h2 id="Add_review_heading"><b>Add Your Review</b></h2>

    <select className="form-control" id="rating_star"ref={user_rating}>
        <option value="">-- Select Your Rating --</option>
        <option value="1">⭐ </option>
        <option value="2">⭐⭐ </option>
        <option value="3">⭐⭐⭐</option>
        <option value="4">⭐⭐⭐⭐</option>
        <option value="5">⭐⭐⭐⭐⭐</option>
    </select><br />

    <textarea rows={4} className="form-control" placeholder="Write Your Review" ref={user_review_msg} required></textarea><br />
    {
        !alreadyReviewed ? 
        (
            <button id="Add_Review_btn" onClick={handleclick}>
                Add Review
            </button>
        ) : 
        (
            <button id="Add_Review_btn" disabled>
                Already Reviewed
            </button>
        )
    }
    </div>
  </div>
  )
}

export default Tour_Review;
