import React, { useEffect, useState } from "react";
import axios from "axios";
import resourceData from "./resource.json";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import Layout from "../../content/NavbarSidenavLayout";

const Resources = () => {
  const [userData, setUserData] = useState(null);
  const [personalityType, setPersonalityType] = useState(null);
  const [personalityData, setPersonalityData] = useState({}); // initialize as an object
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const response = await axios.post(
          "http://localhost:8081/userData",
          {},
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );
        console.log("Received data:", response.data);
        setUserData(response.data.data);
        setPersonalityType(response.data.data.personalitytype);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    getData();
  }, []);

  useEffect(() => {
    if (personalityType) {
      const flattenedResourceData = resourceData.flat();
      const personalityDataFound = flattenedResourceData.find(
        (personality) => personality.personality === personalityType
      );
      setPersonalityData({ ...personalityData, ...personalityDataFound }); // merge the found data with the existing state
    }
  }, [personalityType]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Layout>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h1 style={{ color: "#42026F" }}>
          Personality Type: {personalityType} ({personalityData.title})
        </h1>
        {personalityData && (
          <div style={{ width: "100%" }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Card
                  style={{
                    backgroundColor: "#F3EDFB",
                    color: "#42026F",
                    margin: "30px",
                  }}
                >
                  {" "}
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      Career Paths
                    </Typography>
                    {personalityData.careerPaths && (
                      <List sx={{ width: "100%" }}>
                        {personalityData.careerPaths.map(
                          (careerPath, index) => (
                            <React.Fragment key={careerPath}>
                              <ListItem>
                                <ListItemText
                                  primary={careerPath}
                                  sx={{ textAlign: "center" }}
                                />
                              </ListItem>
                              {index <
                                personalityData.careerPaths.length - 1 && (
                                <Divider component="li" />
                              )}
                            </React.Fragment>
                          )
                        )}
                      </List>
                    )}
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Card
                  style={{
                    backgroundColor: "#F3EDFB",
                    color: "#42026F",
                    margin: "30px",
                  }}
                >
                  {" "}
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      Skills to Improve
                    </Typography>
                    {personalityData.skillsToImprove && (
                      <List sx={{ width: "100%" }}>
                        {personalityData.skillsToImprove.map((skill, index) => (
                          <React.Fragment key={skill}>
                            <ListItem>
                              <ListItemText
                                primary={skill}
                                sx={{ textAlign: "center" }}
                              />
                            </ListItem>
                            {index <
                              personalityData.skillsToImprove.length - 1 && (
                              <Divider component="li" />
                            )}
                          </React.Fragment>
                        ))}
                      </List>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

            <h2 style={{ textAlign: "center", color: "#42026F" }}>
              Academic Resources
            </h2>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Card
                  style={{
                    backgroundColor: "#F3EDFB",
                    color: "#42026F",
                    margin: "30px",
                  }}
                >
                  {" "}
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      YouTube Channels
                    </Typography>
                    {personalityData.YouTubeChannels && (
                      <List sx={{ width: "100%" }}>
                        {personalityData.YouTubeChannels.map(
                          (channel, index) => (
                            <React.Fragment key={channel.name}>
                              <ListItem>
                                <ListItemText
                                  primary={
                                    <a
                                      href={channel.link}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      style={{
                                        fontWeight: "bold",
                                        textDecoration: "none",
                                      }}
                                    >
                                      {channel.name}
                                    </a>
                                  }
                                  sx={{ textAlign: "center" }}
                                />
                              </ListItem>
                              {index <
                                personalityData.YouTubeChannels.length - 1 && (
                                <Divider component="li" />
                              )}
                            </React.Fragment>
                          )
                        )}
                      </List>
                    )}
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Card
                  style={{
                    backgroundColor: "#F3EDFB",
                    color: "#42026F",
                    margin: "30px",
                  }}
                >
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      Websites
                    </Typography>
                    {personalityData.Websites && (
                      <List sx={{ width: "100%" }}>
                        {personalityData.Websites.map((website, index) => (
                          <React.Fragment key={website.name}>
                            <ListItem>
                              <ListItemText
                                primary={
                                  <a
                                    href={website.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                      fontWeight: "bold",
                                      textDecoration: "none",
                                    }}
                                  >
                                    {website.name}
                                  </a>
                                }
                                sx={{ textAlign: "center" }}
                              />
                            </ListItem>
                            {index < personalityData.Websites.length - 1 && (
                              <Divider component="li" />
                            )}
                          </React.Fragment>
                        ))}
                      </List>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Resources;
