import React from "react"
import "./CSS/Login_Registration.css"
import Navbar from "./Navbar"
import Footer from "./Footer"
import { Link } from "react-router-dom"
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {

    const navigate = useNavigate()
    const email_id = useRef()
    const password = useRef()

    const handleclick = (e) =>
    {
        let email_1 = email_id.current.value
        let password_1 = password.current.value
        
        const formdata =new FormData();
        formdata.append ("email",email_1)
        formdata.append ("password",password_1)
        
        if(email_1 == "")
        {
            alert("Please Enter Your Email Id")
            return;
        }
        if(password_1 == "")
        {
            alert("Please Enter Your Password")
            return;
        }
        axios
        .post("http://localhost:4000/userLogin" , formdata)
        .then((res) => 
        {
            if(res.status == 200)
            {
                const json = res.data;

                if(json.status == "success")
                {
                    localStorage.setItem("token", res.data.token);
                    alert("Login Sucessfully")
                    navigate("/")
                }
            }
        })
        .catch((err) => 
        {
            alert(err.response.data.message);
        })
    }

    return (
        <>
            <Navbar />

            <div className="container-fluid">
                <div className id="background">

                    <div className="row" id="Login_container">
                        <div className="col-sm-6">
                            <img src="/Image/IMAGE37.jpeg" id="Login_page_image"></img>
                        </div>

                        <div className="col-sm-6" id="Login_page_details">
                            <br /> <br />
                            <label id="welcome_back">Hello, <br /> <span style={{ color: "rgba(128, 70, 190, 1)" }}>Welcome</span> Back</label> <br /><br />

                            <form>
                                <div class="form-floating">
                                    <input type="email" class="form-control" id="floatingInput" placeholder="Enter Email Address"ref={email_id} />
                                    <label for="floatingInput">Email address</label>
                                </div><br />

                                <div class="form-floating">
                                    <input type="password" class="form-control" id="floatingPassword" placeholder="Enter Your Password"ref={password} />
                                    <label for="floatingPassword">Password</label>
                                </div> <br />

                                <Link to="/register" id="Register_Link">Forgot Password</Link><br /> <br />
                                <button type="button"onClick={handleclick} id="Login_Button"> Login </button> <br /> <br />

                            </form>

                            You Don't Have An Account..? <Link to="/register" id="Register_Link">Click Here</Link>
                        </div>

                    </div>
                </div>
                <div className="row">
                    <Footer />
                </div>
            </div>
        </>
    )
}



export default Login;