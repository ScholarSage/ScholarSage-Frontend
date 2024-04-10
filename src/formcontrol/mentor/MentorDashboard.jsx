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
import axios from "axios";
import backgroundImage from "../../content/dash.PNG";
import { useNavigate } from "react-router-dom";
import Layout from "../../content/NavbarSidenavLayout";

const drawerWidth = 240;

export default function MentorDashBoard() {
  const [userData, setUserData] = useState("");
  window.localStorage.setItem("User", "Mentor");
  // const navigate = useNavigate();

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.post("http://localhost:8081/userData", {
  //         token: window.localStorage.getItem("token"),
  //       });

  //       const data = response.data;
  //       console.log(data, "userData");
  //       setUserData(data.data);

  //       if (data.data === "token expired") {
  //         alert("Token expired login again");
  //         window.localStorage.clear();
  //         window.location.href = "./";
  //       }
  //     } catch (error) {
  //       console.error("Error fetching user data:", error);
  //     }
  //   };

  //   fetchData();
  const getData=async()=>{
    try {
      const response = await axios.post("http://localhost:8081/userData",{},
      {
        headers : {
          Authorization : "Bearer " + localStorage.getItem("token")
        }
      })
      console.log(response.data);
      setUserData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  }


  // const [userData, setUserData] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // const fetchData = async () => {
    //   try {
    //     const response = await axios.post("http://localhost:8081/userData", {
    //       token: window.localStorage.getItem("token"),
    //     });

    //     const data = response.data;
    //     console.log(data, "userData");
    //     setUserData(data.data);

    //     if (data.data === "token expired") {
    //       alert("Token expired login again");
    //       window.localStorage.clear();
    //       window.location.href = "./";
    //     }
    //   } catch (error) {
    //     console.error("Error fetching user data:", error);
    //   }
    // };

    // fetchData();
    getData();
  }, []); // empty dependency array means useEffect runs once after the initial render

  return (
    <Layout>
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
                            navigate("");
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
                <Grid container spacing={1}>
                  <Grid item xs={12} lg={6}>
                    <Card
                      sx={{
                        //maxWidth: 345,
                        boxShadow: "0 4px 4px rgba(0, 0, 0, 0.1)",
                        position: "relative",
                        transition: "transform 0.2s",
                        ":hover": { transform: "scale(1.04)" },
                        backgroundColor: "#F3EDFB",
                      }}
                      onClick={() => {
                        navigate("/Mentor-My-Studnets");
                      }}
                    >
                      <CardActionArea>
                        <CardMedia
                          component="img"
                          height="120"
                          image="https://previews.123rf.com/images/dolgachov/dolgachov1812/dolgachov181200486/113368901-group-of-students-over-university-background.jpg"
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
                            My Students
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Card
                      sx={{
                        //maxWidth: 345,
                        boxShadow: "0 4px 4px rgba(0, 0, 0, 0.1)",
                        position: "relative",
                        transition: "transform 0.2s",
                        ":hover": { transform: "scale(1.04)" },
                        backgroundColor: "#F3EDFB",
                      }}
                      onClick={() => {
                        navigate("/Mentor-Personality-Types");
                      }}
                    >
                      <CardActionArea>
                        <CardMedia
                          component="img"
                          height="120"
                          image="https://www.aspenwealthmgmt.com/wp-content/uploads/2019/12/What-is-Your-Money-Personality.jpg"
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
                            Personality Guide
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </Grid>
                </Grid>
              </Grid>
              {/* <Grid item lg={2} md={3} xs={12} sm={12}>
                <Card>
                    <CardContent></CardContent>
                </Card>
              </Grid> */}
            </Grid>
    </Layout>
  );
}
