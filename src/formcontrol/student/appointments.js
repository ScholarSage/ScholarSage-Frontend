import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, Provider } from "react-redux";
import axios from "axios";
import { Table } from "antd";
import moment from "moment";

function Appointments() {
  const [appointments, setAppointments] = useState([]);
  //const [time, setTime] = useState();
  //const dispatch = useDispatch();
  const [userData, setUserData] = useState("");
  window.localStorage.setItem("User", "Student");

  const getAppointmentsData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8081/get-appointments-student",
        {},
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      console.log(response.data);
      setUserData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAppointmentsData();
  }, []);

  const columns = [
    {
      title: "Id",
      dataIndex: "_id",
    },
    {
      title: "Mentor",
      dataIndex: "name",
      render: (text, record) => (
        <span>
          {record.mentorInfo.fname}
          {record.mentorInfo.lname}
        </span>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Phone Number",
      dataIndex: "contactNumber",
    },
    {
      title: "Date & Time",
      dataIndex: "email",
      render: (text, record) => (
        <span>
          {moment(record.date).format("DD-MM-YYYY")}
          {moment(record.time).format("HH:mm")}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
    },
  ];

  return (
    <div>
      <h1>Appointments</h1>
      <Table columns={columns} dataSource={appointments} />
    </div>
  );
}

export default Appointments;
