import React from 'react'
import { Box } from '@mui/material'
import Navbar from "../../content/Navbar";
import Sidenav from "../../content/Sidenav";
import Layout from '../../content/NavbarSidenavLayout';

const drawerWidth = 240;

export default function PersonalityTest() {
    // Define state variables
  // const [currentQuestion, setCurrentQuestion] = useState(0);
  // const [userResponses, setUserResponses] = useState(0);

  // const questions = [
  //   { id: 1, text: 'I prefer to spend time with a large group of friends rather than alone.', },
    
  // ];

  // // Function to handle user response selection
  // const handleResponse = (response) => {
  //   // Update userResponses array with the selected response
  //   setUserResponses([...userResponses, response]);
    
  //   // Move to the next question
  //   if (currentQuestion < questions.length - 1) {
  //     setCurrentQuestion(currentQuestion + 1);
  //   } else {
  //     // User has completed the test - you can submit responses to the backend here
  //     console.log('User responses:', userResponses);
  //     // Add logic to submit responses to the backend
    // }
  // };

  return (
    <Layout>
        <h1>Personality Test</h1>
    </Layout>
  )

}
