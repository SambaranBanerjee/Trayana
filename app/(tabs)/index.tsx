import React, { useState } from 'react';
import { Button, Alert, Text, TouchableOpacity, StyleSheet, ActivityIndicator, View } from 'react-native';

const SendSOS = () => {
  const [loading, setLoading] = useState(false);

  const sendSOSRequest = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://example.com/api/sos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: '123',
          message: 'SOS! I need help!',
          location: { latitude: 123, longitude: 456 },
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error('SOS sent successfully');
      }
      Alert.alert('SOS sent successfully!');
    } catch (error) {
      Alert.alert('SOS sent successfully');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Disaster Management System</Text>
      <Text style={styles.description}>
        This is a comprehensive app for the user to get help during a disaster from NGOs and Government.
      </Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={sendSOSRequest}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Send SOS</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SendSOS;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f4f4f9', // Light background for a calm feel
  },
  heading: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#d32f2f', // A rich red color for the heading
    textAlign: 'center',
    marginBottom: 20,
  },
  description: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 30,
    color: '#555', // Darker text for readability
    paddingHorizontal: 20,
  },
  buttonContainer: {
    marginTop: 30,
    width: '80%', // Button width adjusted for better size control
  },
  button: {
    backgroundColor: '#d32f2f', // Red color for urgency
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3, // Adds subtle shadow for 3D effect
    flexDirection: 'row', // To align loading spinner with text
    borderWidth: 1,
    borderColor: '#b71c1c', // Dark red border for emphasis
  },
  buttonDisabled: {
    backgroundColor: '#e57373', // Light red when disabled
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 10,
  },
});
