import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
//import logo from "./content/logo2.png";

//mui imports
import Paper from "@mui/material/Paper";
//import Box from "@mui/material/Box";
//import TextField from "@mui/material/TextField";

//import { useState } from "react";

import Login from "./formcontrol/login";
import Signup from "./formcontrol/student/studentRegister";

function App() {
  return (
    <Router>
      <div className="App">
        <Paper elevation={3}>
          <Routes>
            <Route path="/stReg" element={<Signup />} />
            <Route exact path="/" element={<Login />} />
            {/* <Route path="/mentorReg" element={<mtsignup />} /> */}
          </Routes>
        </Paper>
      </div>
    </Router>
  );
}

export default App;
