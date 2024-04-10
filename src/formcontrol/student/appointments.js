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

  const getAppointmentsData = async () => {
    try {
      const response = await axios.get(
        "api/mentor/get-appointments-by-student-id"
      );
      if (response.data.success) {
        setAppointments(response.data.data);
      }
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
      title: "Status",
      dataIndex: "status",
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
  ];

  return (
    <div>
      <h1>Appointments</h1>
      <Table columns={columns} dataSource={appointments} />
    </div>
  );
}

export default Appointments;
