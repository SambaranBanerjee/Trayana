import React from 'react';
import { Button,Alert,Text,StyleSheet, View } from "react-native";

export default function index(){
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Disaster Management System</Text>
      <Text style={styles.description}>
        This is a comprehensive app for the user to get help during a disaster from the NGOs and Government
      </Text>
      
      <View style={styles.buttonContainer}>
        <Button 
          title="Send SOS" 
          onPress={() => {
          console.log("SOS sent!");
          Alert.alert('SOS sent!','Help is on the Way!');
        }} 
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontSize: 30,  
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  buttonContainer: {
    margin: 10,
    width: '50%', 
  },
});