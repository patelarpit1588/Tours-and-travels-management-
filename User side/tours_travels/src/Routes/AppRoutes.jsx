import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../component/Login.jsx"
import Register from "../component/Registration.jsx";
import Homepage from "../component/Homepage.jsx";
import About from "../component/About_Us.jsx";
import Show_Packages from "../component/Show_Packages.jsx";
import View_More from "../component/View_More.jsx";
import Tour_Booking from "../component/Tour_Booking.jsx";
import Show_My_Enquiry from "../component/Show_My_Enquiry.jsx";
import Show_My_Bookings from "../component/Show_My_Bookings.jsx";
import Show_My_Payment_History from "../component/Show_My_Payment_History.jsx";

import Tour_Refunds from "../component/Cancallation.jsx";
import Tour_Payment from "../component/Payment.jsx";
import Tour_Review from "../component/Review.jsx";


function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"element={<Homepage />} />
        <Route path="/packages"element={<Show_Packages/>} />
        <Route path="/AboutUs"element={<About/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register/>} />

        <Route path="/my-bookings" element={<Show_My_Bookings/>} />
        <Route path="/my-enquiry" element={<Show_My_Enquiry/>} />
        <Route path="/payment-history" element={<Show_My_Payment_History/>} />
        <Route path="/tour-cancle_refunds/:id" element={<Tour_Refunds/>} />

        <Route path="/tourPayment/:id" element={<Tour_Payment/>} />

        <Route path="/packages/:id"element={<Show_Packages/>} />
        
        <Route path="/packagedetails/:id" element={<View_More />} />
        <Route path="/packageImages/:id" element={<View_More/> } />
        <Route path="/packageReview/:id" element={<View_More/>} />

        <Route path="/addreview/:id" element={<Tour_Review/>} />

        <Route path="/tourbooking/:id" element={<Tour_Booking />} />

      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;