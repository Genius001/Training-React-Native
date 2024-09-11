import { View, Image, Text, StyleSheet, Button, ActivityIndicator, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import { selectOrder } from '@/redux/reducers/order/orderSlice';
import { selectCarDetail } from '@/redux/reducers/car/carDetailSlice';
import formatIDR from '@/utils/formatCurrency';
import { router } from 'expo-router';
import { useState } from 'react';
import { Col, Row } from '@/components/Grid';
import FastImage from 'react-native-fast-image';

export default function Step3() {
  const { data, selectedBank, promo } = useSelector(selectOrder);
  const carDetail = useSelector(selectCarDetail);
  const [imageLoading, setImageLoading] = useState(true);
  console.log(data.slip);
  console.log(carDetail);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Order Summary</Text>

      <View style={styles.detailContainer}>
        <Text style={styles.label}>Car Details:</Text>
        <Row gap={20} alignSelf="center" alignItems="center" justifyContent="center">
          <Image style={styles.img} source={{ uri: carDetail?.data?.image }} />
          <View style={styles.textContainer}>
            <Col>
              <Text style={styles.text}>Name: {carDetail?.data?.name}</Text>
              <Text style={styles.text}>Price: {formatIDR(carDetail?.data?.price)}</Text>
              <Text style={styles.text}>Passengers: {carDetail?.data?.passengers || 5}</Text>
              <Text style={styles.text}>Baggage: {carDetail?.data?.baggage || 4}</Text>
            </Col>
          </View>
        </Row>

      </View>

      <View style={styles.detailContainer}>
        <Text style={styles.label}>Selected Bank:</Text>
        <Text style={styles.text}>
          {selectedBank ? `${selectedBank.bankName} Transfer` : 'No bank selected'}
        </Text>
      </View>

      {promo && (
        <View style={styles.detailContainer}>
          <Text style={styles.label}>Promo Code Applied:</Text>
          <Text style={styles.text}>{promo}</Text>
        </View>
      )}



      <View style={styles.slip}>
        <Text style={styles.label}>Transfer Receipt</Text>
        {data.slip ? (
          <>
            {imageLoading && <ActivityIndicator size="large" color="#3D7B3F" />}
            <FastImage
              style={styles.image}
              source={{
                uri: data.slip,
                priority: FastImage.priority.high,
              }}
              onLoadEnd={() => setImageLoading(false)}
              onError={() => setImageLoading(false)}
            />
          </>
        ) : (
          <Text>No slip uploaded</Text>
        )}
      </View>

      <Button
        title="Back to Home"
        onPress={() => router.navigate("(tabs)")}
        color="#3D7B3F"
        disabled={imageLoading}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  slip: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 20,

  },
  image: {
    width: 150,
    height: 150,
    resizeMode: 'contain',

  },
  container: {
    flex: 1,
    padding: 20,
  },
  heading: {
    fontFamily: 'PoppinsBold',
    fontSize: 24,
    marginBottom: 5,
    textAlign: 'center',
  },
  detailContainer: {
    marginBottom: 10,
  },
  label: {
    fontFamily: 'PoppinsBold',
    fontSize: 18,
    marginBottom: 5,
  },
  text: {
    fontFamily: 'PoppinsRegular',
    fontSize: 16,
  },
  img: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginBottom: 5,
    alignSelf: 'center',
  },
  textContainer: {
    padding: 5,
    alignSelf: 'center',
  },
});
