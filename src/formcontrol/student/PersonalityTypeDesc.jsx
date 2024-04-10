import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Layout from '../../content/NavbarSidenavLayout';

const drawerWidth = 240;

const PersonalityTypeDesc = () => {
  const { value } = useParams();
  const [typeData, setTypeData] = useState(null);

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

  return (
    <Layout>
        <div>
        {typeData ? (
            <>
            <h1>Personality Type Description</h1>
            <h2>{typeData.name}</h2>
            <p>{typeData.description}</p>
            </>
        ) : (
            <p>Loading...</p>
        )}
        </div>
    </Layout>
  );
};

export default PersonalityTypeDesc;
