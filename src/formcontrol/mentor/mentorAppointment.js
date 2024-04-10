import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import axios from "axios";
import { Table } from "antd";
import moment from "moment";

function MentorAppointments() {
  const [appointments, setAppointments] = useState([]);
  //const [time, setTime] = useState();
  const dispatch = useDispatch();

  const getAppointmentsData = async () => {
    try {
      const response = await axios.get("get-appointments-by-mentor-id");
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

  const changeAppointmentStatus = async (record, status) => {
    try {
      const response = await axios.post(
        "/api/mentor/change-appointment-status",
        {
          appointmentId: record.mentorid,
          status: status,
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        getAppointmentsData();
      }
    } catch (error) {
      toast.error("error changing mentor account status");
    }
  };

  const columns = [
    {
      title: "Id",
      dataIndex: "_id",
    },
    {
      title: "Student",
      dataIndex: "name",
      render: (text, record) => (
        <span>
          {record.studentInfo.fname}
          {record.studentInfo.lname}
        </span>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
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
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          {record.status === "pending" && (
            <div className="d-flex">
              <h1
                className="anchor"
                onClick={() => changeAppointmentStatus(record, "approved")}
              >
                Approve
              </h1>

              <h1
                className="anchor"
                onClick={() => changeAppointmentStatus(record, "rejected")}
              >
                Reject
              </h1>
            </div>
          )}
        </div>
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

export default MentorAppointments;
