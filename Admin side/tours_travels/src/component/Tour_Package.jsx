import React, { useRef, useState } from "react"
import { Link } from "react-router-dom";
import DatePicker from "react-multi-date-picker";

import axios from "axios"
import Logo from "./Logo";
import Sidebar from "./SideBar";
import Username from "./Admin_User_name";
import "./CSS/Structure_Stylesheet.css"
import "./CSS/Tour_Package.css"


function Tour_Package() {


    const tourtitle = useRef();
    const tourlocation = useRef();
    const tourduration = useRef();
    const tourdescription = useRef();
    const tourprice = useRef();
    const maxperson= useRef();
    const discount_Rate = useRef() 
    const [file,setFile] = useState(null);
    const [preview,setPreview] = useState(null);
    const [dates, setDates] = useState([]); // 👈 multiple dates


    const handleclick = (e) => 
    {    
        e.preventDefault();

        let title = tourtitle.current.value
        let location = tourlocation.current.value
        let duration = tourduration.current.value
        let description = tourdescription.current.value
        let price = tourprice.current.value
        let dis = discount_Rate.current.value
        let maxpersonvalue = maxperson.current.value

        const formdata =new FormData();
        formdata.append ("tourtitle",title)
        formdata.append ("tourlocation",location)
        formdata.append ("tourduration",duration)
        formdata.append ("tourdescription",description)
        formdata.append ("tourprice",price)
        formdata.append ("discount" ,dis)
        formdata.append ("max_person" , maxpersonvalue)
        formdata.append ("tourimg" ,file)

        dates.forEach(date => 
        {
            formdata.append("start_dates", date.format("YYYY-MM-DD"));
        });

        if(title == "")
        {
            alert("Enter The Tour Title")
            return;
        }
        if(location == "")
        {
            alert("Enter The Tour Location")
            return;
        }
        if(duration == "")
        {
            alert("Enter The Tour Duration")
            return;
        }
        if(description.trim === "")
        {
            alert("Enter The Tour Description")
            return;
        }
        if(price == "")
        {
            alert("Enter The Tour Price")
            return;
        }
        if(dates == "")
        {
            alert("Enter The Tour Dates")
            return;
        }
        if(!file)
        {
            alert("Enter The Tour Main Image")
            return;
        }
        if(!file)
        {
            alert("Enter The Tour Main Image")
            return;
        }
        else 
        {
            axios
            .post("http://localhost:5000/addpackages" , formdata,
            {
                headers: { "Content-Type": "multipart/form-data" }
            })
            .then((res) => 
            {
                if(res.status == 200)
                {
                    const json = res.data;

                    if(json.status == "success")
                    {
                        alert ("Package Added Successfully")
                    }
                    else
                    {
                        alert("PACKAGE NOT ADDED")
                    }
                }
            })
            .catch((err) => {
                alert(err)
            })
        }
    }

    const handleImage = (e) =>
    {
        setFile(e.target.files[0]);
        setPreview(URL.createObjectURL(e.target.files[0]))
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
                        <div id="Form-container">

                            <center>
                                <div className="btn-group" id="Gruop_Buttons">
                                    <Link to={"/tour-package"} id="add_Package_Link">Add Package</Link>
                                    <Link to={"/view-package"} id="view_Package_Link">View Package</Link>
                                </div>
                            </center>

                            <h2 id="Page_header">Create Packages</h2> <br />


                            <form>
                                <div className="row">
                                    <div className="col-sm-5">
                                        <label htmlFor="">Title :</label>
                                        <input type="text" ref={tourtitle} className="form-control" />
                                    </div>

                                    <div className="col-sm-4">
                                        <label htmlFor="">Location :</label>
                                        <input type="text"ref={tourlocation} className="form-control" />
                                    </div>

                                    <div className="col-sm-3    ">
                                        <label htmlFor="">Duration :</label>
                                        <input type="text"ref={tourduration} className="form-control" />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="tour-description">
                                        <label htmlFor="">Description:</label>
                                        <textarea className="form-control" rows={5} ref={tourdescription}> </textarea>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-sm-5">
                                        <label htmlFor="">Price:</label>
                                        <input type="text" className="form-control" ref={tourprice}/><br />

                                         <label htmlFor="">Max.Persons :</label>
                                         <select className="form-control"ref={maxperson}>
                                            <option value="5">5</option>
                                            <option value="10">10</option>
                                            <option value="15">15</option>
                                            <option value="20">20</option>
                                            <option value="25">25</option>
                                            <option value="30">30</option>
                                            <option value="35">35</option>
                                            <option value="40">40</option>
                                            <option value="45">45</option>
                                            <option value="50">50</option>
                                            <option value="55">55</option>
                                            <option value="60">60</option>
                                            <option value="65">65</option>
                                            <option value="70">70</option>
                                            <option value="75">75</option>
                                            <option value="80">80</option>                                           
                                            <option value="85">85</option>                                            
                                            <option value="90">90</option>                      
                                            <option value="95">95</option>                                            
                                            <option value="100">100</option>
                                         </select><br/>

                                          <label htmlFor="">Discount Rate :</label>
                                         <select className="form-control" ref={discount_Rate}>
                                            <option value="0">0 %</option>
                                            <option value="5">5 %</option>
                                            <option value="10">10 %</option>
                                            <option value="15">15 %</option>
                                            <option value="20">20 %</option>
                                            <option value="25">25 %</option>
                                            <option value="30">30 %</option>
                                            <option value="35">35 %</option>
                                            <option value="40">40 %</option>
                                            <option value="45">45 %</option>
                                            <option value="50">50 %</option>
                                            <option value="55">55 %</option>
                                            <option value="60">60 %</option>
                                         </select><br/>


                                        <label htmlFor="">Start Date:</label><br></br>
                                        <DatePicker multiple format="DD-MM-YYYY"value={dates} onChange={setDates} minDate={new Date()}  inputClass="form-control" closeCalendar={false} sort /><br/><br/>

                                        <label htmlFor="">Main Image:</label>
                                        <input type="file" onChange={handleImage} className="form-control" /> <br /> <br />

                                        <button className="btn btn-primary btn-lg" id="Add_Package_btn" onClick={handleclick}> Add Package</button>
                                    </div>

                                    <div className="col-sm-1"></div>

                                    <div className="col-sm-6" id="preview_image">
                                        <center>
                                            <img src={preview}></img>
                                        </center>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div><br />
        </>
    )
}

export default Tour_Package;