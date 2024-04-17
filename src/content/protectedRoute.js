import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useffect } from "react";
import { useDispatch, useselector } from "react-redux";
import axios from "axios";
import { setuser, reloaduserData } from "../redux/alertsSlice";
import { showloading, hideloading } from ". /redux/alertsslice";

function ProtectedRoute(props) {
  const { user, reloaduser } = useselector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getuser = async () => {
    try {
      dispatch(showloading());
      const response = await axios.post(
        "/api/user/get-user-info-by-id",
        { token: localstorage.getItem("token") },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideloading());
      if (response.data.success) {
        dispatch(setuser(response.data.data));
        // dispatch(reloaduserData(false));
      } else {
        localstorage.clear();
        navigate("/login");
      }
    } catch (error) {
      dispatch(hideloading());
      localstorage.clear();
      navigate("/login");
    }
  };

  useffect(() => {
    if (!user) {
      getuser();
    }
  }, [user]);

  if (localstorage.getItem("token")) {
    return props.children;
  } else {
    return <Navigate to="/login" />;
  }
}
export default ProtectedRoute;
