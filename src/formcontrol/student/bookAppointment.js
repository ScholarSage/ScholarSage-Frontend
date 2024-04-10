import React, { useEffect, useState } from "react";
//import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import { Row, Col, DatePicker, TimePicker } from "antd";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function BookAppointment() {
  const [date, setDate] = useState();
  const [time, setTime] = useState();
  const [isAvailable, setIsAvailable] = useState();

  const params = useParams();

  const getMentorData = async () => {
    try {
      // const response=await axios.get()
    } catch (error) {
      console.log(error);
    }
  };

  const bookNow = async () => {
    setIsAvailable(false);
    try {
      const response = await axios.post("api/student/book-appointment", {
        scnumber: params.scnumber,
        date: date,
        time: time,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const checkAvailability = async () => {
    try {
      const response = await axios.post(
        "api/student/check-booking-availability",
        {
          scnumber: params.mentorid,
          date: date,
          time: time,
        }
      );
      if (response.data.success) {
        // toast.success(response.data.message);
        setIsAvailable(true);
      } else {
        //toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMentorData();
  }, []);

  return (
    <div>
      <div>
        <h1>hello</h1>
      </div>

      <div>
        <h1 className="page-title"></h1>
        <Row>
          <Col span={8} sm={24} xs={24} lg={8}>
            <p>Timings:</p>
            <div className="d-flex flex-column pt-2">
              <DatePicker
                format="DD-MM-YYYY"
                onChange={(value) => {
                  setIsAvailable(false);
                  setDate(moment(value).format("DD-MM-YYYY"));
                }}
              />
              <TimePicker
                format="HH:mm"
                className="mt-3"
                onChange={(value) => {
                  setIsAvailable(false);
                  setTime(moment(value).format("HH:mm"));
                }}
              />
              <button onClick={checkAvailability}>Check availability</button>
              {isAvailable && <button onClick={bookNow}>Book now</button>}
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default BookAppointment;
