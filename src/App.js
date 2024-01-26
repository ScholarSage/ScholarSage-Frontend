import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./formcontrol/login";
import Register from "./formcontrol/Register";
import MentorSignup from "./formcontrol/mentor/mentorRegister";
import StudentSignup from "./formcontrol/student/studentRegister";
// import StudentDashBoard from "./formcontrol/student/StudentDashBoard";
import MentorDashBoard from "./formcontrol/mentor/MentorDashBoard";
import ForgotPassword from "./formcontrol/forgotPassword";
import StudentDashBoard1 from "./formcontrol/student/StudentDashBoard1";
import PersonalityTest from "./formcontrol/student/PersonailtyTest";
import Mentor from "./formcontrol/student/Mentor";
import PersonalityTypes from "./formcontrol/student/PersonalityTypes";
import StressFree from "./formcontrol/student/StressFree";
import Resources from "./formcontrol/student/Resources";
import GPA from "./formcontrol/student/GPA";

//mui imports
import Paper from "@mui/material/Paper";
//import Box from "@mui/material/Box";
//import TextField from "@mui/material/TextField";

//import { useState } from "react";

//import Signup from "./formcontrol/student/studentRegister";
//import mtsignup from "./formcontrol/mentor/mentorRegister";

function App() {
  return (
    <Router>
      <div className="App">
        <Paper elevation={3}>
          <Routes>
            <Route path="/stReg" element={<StudentSignup />} />
            <Route path="/mtReg" element={<MentorSignup/>} />
            <Route path="/Reg" element={<Register />} />
            <Route exact path="/" element={<Login />} /> 
            <Route path="/forgot-password" element={<ForgotPassword/>}/>
            <Route path="/Student-Dashboard" element={<StudentDashBoard1 />} />
            <Route path="/Mentor-Dashboard" element={<MentorDashBoard />} />
            <Route path="/Student-Personality-Test" element={<PersonalityTest />} />
            <Route path="/Student-GPA-Calculator" element={<GPA />} />
            <Route path="/Student-Mentor" element={<Mentor />} />
            <Route path="/Student-Personality-Types" element={<PersonalityTypes />} />
            <Route path="/Student-Stress-Free" element={<StressFree />} />
            <Route path="/Student-Resources" element={<Resources />} />
          </Routes>
        </Paper>
      </div>
    </Router>
  );
}

export default App;
