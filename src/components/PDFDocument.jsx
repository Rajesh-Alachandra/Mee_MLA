import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const PDFDocument = ({ voters }) => {
  console.log('in pdf', voters)
  const styles = StyleSheet.create({
    page: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      padding: 10,
    },
    card: {
      width: '29.5%',
      backgroundColor: '#d1d0d0',
      boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
      border: '1px solid black',
      margin: 10,
      padding: 10,
      fontSize: 10,
    },
    label: {
      fontWeight: 'bold',
    },
    cardNumberContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      marginBottom: '10px',

    },
    cardNumber: {
      fontSize: 10,
      border: '1px solid black',
      width: 50,
      textAlign: 'right',
    },
  });
  try {
    return (
      <Document>
        <Page size="A4" style={styles.page}>
          {voters.map((voter, index) => {
            console.log('Mapping voter:', voter);
            return (
              <View key={voter.id} style={styles.card}>
                <View style={styles.cardNumberContainer}>
                  <Text style={styles.cardNumber}>{index + 1}</Text>
                  <Text style={styles.label}>{voter.voterId_no}</Text>
                </View>

                <Text style={styles.label}>Name:{voter.name} {voter.surname}</Text>
                <Text style={styles.label}>Gender:{voter.gender}</Text>
                <Text style={styles.label}>House number:{voter.address}</Text>
                <Text style={styles.label}>Age:{voter.age} Gender:{voter.gender}</Text>
              </View>
            );
          })}

        </Page>
      </Document>
    );
  } catch (error) {
    console.error('Error rendering PDF:', error);
    return null; // Return null or an error message component if rendering fails
  }
};

export default PDFDocument;
