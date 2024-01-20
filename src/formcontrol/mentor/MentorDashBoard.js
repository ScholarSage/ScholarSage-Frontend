import React, { useState, useEffect } from "react";
import axios from "axios";

export default function MentorDashBoard() {
  const [userData, setUserData] = useState("");
  const [tokenExpired, setTokenExpired] = useState(false);

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
          setTokenExpired(true);
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

  // Redirect if the token is expired
  useEffect(() => {
    if (tokenExpired) {
      alert("Token expired, login again");
      window.localStorage.clear();
      window.location.href = "./";
    }
  }, [tokenExpired]);

  if (tokenExpired) {
    return null; // Render nothing while redirecting
  }

  return (
    <div>
      <h1>Mentor</h1>
      Name<h1>{userData.fname}</h1>
      Email<h1>{userData.email}</h1>
      <br />
      <button onClick={logout} className="btn btn-primary">
        Log Out
      </button>
    </div>
  );
}
