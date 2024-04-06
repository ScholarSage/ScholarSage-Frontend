import React from 'react';
import { Box, Button } from '@mui/material';
import Navbar from '../../content/Navbar';
import Sidenav from '../../content/Sidenav';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Layout from '../../content/NavbarSidenavLayout';

const drawerWidth = 240;

const PersonalityTypes = () => {
  const navigate = useNavigate();

  const personalityTypes = {
    analysts: {
      title: "Analysts",
      description: "Intuitive (N) and Thinking (T) personality types, known for their rationality, impartiality, and intellectual excellence.",
      types: [
        { name: "Architect", value: "INTJ", color: "#5e35b1" },
        { name: "Logician", value: "INTP", color: "#7e57c2" },
        { name: "Commander", value: "ENTJ", color: "#512da8" },
        { name: "Debater", value: "ENTP", color: "#9c27b0" },
      ],
    },
    diplomats: {
      title: "Diplomats",
      description: "Intuitive (N) and Feeling (F) personality types, known for their empathy, diplomatic skills, and passionate idealism.",
      types: [
        { name: "Advocate", value: "INFJ", color: "#ab47bc" },
        { name: "Mediator", value: "INFP", color: "#ba68c8" },
        { name: "Protagonist", value: "ENFJ", color: "#673ab7" },
        { name: "Campaigner", value: "ENFP", color: "#7b1fa2" },
      ],
    },
    sentinels: {
      title: "Sentinels",
      description: "Observant (S) and Judging (J) personality types, known for their practicality and focus on order, security, and stability.",
      types: [
        { name: "Logistician", value: "ISTJ", color: "#d1c4e9" },
        { name: "Defender", value: "ISFJ", color: "#b39ddb" },
        { name: "Executive", value: "ESTJ", color: "#9575cd" },
        { name: "Consul", value: "ESFJ", color: "#673ab7" },
      ],
    },
    explorers: {
      title: "Explorers",
      description: "Observant (S) and Prospecting (P) personality types, known for their spontaneity, ingenuity, and flexibility.",
      types: [
        { name: "Virtuoso", value: "ISTP", color: "#7e57c2" },
        { name: "Adventurer", value: "ISFP", color: "#9c27b0" },
        { name: "Entrepreneur", value: "ESTP", color: "#512da8" },
        { name: "Entertainer", value: "ESFP", color: "#5e35b1" },
      ],
    },
  };

  const handleButtonClick = async (value) => {
    try {
      const response = await axios.get(`http://localhost:8081/personality-types/${value}`);
      navigate(`/Personality-Type/${value}`);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        alert('Personality type not found');
      } else {
        console.error('Error fetching personality type:', error);
      }
    }
  };

  return (
    <Layout>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ display: 'flex', flexGrow: 1 }}>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <h1>Personality Types</h1>
          {Object.values(personalityTypes).map(({ title, description, types }) => (
            <Box key={title} sx={{ mb: 4 }}>
              <h2>{title}</h2>
              <p>{description}</p>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {types.map(({ name, value, color }) => (
                  <Button
                    key={value}
                    variant="contained"
                    color="primary"
                    onClick={() => handleButtonClick(value)}
                    sx={{
                      bgcolor: color,
                      color: 'white',
                      '&:hover': { bgcolor: color, opacity: 0.9 },
                      width: { xs: '100%', sm: 'calc(50% - 8px)' },
                      marginBottom: '8px',
                    }}
                  >
                    {name}
                  </Button>
                ))}
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </div>
    </Layout>
  );
};

export default PersonalityTypes;
