import React from "react";
import "./CSS/Contact_Us.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import axios from "axios";
import { useRef } from "react";
import { Navigate, useNavigate } from "react-router-dom";

function Hero_Section() {


    const navigate = useNavigate() 
    useEffect(() => {
        AOS.init({
            duration: 1500,
            once: false, 
        });
    }, []);
    
    const token = localStorage.getItem("token");
    const user_name = useRef();
    const user_email = useRef();
    const user_phone = useRef();
    const user_message = useRef();

    const handleClick = () => {
       const name_1 = user_name.current.value ;
       const email_1 = user_email.current.value ;
       const phone_1 = user_phone.current.value ;
       const message_1 = user_message.current.value ;

       const formdata = new FormData() ;
    // formdata.append("API REQUEST BODY NAME" , "Handle click function variable name")
       formdata.append("username", name_1);
       formdata.append("useremail", email_1);
       formdata.append("userphone", phone_1);
       formdata.append("usermessage", message_1);

       if(name_1 == "")
        {
            alert("Please Enter Your Name")
            return;
        }
        if(email_1 == "")
        {
            alert("Please Enter Your Email Id")
            return;
        }
        if(phone_1 == "")
        {
            alert("Please Enter Your Mobile Number")
            return;
        }
        if(message_1 == "")
        {
            alert("Please Enter Your Question")
            return;
        }

       axios
       .post("http://localhost:4000/addenquiries",formdata,
        { headers: 
          {
              Authorization: `Bearer ${token}`
          }
        })
       .then((res) => 
        {
        if(res.status == 200)
        {
            const json = res.data ;
            if(json.status == "success")
            {
                  alert("Your Enquiry Has Been Submitted Successfully , Please Wait For Replay")
                  navigate("/my-enquiry")
 
                user_name.current.value = "";
                user_email.current.value = "";
                user_phone.current.value = "";
                user_message.current.value = "";
            }
        }
       })
       .catch((err) => {
        console.log(err);
       })
    }
    return (
        <>
             <div id="Main_Contact_div">
                <div className="row"data-aos="fade-down">

                    <div className="col-4">
                        <center>
                            <img src="/Image/Image3.jpg" id="Contact_Section_Image_1" />
                        </center>
                    </div>


                    <div className="col-7" id="Contact_Section_Content_1">

                        <h1 id="Contact_desc">
                            <span id="Contact_hero">Connect</span> With Us & <span id="Contact_hero">Travel</span> With <span id="Contact_hero">Confidence.</span>
                        </h1>

                        <div className="row" id="Hero_Section_Content_2">
                            <center>
                                <form>
                                    <div class="form-floating">
                                        <input type="text" class="form-control" ref={user_name} id="floatingInputName" placeholder="Enter Your Name" />
                                        <label for="floatingInputName">Name </label>
                                    </div><br />

                                    <div class="form-floating">
                                        <input type="email" class="form-control" ref={user_email} id="floatingInputEmail" placeholder="Enter Your Email Address" />
                                        <label for="floatingInputEmail">Email Address  </label>
                                    </div><br />

                                    <div class="form-floating">
                                        <input type="text" class="form-control" ref={user_phone} id="floatingInputPhone" placeholder="Enter Your Phone Number" />
                                        <label for="floatingInputPhone">Phone No  </label>
                                    </div><br />

                                    <div class="form-floating">
                                        <textarea class="form-control" ref={user_message} id="floatingMessage" placeholder="Enter Your Message"style={{ height: "120px" }} />
                                        <label for="floatingMessage">Message </label>
                                    </div> <br />

                                    <button type="button"id="Contact_Submit" onClick={handleClick}> Submit </button> <br /> <br />
                                </form>
                            </center>
                        </div>
                    </div>
                </div>
            </div> 
        </>
    );
}

export default Hero_Section;
