import { Image, StyleSheet, View, Text, Button } from "react-native";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import Constants from "expo-constants";
import { Row } from '@/components/Grid';
import { Col } from './../../components/Grid';
import ButtonIcon from './../../components/ButtonIcon';
import ListCar from './../../components/ListCar';
import { useState, useEffect } from 'react';
import React from "react";

export default function HomeScreen() {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch('http://api-car-rental.binaracademy.org/customer/car');
        const data = await response.json();
        setCars(data);
      } catch (error) {
        console.error("Failed to fetch cars:", error);
      }
    };
    fetchCars();
  }, []);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A43333", dark: "#A43333" }}
      headerImage={
        <View style={styles.container}>
          <View>
            <Text style={styles.titleText}>Hi, Nama</Text>
            <Text style={styles.subtitleText}>Your Location</Text>
          </View>
          <View>
            <Image
              style={styles.imageProfile}
              source={require("@/assets/images/person.png")}
            />
          </View>
        </View>
      }
    >
      <View style={styles.banner}>
        <View style={styles.bannerContainer}>
          <View style={styles.bannerTextContainer}>
            <Text style={styles.bannerText}>Sewa Mobil Berkualitas di kawasanmu</Text>
            <Button
              color='#5CB85F'
              title="Sewa Mobil" />
          </View>
          <View>
            <Image
              source={require("@/assets/images/img_car.png")}
            />
          </View>
        </View>
      </View>
      <View>
        <Row justifyContent={'space-between'}>
          <Col>
            <ButtonIcon name={'truck'} color={'#ffffff'}></ButtonIcon>
            <Text style={styles.iconText}>Sewa Mobil</Text>

          </Col>
          <Col>
            <ButtonIcon name={'box'} color={'#ffffff'}></ButtonIcon>
            <Text style={styles.iconText}>Sewa Mobil</Text>
          </Col>
          <Col>
            <ButtonIcon name={'key'} color={'#ffffff'}></ButtonIcon>
            <Text style={styles.iconText}>Sewa Mobil</Text>
          </Col>
          <Col>
            <ButtonIcon name={'camera'} color={'#ffffff'}></ButtonIcon>
            <Text style={styles.iconText}>Sewa Mobil</Text>
          </Col>
        </Row>
      </View>
      <View>
        <Col>
          <Text style={styles.listTitle}>Daftar Pilihan Mobil</Text>

          {cars.length > 0 ? cars.map((el) => (
            <ListCar
              key={el.id}
              image={{ uri: el.image }}
              carName={el.name}
              passengers={5}
              baggage={2}
              price={'Rp ' + el.price}
            />
          )) : (
            <Text>No Cars Available</Text>
          )}
        </Col>
      </View>
    </ParallaxScrollView >
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  titleText: {
    color: "#ffffff",
    fontFamily: "PoppinsBold",
    fontSize: 12,
  },
  subtitleText: {
    color: "#ffffff",
    fontFamily: "PoppinsBold",
    fontSize: 14,
  },
  imageProfile: {
    height: 35,
    width: 35,
  },
  banner: {
    backgroundColor: "#AF392F",
    marginTop: -140,
    overflow: 'hidden',
    paddingTop: 20,
    borderRadius: 5
  },
  bannerContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  bannerTextContainer: {
    width: '45%',
    padding: 10,
    paddingBottom: 25
  },
  bannerText: {
    color: "#ffffff",
    fontFamily: "Poppins",
    fontSize: 16
  },
  iconText: {
    color: "#000000",
    fontFamily: "Poppins",
    fontSize: 12,
    fontWeight: "700",
    paddingTop: 5,
    textAlign: "center"
  },
  listTitle: {
    color: "#000000",
    fontFamily: "Poppins",
    fontSize: 14,
    fontWeight: "700",
    paddingBottom: 5,
  }

});