import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./formcontrol/login";
import Register from "./formcontrol/Register";
import MentorSignup from "./formcontrol/mentor/mentorRegister";
import StudentSignup from "./formcontrol/student/studentRegister";

//mui imports
import Paper from "@mui/material/Paper";

function App() {
  return (
    <Router>
      <div className="App">
        <Paper elevation={3}>
          <Routes>
            <Route path="/stReg" element={<StudentSignup />} />
            <Route path="/mtReg" element={<StudentSignup/>} />
            <Route path="/Reg" element={<Register />} />
            <Route exact path="/" element={<Login />} /> 
          </Routes>
        </Paper>
      </div>
    </Router>
  );
}

export default App;
