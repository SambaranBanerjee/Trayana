import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import axios from 'axios';

interface NGO {
  name: string;
  address: string;
  distance: string;
}

const Search: React.FC = () => {
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [ngos, setNgos] = useState<NGO[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getUserLocation = (): Promise<{ latitude: number; longitude: number }> => {
    return new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          reject(error);
        },
        {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 10000,
        }
      );
    });
  };

  const fetchNearbyNGOs = async (latitude: number, longitude: number) => {
    try {
      const response = await axios.get('Actual_API_taken', {
        params: {
          lat: latitude,
          lon: longitude,
        },
      });
      setNgos(response.data);
    } catch (error) {
      console.error('Error fetching nearby NGOs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    setLoading(true);
    try {
      const location = await getUserLocation();
      setLocation(location);
      await fetchNearbyNGOs(location.latitude, location.longitude);
    } catch (error) {
      console.error('Error getting location:', error);
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Search for Nearby NGOs</Text>
      <Text style={styles.description}>
        Find NGOs around your current location that can provide help during a disaster or emergency.
      </Text>

      <TouchableOpacity style={styles.button} onPress={handleSearch}>
        <Text style={styles.buttonText}>Find Nearby NGOs</Text>
      </TouchableOpacity>

      {loading && <ActivityIndicator size="large" color="#007BFF" style={styles.loader} />}

      {ngos.length > 0 && (
        <FlatList
          data={ngos}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.ngoItem}>
              <Text style={styles.ngoName}>{item.name}</Text>
              <Text style={styles.ngoAddress}>{item.address}</Text>
              <Text style={styles.ngoDistance}>Distance: {item.distance}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5', // Light background color
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50', // Dark text color for readability
    marginBottom: 20,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#7f8c8d',
    textAlign: 'center',
    marginBottom: 30,
    marginHorizontal: 20,
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3, // Adds subtle shadow
    marginBottom: 20,
    width: '80%', // Button width adjustment
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loader: {
    marginTop: 20,
  },
  ngoItem: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 15,
    borderRadius: 8,
    width: '100%',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  ngoName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#34495e',
  },
  ngoAddress: {
    fontSize: 16,
    color: '#7f8c8d',
    marginVertical: 5,
  },
  ngoDistance: {
    fontSize: 14,
    color: '#16a085',
    fontStyle: 'italic',
  },
});
