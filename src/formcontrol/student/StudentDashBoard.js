import React, { useState, useEffect } from "react";
import axios from "axios";

export default function StudentDashBoard() {
  const [userData, setUserData] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post("http://localhost:5000/userData", {
          token: window.localStorage.getItem("token"),
        });

        const data = response.data;
        console.log(data, "userData");
        setUserData(data.data);

        if (data.data === "token expired") {
          alert("Token expired login again");
          window.localStorage.clear();
          window.location.href = "./";
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []); // empty dependency array means useEffect runs once after the initial render

  const logout = () => {
    window.localStorage.clear();
    window.location.href = "./";
  };

  return (
    <div>
      <h1>Student</h1>
      Name<h1>{userData.fname}</h1>
      Email<h1>{userData.email}</h1>
      <br />
      <button onClick={logout} className="btn btn-primary">
        Log Out
      </button>
    </div>
  );
}
