import React, { useRef, useState, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom";
import { useParams } from "react-router-dom"
import axios from "axios"
import Logo from "./Logo";
import Sidebar from "./SideBar";
import Username from "./Admin_User_name";
import "./CSS/Structure_Stylesheet.css"
import "./CSS/Enquiry_Form.css"

function Enquiry_reply() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [data, setData] = useState([]);
    useEffect(() => {
        axios
            .get(`http://localhost:5000/Individual_enquiry/${id}`)
            .then((res) => {
                if (res.status == 200) {
                    const json = res.data
                    setData(json)
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }, [id])

    const reply_message = useRef();

    const handleClick = () => {
       const message_1 = reply_message.current.value ;

       const formdata = new FormData() ;
       formdata.append("enq_reply", message_1);

       axios
       .put(`http://localhost:5000/update_enquiry/${id}`,formdata)
       .then((res) => 
        {
        if(res.status == 200)
        {
            const json = res.data ;
            if(json.status == "success")
            {
                alert("Replied Successfully")  
                navigate("/tour-enquiry")                            
            }
        }
       })
       .catch((err) => {
        console.log(err);
       })
    }

    return (
        <>
            <div className="row">
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
                        <div id="Enquiry_Form_container">
                            <center>
                                <div className="btn-group" id="Back_Buttons">
                                    <Link to={"/tour-enquiry"} id="Tour_Enquiry_Link">Back</Link>
                                </div>
                            </center>

                            <h2 id="Enquiry_Page_header">Enquiry Reply</h2> <br />
                            {
                                data.map(row => {
                                    return (
                                        <form>
                                            <div className="row">
                                                <div className="col-sm-4">
                                                    <label htmlFor="">Username :</label>
                                                    <input type="text" className="form-control" defaultValue={row.name} disabled/>
                                                </div>

                                                <div className="col-sm-4">
                                                    <label htmlFor="">Email Address :</label>
                                                    <input type="text" className="form-control" defaultValue={row.email} disabled/>
                                                </div>

                                                <div className="col-sm-2">
                                                    <label htmlFor="">Contact Number :</label>
                                                    <input type="text" className="form-control" defaultValue={row.phone_no} disabled/>
                                                </div>

                                                <div className="col-sm-2">
                                                    <label htmlFor="">Current Status :</label>
                                                    <input type="text" className="form-control" defaultValue={row.enquiry_status} disabled/>
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-6">
                                                    <label htmlFor="">Enquiry Message :</label>
                                                    <textarea rows="13" className="form-control" defaultValue={row.message} disabled /><br />
                                                </div>

                                                <div className="col-6">
                                                    <label htmlFor="">Reply Message :</label>
                                                    <textarea rows="10" className="form-control" defaultValue={row.reply_message} ref={reply_message} required/><br />
                                                    <button type="button" onClick={handleClick}className="btn btn-primary btn-lg" id="Reply_btn" >Reply</button>
                                                </div>

                                                <div className="col-1"></div>
                                            </div>
                                        </form>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div><br />
        </>
    )
}

export default Enquiry_reply;