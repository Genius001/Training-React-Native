import { Image, StyleSheet, View, Text, Button } from "react-native";
import ParallaxFlatList from "../../components/ParallaxFlatList";
import Constants from "expo-constants";
import { Row, Col } from '@/components/Grid';
import ButtonIcon from './../../components/ButtonIcon';
import ListCar from './../../components/ListCar';
import { useState, useEffect } from 'react';
import { router } from "expo-router";
import React from "react";
import * as SecureStore from "expo-secure-store";
import { useSelector, useDispatch } from "react-redux";
import { getCar, selectCar } from '../../redux/reducers/car/carSlice';

export default function HomeScreen() {

  const { data, isLoading } = useSelector(selectCar);
  const dispatch = useDispatch();

  useEffect(() => {
    const controller = new AbortController(); // UseEffect cleanup untuk menghindari memory Leak
    const signal = controller.signal; // UseEffect cleanup

    dispatch(getCar(signal));

    return () => {
      // cancel request sebelum component di close
      controller.abort();
    };
  }, []);

  return (
    <ParallaxFlatList
      headerBackgroundColor={{ light: "#A43333", dark: "#A43333" }}
      headerImage={
        <View style={styles.container}>
          <View>
            <Text style={styles.titleText}>Hi, Nama</Text>
            <Text style={styles.titleText}>Location</Text>
          </View>
          <View>
            <Image
              style={styles.imageProfile}
              source={require("@/assets/images/img_photo.png")}
            />
          </View>
        </View>
      }
      banner={
        <>
          <View style={styles.banner}>
            <View style={styles.bannerContainer}>
              <View style={styles.bannerTextContainer}>
                <Text style={styles.bannerText}>
                  Sewa Mobil Berkualitas di kawasanmu
                </Text>
                <Button color="#3D7B3F" title="Sewa Mobil" />
              </View>
              <View>
                <Image source={require("@/assets/images/img_car.png")} />
              </View>
            </View>
          </View>
          <View>
            <Row justifyContent={"space-between"}>
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
        </>
      }
      loading={isLoading}
      data={data}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <ListCar
          style={{ marginHorizontal: 20 }}
          key={item.id}
          image={{ uri: item.image }}
          carName={item.name}
          passengers={item.passengers || 5}
          baggage={item.baggage || 4}
          price={item.price}
          onPress={() =>
            router.push('(carList)/details/' + item.id)
          }
        />
      )}
      viewabilityConfig={{
        waitForInteraction: true,
      }}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight + 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  titleText: {
    color: "#ffffff",
    fontFamily: "PoppinsBold",
  },
  imageProfile: {
    height: 35,
    width: 35,
  },
  banner: {
    backgroundColor: "#AF392F",
    marginTop: -100,
    overflow: "hidden",
    borderRadius: 5,
  },
  bannerContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  bannerTextContainer: {
    width: "45%",
    padding: 15,
  },
  bannerText: {
    color: "#ffffff",
    fontFamily: "Poppins",
    fontSize: 16,
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
