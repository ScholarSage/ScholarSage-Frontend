import React from 'react'
import { Box } from '@mui/material'
import Navbar from "../../content/Navbar";
import Sidenav from "../../content/Sidenav";

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
    <>
        <div style={{minHeight: '100vh',background: '#ECEFF1',background: 'linear-gradient(158deg, rgba(224, 224, 224,) 0%, rgba(233, 237, 254) 100%)'}}>
        <Navbar/>
        <Box height={20}/>
            <Box sx={{ display: 'flex' }}>
                <Sidenav/>
                <Box
                    component="main"
                    sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
                >
                    {/* <h2>Personality Testing</h2>
                    { {currentQuestion < questions.length ? (
                    <div>
                        {<p>{questions[currentQuestion].text}</p>
                        <button onClick={() => handleResponse('Yes')}>Yes</button>
                        <button onClick={() => handleResponse('No')}>No</button> }
                    { </div>
                    ) : ( }
                        <p>Thank you for completing the test!</p>
                    )} */}
                </Box> 
            </Box>
        </div>
        </>
  )

}
