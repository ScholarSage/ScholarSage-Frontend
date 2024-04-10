import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

function Mentor({ mentor }) {
  const navigate = useNavigate;

  return (
    <div>
      <Button
        variant="contained"
        sx={{
          color: "#ffffff",
          mt: "60px",
          ml: "10px", // Adjust ml for Button
          bgcolor: "#A3CF23 ",
          "&:hover": { bgcolor: "#0f8544" },
          borderRadius: "15px",
        }}
        onClick={() => navigate("/book-appointment/student._id")}
      ></Button>
    </div>
  );
}

export default Mentor;
