import React from "react"
import "./CSS/Login_Registration.css"
import Navbar from "./Navbar"
import Footer from "./Footer"
import { Link } from "react-router-dom"
import { useRef } from "react"
import axios from "axios"

function Register() {

    const username = useRef()
    const useremail = useRef()
    const usercontact = useRef()
    const userpassword = useRef()
    const confirmpassword = useRef()

    const handleclick = () => {
        let name = username.current.value
        let email = useremail.current.value
        let mobileno = usercontact.current.value
        let password = userpassword.current.value
        let conifrmpass= confirmpassword.current.value

        const formdata = new FormData();

        formdata.append("username", name)
        formdata.append("useremail", email)
        formdata.append("usermobile", mobileno)
        formdata.append("userpassword", password)

        if(name == "")
        {
            alert("Please Enter Your Name")
            return;
        }
        if(email == "")
        {
            alert("Please Enter Your Email Id")
            return;
        }
        if(mobileno == "")
        {
            alert("Please Enter Your Mobile Number")
            return;
        }
        if(password == "")
        {
            alert("Please Enter Your Password")
            return;
        }
        if(password !== conifrmpass)
        {
            alert("Password Mismatch. Please Enter The Same Password");
            return;
        }

        axios
            .post("http://localhost:4000/addusers", formdata)
            .then((res) => 
            {
                if (res.status == 200) 
                {
                    const json = res.data;
                    if (json.status == "suucess") 
                    {
                        alert("Registration Successful")
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
            <Navbar />

            <div className="container-fluid">
                <div id="background">
                    <div className="row" id="Register_container">
                        <div className="col-sm-6">
                            <img src="/Image/IMAGE36.jpeg" id="Login_page_image"></img>
                        </div>

                        <div className="col-sm-6" id="Login_page_details">
                            <label id="welcome_create_Account">Hello, <br /> <span style={{ color: "rgb(111, 38, 189)" }}>Create</span> Account</label>
                            <br /><br />

                            <form>
                                <div class="form-floating">
                                    <input type="text" class="form-control" id="floatingInput" placeholder="Enter Your Name" ref={username} />
                                    <label for="floatingInput">Name </label>
                                </div><br />

                                <div class="form-floating">
                                    <input type="email" class="form-control" id="floatingInput" placeholder="Enter Your Email Address" ref={useremail} />
                                    <label for="floatingInput">Email Address  </label>
                                </div><br />

                                <div class="form-floating">
                                    <input type="text" class="form-control" id="floatingInput" placeholder="Enter Your Phone Number" ref={usercontact} />
                                    <label for="floatingInput">Phone No  </label>
                                </div><br />

                                <div class="form-floating">
                                    <input type="password" class="form-control" id="floatingPassword" placeholder="Enter Your Password" ref={userpassword} />
                                    <label for="floatingPassword">Password  </label>
                                </div> <br />

                                <div class="form-floating">
                                    <input type="password" class="form-control" id="floatingPassword" placeholder="Enter Your Password" ref={confirmpassword} />
                                    <label for="floatingPassword">Confirm Password  </label>
                                </div> <br />

                                <button type="button" id="Login_Button" onClick={handleclick}> Register </button> <br /> <br />
                            </form>

                            You Already Have An Account..? <Link to="/login" id="Register_Link">Click Here</Link>
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

export default Register;