import React from "react"
import { Link } from "react-router-dom"
import "./CSS/Login_Registration.css"

function Login() {
    return (
        <>
            <div id="background">
                <div className="row" id="Login_container">
                    <div className="col-sm-7">
                        <img src="../public/Image/Login_Page(1).jpg" id="Login_page_image"></img>
                    </div>

                    <div className="col-sm-5" id="Login_page_details">
                        <label id="welcome_create_Account">Hello, <br /> <span style={{ color: "rgb(144, 0, 255)" }}>Create</span> Account</label> 
                        <br /><br />

                        <form>
                            <div class="form-floating">
                                <input type="email" class="form-control" id="floatingInput" placeholder="Enter Your Name" />
                                <label for="floatingInput">Name </label>
                            </div><br />

                            <div class="form-floating">
                                <input type="email" class="form-control" id="floatingInput" placeholder="Enter Your Email Address" />
                                <label for="floatingInput">Email Address  </label>
                            </div><br />

                            <div class="form-floating">
                                <input type="email" class="form-control" id="floatingInput" placeholder="Enter Your Phone Number" />
                                <label for="floatingInput">Phone No  </label>
                            </div><br />

                            <div class="form-floating">
                                <input type="password" class="form-control" id="floatingPassword" placeholder="Enter Your Password" />
                                <label for="floatingPassword">Password  </label>
                            </div> <br />

                            <Link to="/" id="Login_Button"> Register </Link> <br /> <br />
                        </form>

                        You Already Have An Account..? <Link to="/" id="Register_Link">Click Here</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login;