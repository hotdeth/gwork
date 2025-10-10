import { BrowserRouter, Routes, Route } from "react-router-dom";

import Tasks from "../pages/Tasks";
import ProtectedRoute from "../components/ProtectedRoute";
import Home from "../components/Home";
import Register from "../pages/Register";
import Login from "../pages/Login"; 

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />   
        <Route path="/register" element={<Register />} />
        

        {/* Protected routes */}
        <Route
          path="/tasks"
          element={
            <ProtectedRoute>
              <Tasks/>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
