import React from "react";
import { useState, useEffect } from "react";
import { Box } from "@mui/material";
// import AccordionDash from '../components/AccordionDash';
import { Grid } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { CardActionArea } from "@mui/material";
import { Typography } from "@mui/material";
// import StorefrontIcon from '@mui/icons-material/Storefront';
import Button from "@mui/material/Button";
import CardMedia from "@mui/material/CardMedia";
import Navbar from "../../content/Navbar";
import Sidenav from "../../content/Sidenav";
import axios from "axios";
import backgroundImage from "../../content/dash.PNG";
import { useNavigate } from "react-router-dom";

const drawerWidth = 240;

export default function StudentDashBoard1() {
  const [userData, setUserData] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post("http://localhost:8081/userData", {
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

  return (
    <>
      <div
        style={{
          minHeight: "100vh",
          background: "#ECEFF1",
          background:
            "linear-gradient(158deg, rgba(224, 224, 224,) 0%, rgba(233, 237, 254) 100%)",
        }}
      >
        <Navbar />
        <Box height={20} />
        <Box sx={{ display: "flex" }}>
          <Sidenav />
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              p: 3,
              width: { sm: `calc(100% - ${drawerWidth}px)` },
            }}
          >
            <Grid container spacing={2}>
              <Grid item lg={10} md={9} xs={12} sm={12}>
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    {/* <Card sx={{height:180}}>
                                    <CardMedia
                                        component="img"
                                        alt="Background Image"
                                        height="100%"
                                        width="100%" // Use 100% height to cover the entire Card
                                        image={backgroundImage}
                                    />
                                    </Card> */}
                    <Card sx={{ position: "relative", height: 180 }}>
                      <CardMedia
                        component="img"
                        alt="Background Image"
                        height="100%"
                        width="100%" // Use 100% height to cover the entire Card
                        image={backgroundImage}
                        sx={{
                          objectFit: "cover", // Make sure the image covers the entire space
                        }}
                      />
                      <div
                        style={{
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                          textAlign: "left",
                          width: "100%",
                        }}
                      >
                        <Typography
                          gutterBottom
                          variant="h5"
                          component="div"
                          sx={{
                            color: "#ffffff",
                            mt: "10px",
                            ml: "20px", // Adjust ml for Typography
                          }}
                        >
                          Welcome {userData.fname}
                        </Typography>
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
                          onClick={() => {
                            navigate("/Student-Profile-View");
                          }}
                        >
                          <Typography
                            sx={{
                              fontWeight: "bold",
                              fontSize: "1rem",
                              color: "#FFFFFF",
                            }}
                          >
                            {" "}
                            View Profile
                          </Typography>
                        </Button>
                      </div>
                    </Card>
                  </Grid>
                </Grid>
                <Box height={20} />
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={4}>
                    <Card
                      sx={{
                        maxWidth: 345,
                        boxShadow: "0 4px 4px rgba(0, 0, 0, 0.1)",
                        position: "relative",
                        transition: "transform 0.2s",
                        ":hover": { transform: "scale(1.04)" },
                        backgroundColor: "#F3EDFB",
                      }}
                      onClick={() => {
                        navigate("/Student-GPA-Calculator");
                      }}
                    >
                      <CardActionArea>
                        <CardMedia
                          component="img"
                          height="140"
                          image="https://img.freepik.com/premium-photo/office-table-with-calculator-pen_127657-5701.jpg?w=1060"
                        />
                        <CardContent>
                          <Typography
                            gutterBottom
                            variant="h5"
                            component="div"
                            align="left"
                            sx={{
                              zIndex: 1,
                              fontWeight: "bold",
                              fontSize: "1.5rem",
                              color: "#7d09b3",
                            }}
                          >
                            Calculate GPA
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Card
                      sx={{
                        maxWidth: 345,
                        boxShadow: "0 4px 4px rgba(0, 0, 0, 0.1)",
                        position: "relative",
                        transition: "transform 0.2s",
                        ":hover": { transform: "scale(1.04)" },
                        backgroundColor: "#F3EDFB",
                      }}
                      onClick={() => {
                        navigate("/Student-Mentor");
                      }}
                    >
                      <CardActionArea>
                        <CardMedia
                          component="img"
                          height="140"
                          image="https://images.pexels.com/photos/6325975/pexels-photo-6325975.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                        />
                        <CardContent>
                          <Typography
                            gutterBottom
                            variant="h5"
                            component="div"
                            align="left"
                            sx={{
                              zIndex: 1,
                              fontWeight: "bold",
                              fontSize: "1.5rem",
                              color: "#7d09b3",
                            }}
                          >
                            Your Mentor
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Card
                      sx={{
                        maxWidth: 345,
                        boxShadow: "0 4px 4px rgba(0, 0, 0, 0.1)",
                        position: "relative",
                        transition: "transform 0.2s",
                        ":hover": { transform: "scale(1.04)" },
                        backgroundColor: "#F3EDFB",
                      }}
                      onClick={() => {
                        navigate("/Student-Personality-Test");
                      }}
                    >
                      <CardActionArea>
                        <CardMedia
                          component="img"
                          height="140"
                          image="https://www.personalityperfect.com/wp-content/uploads/2015/10/brain250.jpg"
                        />
                        <CardContent>
                          <Typography
                            gutterBottom
                            variant="h5"
                            component="div"
                            align="left"
                            sx={{
                              zIndex: 1,
                              fontWeight: "bold",
                              fontSize: "1.5rem",
                              color: "#7d09b3",
                            }}
                          >
                            Personality Test
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </Grid>
                </Grid>
                <Box height={20} />
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={4}>
                    <Card
                      sx={{
                        maxWidth: 345,
                        boxShadow: "0 4px 4px rgba(0, 0, 0, 0.1)",
                        position: "relative",
                        transition: "transform 0.2s",
                        ":hover": { transform: "scale(1.04)" },
                        backgroundColor: "#F3EDFB",
                      }}
                      onClick={() => {
                        navigate("/Student-Personality-Types");
                      }}
                    >
                      <CardActionArea>
                        <CardMedia
                          component="img"
                          height="140"
                          image="https://www.cloverpop.com/hubfs/iStock-1218796215.jpg"
                        />
                        <CardContent>
                          <Typography
                            gutterBottom
                            variant="h5"
                            component="div"
                            align="left"
                            sx={{
                              zIndex: 1,
                              fontWeight: "bold",
                              fontSize: "1.5rem",
                              color: "#7d09b3",
                            }}
                          >
                            Personality Types
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Card
                      sx={{
                        maxWidth: 345,
                        boxShadow: "0 4px 4px rgba(0, 0, 0, 0.1)",
                        position: "relative",
                        transition: "transform 0.2s",
                        ":hover": { transform: "scale(1.04)" },
                        backgroundColor: "#F3EDFB",
                      }}
                      onClick={() => {
                        navigate("/Student-Stress-Free");
                      }}
                    >
                      <CardActionArea>
                        <CardMedia
                          component="img"
                          height="140"
                          image="https://cdn.tinybuddha.com/wp-content/uploads/2015/10/Calm-Man.jpg"
                        />
                        <CardContent>
                          <Typography
                            gutterBottom
                            variant="h5"
                            component="div"
                            align="left"
                            sx={{
                              zIndex: 1,
                              fontWeight: "bold",
                              fontSize: "1.5rem",
                              color: "#7d09b3",
                            }}
                          >
                            Stress Management
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Card
                      sx={{
                        maxWidth: 345,
                        boxShadow: "0 4px 4px rgba(0, 0, 0, 0.1)",
                        position: "relative",
                        transition: "transform 0.2s",
                        ":hover": { transform: "scale(1.04)" },
                        backgroundColor: "#F3EDFB",
                      }}
                      onClick={() => {
                        navigate("/Student-Resources");
                      }}
                    >
                      <CardActionArea>
                        <CardMedia
                          component="img"
                          height="140"
                          image="https://img.freepik.com/premium-photo/office-table-with-calculator-pen_127657-5701.jpg?w=1060"
                        />
                        <CardContent>
                          <Typography
                            gutterBottom
                            variant="h5"
                            component="div"
                            align="left"
                            sx={{
                              zIndex: 1,
                              fontWeight: "bold",
                              fontSize: "1.5rem",
                              color: "#7d09b3",
                            }}
                          >
                            Resources
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </div>
    </>
  );
}
