import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Row, Col } from "antd";
//import Layout from "../../content/NavbarSidenavLayout";
import Student from "./student";

export default function MyStudents() {
  const [userData, setUserData] = useState({ students: [] });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(`http://localhost:8081/userData`);
        console.log("API Response:", response.data);
        setUserData({ students: response.data.students });
      } catch (error) {
        console.error("Error fetching student details:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>My Students</h1>
      <Row>
        {userData.students &&
          userData.students.map((student) => (
            <Col span={8} xs={24} sm={24} lg={8} key={student.scnumber}>
              <Student student={student} />
            </Col>
          ))}
      </Row>
    </div>
  );
}
