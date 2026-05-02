import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import "bootstrap/dist/css/bootstrap.min.css";
import AppRoutes from './Routes/AppRoutes.jsx';

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <AppRoutes />
//   </StrictMode>
// )

createRoot(document.getElementById('root')).render(
<div className="container-fluid">
  <AppRoutes/>
</div>
)

