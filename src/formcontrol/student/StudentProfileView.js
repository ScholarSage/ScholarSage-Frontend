import * as React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import Navbar from "../../content/Navbar";
import Sidenav from "../../content/Sidenav";



//mui imports





const StudentProfileView = () => {
  const [studentDetails, setStudentDetails] = useState({});

useEffect(() => {
//student details backend ApI
    axios.get('http://your-backend-api-url/student-details')
      .then(response => {
        setStudentDetails(response.data);
      })
      .catch(error => {
      //  console.error('Error fetching student details:', error);
     });
  }, []);


  return (
    <div>
      <h2>Student Profile</h2>
      <p><strong>Name:</strong> {studentDetails.name}</p>
      <p><strong>Register Date:</strong> {studentDetails.registerDate}</p>
      <p><strong>Academic Year:</strong> {studentDetails.academicYear}</p>
      <p><strong>Index No:</strong> {studentDetails.indexNo}</p>
      <p><strong>Birthday:</strong> {studentDetails.birthday}</p>
    </div>
  );
};

export default StudentProfileView;