import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../component/Login.jsx"
import Dashboard from "../component/Dashboard.jsx"
import View_Package_Summary from "../component/View_Package_Summary.jsx";
import Tour_Booking from "../component/Tour_Booking.jsx";
import Tour_Passanger from "../component/Tour_Passanger.jsx";
import Tour_Booking_Cancle from "../component/Tour_Booking_Cancle.jsx";
import Tour_Booking_Pending from "../component/Tour_Booking_Pending.jsx";
import Tour_Booking_Confirm from "../component/Tour_Booking_Confirm.jsx";
import Tour_Enquiry from "../component/Tour_Enquiry.jsx";
import Enquiry_reply from "../component/Tour_Enquiry_Replay_Form.jsx";
import Tour_Pending_Enquiry from "../component/Tour_Enquiry_Pending.jsx";
import Tour_Replied_Enquiry from "../component/Tour_Enquiry_Replied.jsx";
import Tour_Images from "../component/Tour_Images.jsx";
import Tour_Package from "../component/Tour_Package.jsx";
import View_Packages from "../component/View_Packages.jsx";
import Tour_Review from "../component/Tour_Review.jsx";
import Tour_Users from "../component/Tour_Users.jsx"
import View_Tour_Images from "../component/View_Tour_Images.jsx";
import Edit_Tour_Package from "../component/Edit_Tour_Package.jsx";
import Tour_All_Passanger from "../component/View_All_Passangers.jsx";
import Tour_All_Active_Passanger from "../component/View_All_Active_Passangers.jsx";
import Tour_All_Cancelled_Passanger from "../component/View_All_Cancelled_Passangers.jsx";
import Tour_All_Payments from "../component/View_All_Payment.jsx";

import Tour_seats from "../component/Tour_Seats.jsx";
import Edit_Tour_Package_Seats from "../component/Edit_Tour_Seats.jsx";

import ProtectedRoute from "./ProtectedRoute.jsx";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"                 element={<Login />} />
        <Route path="/dashboard"        element={<ProtectedRoute> <Dashboard /> </ProtectedRoute>} />
        <Route path="/package-summary/:id"        element={<ProtectedRoute> <View_Package_Summary /> </ProtectedRoute>} />

        <Route path="/tour-package"     element={<ProtectedRoute> <Tour_Package /> </ProtectedRoute>} />
        <Route path="/edit-package/:id" element={<ProtectedRoute> <Edit_Tour_Package/> </ProtectedRoute>} />
        <Route path="/view-package"     element={<ProtectedRoute> <View_Packages/> </ProtectedRoute>} />
        <Route path="/package_seats/:id" element={<ProtectedRoute> <Tour_seats/> </ProtectedRoute>} />
        <Route path="/edit-package_seats/:id" element={<ProtectedRoute> <Edit_Tour_Package_Seats/> </ProtectedRoute>} />



        <Route path="/tour-reviews"     element={<ProtectedRoute> <Tour_Review />  </ProtectedRoute>} />
        <Route path="/tour-users"       element={<ProtectedRoute> <Tour_Users />   </ProtectedRoute>} />

        <Route path="/tour-enquiry"             element={<ProtectedRoute> <Tour_Enquiry /> </ProtectedRoute>} />
        <Route path="/tour-pending-enquiry"     element={<ProtectedRoute> <Tour_Pending_Enquiry /> </ProtectedRoute>} />
        <Route path="/tour-replied-enquiry"     element={<ProtectedRoute> <Tour_Replied_Enquiry /> </ProtectedRoute>} />
        <Route path="/enquiry-replay/:id"       element={<ProtectedRoute> <Enquiry_reply/> </ProtectedRoute>} />

        <Route path="/tour-booking"       element={<ProtectedRoute> <Tour_Booking /> </ProtectedRoute>} />
        <Route path="/view-passanger/:id" element={<ProtectedRoute> <Tour_Passanger/> </ProtectedRoute>}/>
        <Route path="/cancle-bookings"    element={<ProtectedRoute> <Tour_Booking_Cancle/> </ProtectedRoute>}/>
        <Route path="/confirm-bookings"   element={<ProtectedRoute> <Tour_Booking_Confirm/> </ProtectedRoute>}/>
        <Route path="/pending-bookings"   element={<ProtectedRoute> <Tour_Booking_Pending/> </ProtectedRoute>}/>

        <Route path="/all-passanger"   element={<ProtectedRoute> <Tour_All_Passanger/> </ProtectedRoute>}/>
        <Route path="/all-active-passanger"   element={<ProtectedRoute> <Tour_All_Active_Passanger/> </ProtectedRoute>}/>
        <Route path="/all-cancelled-passanger"   element={<ProtectedRoute> <Tour_All_Cancelled_Passanger/> </ProtectedRoute>}/>

        <Route path="/all-payments"   element={<ProtectedRoute> <Tour_All_Payments/> </ProtectedRoute>}/>

        <Route path="/view-images"      element={<ProtectedRoute> <View_Tour_Images/> </ProtectedRoute>} />
        <Route path="/tour-images/:id"  element={<ProtectedRoute> <Tour_Images /> </ProtectedRoute>} />

      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;