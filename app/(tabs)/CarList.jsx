import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  StatusBar,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import ListCar from '@/components/ListCar';

export default function CarList() {
  const [carList, setCarList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch('http://api-car-rental.binaracademy.org/customer/car');
        const data = await response.json();
        setCarList(data);
      } catch (error) {
        console.error("Failed to fetch cars:", error);
        setError("Failed to load cars. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchCars();
  }, []);

  const renderCar = ({ item }) => (
    <ListCar
      key={item.id}
      image={{ uri: item.image }}
      carName={item.name}
      passengers={5}
      baggage={2}
      price={item.price}
    />
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Daftar Mobil</Text>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : carList.length > 0 ? (
          <FlatList
            data={carList}
            renderItem={renderCar}
            keyExtractor={item => item.id.toString()}
          />
        ) : (
          <Text style={styles.emptyText}>No Cars Available</Text>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
  },
  emptyText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#555',
    marginTop: 20,
  },
});
