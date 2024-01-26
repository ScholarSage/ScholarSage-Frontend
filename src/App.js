import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./formcontrol/login";
import Register from "./formcontrol/Register";
import MentorSignup from "./formcontrol/mentor/mentorRegister";
import StudentSignup from "./formcontrol/student/studentRegister";
import StudentDashBoard from "./formcontrol/student/StudentDashBoard";
import MentorDashBoard from "./formcontrol/mentor/MentorDashBoard";
import ForgotPassword from "./formcontrol/forgotPassword";

//mui imports
import Paper from "@mui/material/Paper";
//import Box from "@mui/material/Box";
//import TextField from "@mui/material/TextField";

//import { useState } from "react";

//import Signup from "./formcontrol/student/studentRegister";
//import mtsignup from "./formcontrol/mentor/mentorRegister";

import Modal from "react-modal";
Modal.setAppElement("#root");

function App() {
  return (
    <Router>
      <div className="App">
        <Paper elevation={3}>
          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route path="/stReg" element={<StudentRegister />} />
            <Route path="/mtReg" element={<MentorRegister />} />
            <Route path="/Reg" element={<Register />} />
            <Route exact path="/" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/Student-Dashboard" element={<StudentDashBoard />} />
            <Route path="/Mentor-Dashboard" element={<MentorDashBoard />} />
          </Routes>
        </Paper>
      </div>
    </Router>
  );
}

export default App;
