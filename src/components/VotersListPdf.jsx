import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { noauthinstance } from '../utils/api';
import { Document, Page, Text, View, PDFViewer, StyleSheet } from '@react-pdf/renderer';
import PDFDocument from './PDFDocument';
import { useLocation } from 'react-router-dom'; 

const VotersListPdf = () => {
  const location = useLocation();
  const polling_station = new URLSearchParams(location.search).get('polling_station');

  const [voters, setVoters] = useState([]);
  const [pollingData, setPollingData] = useState([]);
  const [error, setError] = useState(null);
  const fetchPollingStationsByConstituency = async (constituencyId) => {
    try {
        const response = await noauthinstance.get(`polling_stations/${constituencyId}`);
        setPollingData(response.data);
    } catch (err) {
        console.error('Error fetching data:', err);
        setError(err);
    }
};

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('polll',polling_station)
        const response = await noauthinstance.get(`voters/updated/?polling_station=${polling_station}`);
        console.log('res', response);
        setVoters(response.data);
       
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      
    };

    fetchData();
  }, []);
  useEffect(() => {
    console.log('vot', voters); 
  }, [voters]);
  // const handleDownloadPDF = () => {
  //   const blob = PDFDocument({ voters }).toBlob();
  //   const url = URL.createObjectURL(blob);
  //   const a = document.createElement('a');
  //   a.href = url;
  //   a.download = 'voters.pdf';
  //   a.click();
  //   URL.revokeObjectURL(url);
  // };

  return (
    <div>
      {/* <div className='download-pdf'>
        <button onClick={handleDownloadPDF}>Download this PDF</button>
      </div> */}
      <PDFViewer width="100%" height={800} >

        <PDFDocument voters={voters} />
      </PDFViewer>
    </div>
  );
};

export default VotersListPdf;
