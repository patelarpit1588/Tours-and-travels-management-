import React, { use, useRef } from "react"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"
import "./CSS/Login_Registration.css"

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
        }
        else if(password_1 == "")
        {
            alert("Please Enter Your Password")
        }
        else
        {   
            axios
            .post("http://localhost:5000/adminLogin" , formdata)
            .then((res) => 
            {
                if(res.status == 200)
                {
                    const json = res.data;

                    if(json.status == "success")
                    {
                        localStorage.setItem("token", res.data.token);
                        navigate("/dashboard")
                    }
                }
            })
            .catch((err) => 
            {
                alert(err.response.data.message);
            })
        }
    }

    return (
        <>
            <div id="background">
                <div className="row" id="Login_container">
                    <div className="col-sm-7">
                        <img src="/Image/Login_Page(1).jpg" id="Login_page_image"></img>
                    </div>

                    <div className="col-sm-5" id="Login_page_details">
                        <br /> <br /><br /> <br />

                        <label id="welcome_back">Hello, <br /> <span style={{ color: "rgb(144, 0, 255)" }}>Welcome</span> Back</label> <br /><br />

                        <form>
                            <div class="form-floating">
                                <input type="email" class="form-control" id="floatingInput" placeholder="Enter Email Address"ref={email_id} />
                                <label for="floatingInput">Email address</label>
                            </div><br />

                            <div class="form-floating">
                                <input type="password" class="form-control" id="floatingPassword" placeholder="Enter Your Password"ref={password}/>
                                <label for="floatingPassword">Password</label>
                            </div> <br />

                            <button type="button" id="Login_Button" onClick={handleclick}>Login </button> <br /> <br />

                        </form>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Login;