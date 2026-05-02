import React, {useEffect ,useRef, useState } from "react"
import { useParams , Link } from "react-router-dom"
import DatePicker, { DateObject } from "react-multi-date-picker";

import axios from "axios"
import Logo from "./Logo";
import Sidebar from "./SideBar";
import Username from "./Admin_User_name";
import "./CSS/Structure_Stylesheet.css"
import "./CSS/Tour_Package.css"

function Edit_Tour_Package() 
{

    const { id } = useParams();
    const [data,setData] = useState([])
    const tourtitle = useRef();
    const tourlocation = useRef();
    const tourduration = useRef();
    const tourdescription = useRef();
    const tourprice = useRef();
    const discount_Rate =  useRef();
    const [maxSeats, setMaxSeats] = useState("");
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [dates, setDates] = useState([]);
    const [tour_date , set_tour_date] = useState([])
    const [datesChanged, setDatesChanged] = useState(false);

    useEffect(() => 
    {
    axios
      .get(`http://localhost:5000/Editpackages/${id}`)
      .then((res) => 
        {
            setData(res.data);
        })
        .catch((err) =>
        {
            console.log(err);
        })
    }, [id]);

    useEffect(() => 
    {
    axios
      .get(`http://localhost:5000/package_dates/${id}`)
      .then((res) => 
        {
            set_tour_date(res.data);
        })
        .catch((err) =>
        {
            console.log(err);
        })
    }, [id]);

    useEffect(() => 
    {
        if (tour_date.length > 0) 
        {
            const formattedDates = tour_date.map(d => new DateObject({date: d.start_date,format: "YYYY-MM-DD" }));
            setDates(formattedDates);
        }
    }, [tour_date]);

    const handleclick = (e) => 
    {
        e.preventDefault();

        let title = tourtitle.current.value
        let location = tourlocation.current.value
        let duration = tourduration.current.value
        let description = tourdescription.current.value
        let price = tourprice.current.value
        let dis = discount_Rate.current.value

        const formdata = new FormData();
        formdata.append("tourtitle", title)
        formdata.append("tourlocation", location)
        formdata.append("tourduration", duration)
        formdata.append("tourdescription", description)
        formdata.append("tourprice", price)
        formdata.append("discount" , dis)
        formdata.append("tourimg", file)

        if (datesChanged) 
        {
            dates.forEach(date => {formdata.append("start_dates", date.format("YYYY-MM-DD")); });
        }

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
        axios
            .put(`http://localhost:5000/Editpackages/${id}`, formdata)
            .then((res) => 
            {
                if (res.status == 200) 
                    {
                    const json = res.data;

                    if (json.status == "success") 
                    {
                        alert("Package Edited Successfully")
                    }
                    else 
                    {
                        alert("Package Not Edited")
                    }
                }
            })
            .catch((err) => 
            {
                alert(err)
            })
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
                                    <Link to={"/view-package"} id="view_Package_Link">Back</Link>
                                </div>
                            </center>

                            <h2 id="Page_header">Edit Packages</h2> <br />
                            {
                                data.map((row) => {
                                    return (

                                        <form>
                                            <div className="row">
                                                <div className="col-sm-5">
                                                    <label htmlFor="">Title :</label>
                                                    <input type="text" ref={tourtitle} className="form-control" defaultValue={row.title}/>
                                                </div>
 
                                                <div className="col-sm-4">
                                                    <label htmlFor="">Location :</label>
                                                    <input type="text" ref={tourlocation} className="form-control"defaultValue={row.location}/>
                                                </div>

                                                <div className="col-sm-3">
                                                    <label htmlFor="">Duration :</label>
                                                    <input type="text" ref={tourduration} className="form-control"defaultValue={row.duration} />
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-sm-12">
                                                    <label htmlFor="">Description:</label>
                                                    <textarea className="form-control" rows={5} ref={tourdescription}  defaultValue={row.description}  />
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-sm-5">
                                                    <label htmlFor="">Price:</label>
                                                    <input type="text" className="form-control" ref={tourprice}defaultValue={row.price} /><br />
                           
                                                    <label htmlFor="">Discount :</label>
                                                    <select className="form-control"defaultValue={row.discount}ref={discount_Rate}>
                                                        <option value="0">0</option>
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

                                                    <label htmlFor="">Main Image:</label>
                                                    <input type="file" onChange={handleImage} className="form-control" /> <br /> <br />

                                                    <button type="button"className="btn btn-primary btn-lg" id="Add_Package_btn" onClick={handleclick}>Update Package</button>
                                                </div>

                                                <div className="col-sm-1"></div>

                                                <div className="col-sm-6" id="preview_image">
                                                    <center>
                                                        <img  src={ preview ? preview : `http://localhost:5000/uploads/pakage/${row.main_image}`}/>
                                                    </center>
                                                </div>
                                            </div>
                                        </form>
                                    );
                                })}

                        </div>
                    </div>
                </div>
            </div><br />
        </>
    )
}

export default Edit_Tour_Package;