import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./formcontrol/login";
import Register from "./formcontrol/Register";
import MentorSignup from "./formcontrol/mentor/mentorRegister";
import StudentSignup from "./formcontrol/student/studentRegister";
import StudentDashBoard from "./formcontrol/student/StudentDashBoard1";
import MentorDashBoard from "./formcontrol/mentor/MentorDashboard";
import ForgotPassword from "./formcontrol/forgotPassword";
import PersonalityTesting from "./formcontrol/student/PersonailtyTesting";
import Mentor from "./formcontrol/student/Mentor";
import PersonalityTypes from "./formcontrol/student/PersonalityTypes";
import StressFree from "./formcontrol/student/StressFree";
import Resources from "./formcontrol/student/Resources";
import GPA from "./formcontrol/student/GPA";
import StudentProfileView from "./formcontrol/student/StudentProfileView";
import UpdateProfile from "./formcontrol/student/UpdateProfile";
import PersonalityGuidance from "./formcontrol/mentor/PersonalityGuid";
import MyStudents from "./formcontrol/mentor/MyStudents";

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
            <Route path="/stReg" element={<StudentSignup />} />
            <Route path="/mtReg" element={<MentorSignup />} />
            <Route path="/Reg" element={<Register />} />
            <Route exact path="/" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/Student-Dashboard" element={<StudentDashBoard />} />
            <Route path="/Mentor-Dashboard" element={<MentorDashBoard />} />
            <Route path="/Student-GPA-Calculator" element={<GPA />} />
            <Route path="/Student-Mentor" element={<Mentor />} />
            <Route
              path="/Student-Personality-Testing" element={<PersonalityTesting />}
            />
            <Route path="/Student-Stress-Free" element={<StressFree />} />
            <Route path="/Student-Resources" element={<Resources />} />
            <Route
              path="/Student-Profile-View"
              element={<StudentProfileView />}
            />
            <Route path="/Student-Profile-Update" element={<UpdateProfile />} />


            <Route path="/Mentor-Personality-Types" element={<PersonalityGuidance />} />
            <Route path="/Mentor-My-Studnets" element={<MyStudents />} />
          </Routes>
        </Paper>
      </div>
    </Router>
  );
}

export default App;
