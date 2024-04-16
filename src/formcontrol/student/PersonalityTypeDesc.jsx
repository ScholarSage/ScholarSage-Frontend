import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
  Box,
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Grid,
  Button,
} from '@mui/material';
import Layout from '../../content/NavbarSidenavLayout';

const drawerWidth = 240;

const PersonalityTypeDesc = () => {
  const { value } = useParams();
  const [typeData, setTypeData] = useState(null);
  const personalityTypes = ['INTJ', 'INTP', 'ENTJ', 'ENTP', 'INFJ', 'INFP', 'ENFJ', 'ENFP', 'ISTJ', 'ISFJ', 'ESTJ', 'ESFJ', 'ISTP', 'ISFP', 'ESTP', 'ESFP'];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/personality-types/${value}`);
        setTypeData(response.data);
      } catch (error) {
        console.error('Error fetching personality type description:', error);
      }
    };
    fetchData();
  }, [value]);

  const handleNextButtonClick = () => {
    const currentIndex = personalityTypes.indexOf(value);
    const nextIndex = (currentIndex + 1) % personalityTypes.length;
    const nextType = personalityTypes[nextIndex];
    window.location.href = `/Personality-Type/${nextType}`;
  };

  const handlePrevButtonClick = () => {
    const currentIndex = personalityTypes.indexOf(value);
    const prevIndex =
      (currentIndex - 1 + personalityTypes.length) % personalityTypes.length;
    const prevType = personalityTypes[prevIndex];
    window.location.href = `/Personality-Type/${prevType}`;
  };

  return (
    <Layout>
      <Container maxWidth="md">
        {typeData? (
          <>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 4,
            }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={handlePrevButtonClick}
              sx={{
                backgroundColor: '#9b005b',
                '&:hover': {
                  backgroundColor: '#82004b',
                },
                width: '120px',
              }}
            >
             ←  Previous
            </Button>

            <Button
              variant="contained"
              color="primary"
              onClick={handleNextButtonClick}
              sx={{
                backgroundColor: '#800080',
                '&:hover': {
                  backgroundColor: '#6a006a',
                },
                width: '120px',
              }}
            >
              Next  →
            </Button>
          </Box>
            <Box sx={{ mb: 4 }}>
              <Typography variant="h3" component="h1" align="center" gutterBottom>
                {typeData.name} <br/> {typeData.description}
              </Typography>
            </Box>

            <Box sx={{ mb: 4 }}>
              <Typography variant="h5" component="h2" gutterBottom>
                Introduction
              </Typography>
              <Typography variant="body1">{typeData.introduction}</Typography>
            </Box>

            <Box sx={{ mb: 4 }}>
              <img src={`/${typeData.imgUrl}`} alt={typeData.name} style={{ width: '100%', height: 'auto' }} />
            </Box>

            <Box sx={{ mb: 4 }}>
              <Typography variant="h5" component="h2" gutterBottom>
                Strengths & Weaknesses
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Box sx={{ backgroundColor: '#800080', p: 2, borderRadius: 2 }}>
                    <Typography variant="h5" component="h3" gutterBottom>
                      Strengths
                    </Typography>
                    <List>
                      {typeData.strengths.map((strength, index) => (
                        <ListItem key={index}>
                          <ListItemText primary={strength} primaryTypographyProps={{ color: 'white' }} />
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Box sx={{ backgroundColor: '#9b005b', p: 2, borderRadius: 2 }}>
                    <Typography variant="h5" component="h3" gutterBottom>
                      Weaknesses
                    </Typography>
                    <List>
                      {typeData.weaknesses.map((weakness, index) => (
                        <ListItem key={index}>
                          <ListItemText primary={weakness} primaryTypographyProps={{ color: 'white' }} />
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                </Grid>
              </Grid>
            </Box>

            <Box sx={{ mb: 4 }}>
              <Typography variant="h5" component="h2" gutterBottom>
                Friendships
              </Typography>
              <Typography variant="body1">
                {typeData.friendships}
              </Typography>
            </Box>

            <Box sx={{ mb: 4 }}>
              <Typography variant="h5" component="h2" gutterBottom>
                Parenthood
              </Typography>
              <Typography variant="body1">
                {typeData.parenthood}
              </Typography>
            </Box>

            <Box sx={{ mb: 4 }}>
              <Typography variant="h5" component="h2" gutterBottom>
                Career Paths
              </Typography>
              <Typography variant="body1">
                {typeData.careerPaths}
              </Typography>
            </Box>

            <Box sx={{ mb: 4 }}>
              <Typography variant="h5" component="h2" gutterBottom>
                Romantic Relationships
              </Typography>
            </Box>
            
            <Box sx={{ mb: 4, position: 'relative' }}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <img src={`/PersonalityTypeImages/romantic.jpg`} alt={typeData.name} style={{ width: '204%', height: '100%' }} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    backgroundColor: 'rgba(155, 0, 91, 0.6)',
                    padding: 2,
                    borderRadius: 2,
                  }}>
                    <Typography variant="body1" textAlign={'center'} color="white">
                      {typeData.romanticRelationships}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
            
            <Box sx={{ mb: 4 }}>
              <Typography variant="h5" component="h2" gutterBottom>
                Workplace Habits
              </Typography>
              <List>
                {typeData.workplaceHabits.map((habit, index) => (
                  <ListItem key={index} sx={{ pl: 4 }}>
                    <ListItemIcon sx={{ minWidth: '30px' }}>
                      <ListItemText primary="•" primaryTypographyProps={{ fontWeight: 'medium' }} />
                    </ListItemIcon>
                    <ListItemText primary={habit} />
                  </ListItem>
                ))}
              </List>
            </Box>

            <Box
              sx={{
                mb: 4,
                backgroundColor: '#24003D',
                p: 2,
                borderRadius: 2,
                color: 'white',
                textAlign: 'center',
              }}
            >
              <Typography variant="h5" component="h2" gutterBottom>
                Conclusion
              </Typography>
              <Typography variant="body1">
                {typeData.conclusion}
              </Typography>
            </Box>

          </>
        ) : (
          <Typography variant="body1">Loading...</Typography>
        )}
      </Container>
    </Layout>
  );
};

export default PersonalityTypeDesc;