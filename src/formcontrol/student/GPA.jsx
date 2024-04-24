import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../../content/NavbarSidenavLayout";
import {
  Container,
  Typography,
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  makeStyles,
  TextField,
  Snackbar,
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const useStyles = makeStyles((theme) => ({
  paper: {
    border: `2px solid #9837DC`,
    borderRadius: "8px",
    padding: theme.spacing(2),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    backgroundColor: "#fff",
  },
  inputContainer: {
    marginBottom: theme.spacing(2),
  },
  buttonContainer: {
    marginTop: theme.spacing(2),
    display: "flex",
    justifyContent: "space-between",
  },
  textField: {
    marginBottom: theme.spacing(2),
    width: "100%",
  },
  tableContainer: {
    maxHeight: "400px", // Adjust as needed
    overflowY: "auto",
  },
  table: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  calculatedGPA: {
    marginBottom: theme.spacing(2),
    fontSize: "1.5rem",
    fontWeight: "bold",
    textAlign: "center",
  },
  updateButton: {
    backgroundColor: "#9c27b0",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#7b1fa2",
    },
  },
  deleteButton: {
    backgroundColor: "#673ab7",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#512da8",
    },
  },
  addButton: {
    backgroundColor: "#9837DC",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#7a2cb2",
    },
  },
  actionContainer: {
    display: "flex",
    gap: theme.spacing(1),
  },
}));

const GPA = () => {
  const classes = useStyles();
  const [gpas, setGpas] = useState([]);
  const [name, setName] = useState("");
  const [grade, setGrade] = useState("");
  const [credits, setCredits] = useState(0);
  const [calculatedGPA, setCalculatedGPA] = useState(0);
  const [successMessage, setSuccessMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [userData,setUserData] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const scnumber = await getData();
      
      if (scnumber) {
        getGpas(scnumber);
      }
    };

    fetchData();
  }, []);

  const getGpas = async (scnumber) => {
    try {
      const response = await axios.post("http://localhost:8081/get-GPA",{
        scnumber,
      });
      console.log(response);
      setGpas(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const SaveGpa = async (gpa) => {
    const id=userData._id;
    try {
      const response = await axios.post(`http://localhost:8081/SaveGPA/${id}`,{
        gpa,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const getData = async () => {
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
      console.log(response.data);
      setUserData(response.data.data);
      setCalculatedGPA(response.data.data.gpa);
      return response.data.data.scnumber;
    } catch (error) {
      console.log(error);
    }
  };

  const validGrades = [
    "A+",
    "A",
    "A-",
    "B+",
    "B",
    "B-",
    "C+",
    "C",
    "C-",
    "D+",
    "D",
    "F",
  ];

  const addGpa = async () => {
    if (!validGrades.includes(grade)) {
      alert("Invalid grade. Please enter a valid grade.");
      return;
    }
    if (credits < 0 || credits > 4 || isNaN(credits)) {
      alert("Invalid credits value. Please enter a number between 0 and 4.");
      return;
    }
  
    try {
      const response = await axios.post("http://localhost:8081/add-GPA", {
        scnumber:userData.scnumber,
        name,
        grade,
        credits,
      });
      setGpas([...gpas, response.data]);
      clearInputs();
      setSuccessMessage("Course added successfully!");
      setOpenSnackbar(true);
    } catch (error) {
      console.error(error);
    }
  };

  const updateGpa = async (id) => {
    console.log(id);
    try {
      const gpaToUpdate = gpas.find((gpa) => gpa._id === id);
      const response = await axios.post(
        `http://localhost:8081/update-GPA/${id}`,
        {
          name: gpaToUpdate.name,
          grade: gpaToUpdate.grade,
          credits: gpaToUpdate.credits,
        }
      );
      const updatedGpaItem = response.data.data;
      // const updatedGpaItem = gpas.filter((gpa) => gpa._id == id);
      const updatedGpas = gpas.map((gpa) =>
        gpa._id === id ? updatedGpaItem : gpa
      );
      setGpas(updatedGpas);
      setSuccessMessage("Updated Successfully!");
      setOpenSnackbar(true);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteGpa = async (id) => {
    try {
      await axios.delete(`http://localhost:8081/delete-GPA/${id}`);
      const filteredGpas = gpas.filter((gpa) => gpa._id !== id);
      setGpas(filteredGpas);
      setSuccessMessage("Deleted Successfully!");
      setOpenSnackbar(true);
    } catch (error) {
      console.error(error);
    }
  };

  const clearInputs = () => {
    setName("");
    setGrade("");
    setCredits(0);
  };

  const calculateGPA = () => {  
    let totalQualityPoints = 0;
    let totalCredits = 0;

    gpas.forEach((gpa) => {
      let qualityPoints = 0;

      switch (gpa.grade) {
        case "A+":
          qualityPoints = 4.0 * gpa.credits;
          break;
        case "A":
          qualityPoints = 4.0 * gpa.credits;
          break;
        case "A-":
          qualityPoints = 3.7 * gpa.credits;
          break;
        case "B+":
          qualityPoints = 3.3 * gpa.credits;
          break;
        case "B":
          qualityPoints = 3.0 * gpa.credits;
          break;
        case "B-":
          qualityPoints = 2.7 * gpa.credits;
          break;
        case "C+":
          qualityPoints = 2.3 * gpa.credits;
          break;
        case "C":
          qualityPoints = 2.0 * gpa.credits;
          break;
        case "C-":
          qualityPoints = 1.7 * gpa.credits;
          break;
        case "D+":
          qualityPoints = 1.3 * gpa.credits;
          break;
        case "D":
          qualityPoints = 1.0 * gpa.credits;
          break;
        case "F":
          qualityPoints = 0.0;
          break;
        default:
          break;
      }

      totalQualityPoints += qualityPoints;
      totalCredits += gpa.credits;
    });

    const gpa = totalQualityPoints / totalCredits;
    setCalculatedGPA(gpa);
    SaveGpa(gpa);
  };

  const handleNameChange = (e, gpaId) => {
    const updatedGpas = gpas.map((gpa) =>
      gpa._id === gpaId ? { ...gpa, name: e.target.value } : gpa
    );
    setGpas(updatedGpas);
  };

  const handleGradeChange = (e, gpaId) => {
    const updatedGpas = gpas.map((gpa) =>
      gpa._id === gpaId ? { ...gpa, grade: e.target.value } : gpa
    );
    setGpas(updatedGpas);
  };

  const handleCreditsChange = (e, gpaId) => {
    const enteredCredits = parseFloat(e.target.value);

    if (enteredCredits < 0 || enteredCredits > 4 || isNaN(enteredCredits)) {
      alert("Invalid credits value. Please enter a number between 0 and 4.");
      return;
    }

    const updatedGpas = gpas.map((gpa) =>
      gpa._id === gpaId ? { ...gpa, credits: enteredCredits } : gpa
    );
    setGpas(updatedGpas);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <Layout>
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Paper className={classes.paper}>
              <Typography variant="h4" component="h1" gutterBottom>
                GPA Calculator
              </Typography>
              <Grid container spacing={2} className={classes.inputContainer}>
                <Grid item xs={12} sm={4}>
                  <TextField
                    label="Course Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={classes.textField}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    label="Grade"
                    value={grade}
                    onChange={(e) => setGrade(e.target.value)}
                    className={classes.textField}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    label="Credits"
                    type="number"
                    value={credits}
                    onChange={(e) => setCredits(e.target.value)}
                    className={classes.textField}
                  />
                </Grid>
              </Grid>
              <div className={classes.buttonContainer}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={addGpa}
                  className={classes.addButton}
                >
                  Add Course
                </Button>
              </div>
              <div className={classes.tableContainer}>
                <TableContainer component={Paper} className={classes.table}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Course Name</TableCell>
                        <TableCell>Grade</TableCell>
                        <TableCell>Credits</TableCell>
                        <TableCell>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                    {gpas.map((gpa) => (
  <TableRow key={gpa._id}>
    <TableCell>
      <TextField
        value={gpa.name}
        onChange={(e) => handleNameChange(e, gpa._id)}
      />
    </TableCell>
    <TableCell>
      <TextField
        value={gpa.grade}
        onChange={(e) => handleGradeChange(e, gpa._id)}
      />
    </TableCell>
    <TableCell>
      <TextField
        type="number"
        value={gpa.credits}
        onChange={(e) => handleCreditsChange(e, gpa._id)}
      />
    </TableCell>
    <TableCell className={classes.actionContainer}>
      <Button
        variant="contained"
        className={classes.updateButton}
        onClick={() => updateGpa(gpa._id)}
      >
        Update
      </Button>
      <Button
        variant="contained"
        className={classes.deleteButton}
        onClick={() => deleteGpa(gpa._id)}
      >
        Delete
      </Button>
    </TableCell>
  </TableRow>
))}

                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
              <Typography variant="h6" className={classes.calculatedGPA}>
                Calculated GPA:{" "}
                {calculatedGPA !== null ? calculatedGPA.toFixed(2) : "N/A"}
              </Typography>
              <Button
                variant="contained"
                className={classes.updateButton}
                onClick={calculateGPA}
              >
                Calculate GPA
              </Button>
              <Snackbar
                open={openSnackbar}
                autoHideDuration={3000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              >
                <Alert onClose={handleCloseSnackbar} severity="success">
                  {successMessage}
                </Alert>
              </Snackbar>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper className={classes.paper}>
              <TableContainer
                component={Paper}
                className={`${classes.tableContainer} ${classes.gradeTable}`}
              >
                <Typography variant="h5" gutterBottom>
                  Grade Point Values
                </Typography>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Grade</TableCell>
                      <TableCell>Grade Point</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {[
                      ["A+", "4.00"],
                      ["A", "4.00"],
                      ["A-", "3.70"],
                      ["B+", "3.30"],
                      ["B", "3.00"],
                      ["B-", "2.70"],
                      ["C+", "2.30"],
                      ["C", "2.00"],
                      ["C-", "1.70"],
                      ["D+", "1.30"],
                      ["D", "1.00"],
                      ["F", "0.00"],
                    ].map(([grade, point]) => (
                      <TableRow key={grade}>
                        <TableCell>{grade}</TableCell>
                        <TableCell>{point}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <TableContainer
                component={Paper}
                className={`${classes.tableContainer} ${classes.cutoffTable}`}
              >
                <Typography variant="h5" gutterBottom>
                  CGPA Cut-off and Class/Pass
                </Typography>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>CGPA Cut-off</TableCell>
                      <TableCell>Class/Pass</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {[
                      ["3.75", "First Class"],
                      ["3.30", "Second Upper"],
                      ["2.75", "Second Lower"],
                      ["2.00", "Pass"],
                    ].map(([cutoff, classPass]) => (
                      <TableRow key={cutoff}>
                        <TableCell>{cutoff}</TableCell>
                        <TableCell>{classPass}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
};

export default GPA;