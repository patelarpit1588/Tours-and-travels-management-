import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import "bootstrap/dist/css/bootstrap.min.css";
import AppRoutes from './Routes/AppRoutes.jsx';

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <AppRoutes />
//   </StrictMode>
// )

createRoot(document.getElementById('root')).render(
<div style={{ width: "100%", padding: 0, margin: 0 }}>
  <AppRoutes />
</div>
)

