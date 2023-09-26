import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { noauthinstance } from '../utils/api';
import { Document, Page, Text, View, PDFViewer, StyleSheet } from '@react-pdf/renderer';
import PDFDocument from './PDFDocument';

const VotersListPdf = () => {
  const [voters, setVoters] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await noauthinstance.get("voters");
        console.log(response)
        const filteredVoters = response.data.filter((voter) => voter.address === "2-11");
        setVoters(filteredVoters);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleDownloadPDF = () => {
    const blob = PDFDocument({ voters }).toBlob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'voters.pdf';
    a.click();
    URL.revokeObjectURL(url);
  };

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
