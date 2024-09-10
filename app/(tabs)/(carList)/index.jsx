import React, { useState, useEffect, useCallback } from 'react';
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
import { useSelector, useDispatch } from "react-redux";
import { getCar, selectCar } from '@/redux/reducers/car/carSlice';
import { router } from "expo-router";

export default function CarList() {
  const { isError, isLoading, data } = useSelector(selectCar);
  const dispatch = useDispatch();

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    dispatch(getCar(signal));

    return () => {
      controller.abort();
    };
  }, []);

  const renderCar = useCallback(({ item }) => {
    return <ListCar
      key={item.id}
      image={{ uri: item.image }}
      carName={item.name}
      passengers={item.passengers || 5}
      baggage={item.baggage || 2}
      onPress={() => router.push(`(carlist)/details/${item.id}`)}
      price={item.price}
    />
  })

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Daftar Mobil</Text>
        {isLoading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : isError ? (
          <Text style={styles.errorText}>Failed to load cars. Please try again later.</Text>
        ) : data.length > 0 ? (
          <FlatList
            data={data}
            renderItem={renderCar}
            ListHeaderComponent={<View style={{ height: 20 }} />}
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
    marginTop: 20,
  },
  emptyText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#555',
    marginTop: 20,
  },
});
