import React, { useState } from 'react';
import { View, TextInput, Button, Text, Alert } from 'react-native';
import axios from 'axios';

const App = () => {
  const [address, setAddress] = useState('');
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [geocodingError, setGeocodingError] = useState('');

  const handleGeocodeAddress = async () => {
    try {
      const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
        params: {
          address: address,
          key: 'YOUR_GOOGLE_MAPS_API_KEY',
        },
      });

      if (response.data.results.length > 0) {
        const { lat, lng } = response.data.results[0].geometry.location;
        setLatitude(lat);
        setLongitude(lng);
        setGeocodingError('');
      } else {
        setLatitude(null);
        setLongitude(null);
        setGeocodingError('No results found for the address');
      }
    } catch (error) {
      setLatitude(null);
      setLongitude(null);
      setGeocodingError('Failed to geocode address');
      console.error(error);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
      <TextInput
        style={{ height: 40, width: '100%', borderColor: 'gray', borderWidth: 1, marginBottom: 10, padding: 10 }}
        placeholder="Enter address"
        value={address}
        onChangeText={text => setAddress(text)}
      />
      <Button title="Geocode Address" onPress={handleGeocodeAddress} />
      
      {geocodingError ? (
        <Text style={{ marginTop: 10, color: 'red' }}>{geocodingError}</Text>
      ) : (
        <View style={{ marginTop: 20 }}>
          <Text>Address: {address}</Text>
          {latitude !== null && longitude !== null && (
            <View style={{ marginTop: 10 }}>
              <Text>Latitude: {latitude}</Text>
              <Text>Longitude: {longitude}</Text>
            </View>
          )}
        </View>
      )}
    </View>
  );
};

export default App;
