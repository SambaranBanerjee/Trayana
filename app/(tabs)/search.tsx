import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import axios from 'axios';

interface Place {
  name: string;
  address: string;
  latitude: number;
  longitude: number;
}

const Search: React.FC = () => {
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [ngos, setNgos] = useState<Place[]>([]);
  const [hospitals, setHospitals] = useState<Place[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getUserLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Location permission denied');
        setLoading(false);
        return;
      }
      
      let userLocation = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: userLocation.coords.latitude,
        longitude: userLocation.coords.longitude,
      });
      fetchNearbyPlaces(userLocation.coords.latitude, userLocation.coords.longitude);
    };

    getUserLocation();
  }, []);

  const fetchNearbyPlaces = async (latitude: number, longitude: number) => {
    try {
      const [ngoResponse, hospitalResponse] = await Promise.all([
        axios.get('Actual_API_ngo', { params: { lat: latitude, lon: longitude } }),
        axios.get('Actual_API_hospital', { params: { lat: latitude, lon: longitude } })
      ]);
      setNgos(ngoResponse.data);
      setHospitals(hospitalResponse.data);
    } catch (error) {
      console.error('Error fetching nearby places:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#007BFF" style={styles.loader} />
      ) : location ? (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
        >
          <Marker
            coordinate={{ latitude: location.latitude, longitude: location.longitude }}
            title="Your Location"
            pinColor="blue"
          />
          {ngos.map((ngo, index) => (
            <Marker
              key={`ngo-${index}`}
              coordinate={{ latitude: ngo.latitude, longitude: ngo.longitude }}
              title={ngo.name}
              description={ngo.address}
              pinColor="green"
            />
          ))}
          {hospitals.map((hospital, index) => (
            <Marker
              key={`hospital-${index}`}
              coordinate={{ latitude: hospital.latitude, longitude: hospital.longitude }}
              title={hospital.name}
              description={hospital.address}
              pinColor="red"
            />
          ))}
        </MapView>
      ) : (
        <Text style={styles.errorText}>Unable to retrieve location.</Text>
      )}
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  loader: {
    marginTop: 20,
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
  },
});
