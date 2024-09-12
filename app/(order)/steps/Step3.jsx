import { View, Text, StyleSheet, ActivityIndicator, ScrollView, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import { useSelector } from 'react-redux';
import { selectOrder } from '@/redux/reducers/order/orderSlice';
import { selectCarDetail } from '@/redux/reducers/car/carDetailSlice';
import formatIDR from '@/utils/formatCurrency';
import { router } from 'expo-router';
import { useState } from 'react';
import { Col, Row } from '@/components/Grid';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/Feather';
import { selectAuth } from '@/redux/reducers/auth/authSlice';

export default function Step3() {
  const { data, selectedBank, promo } = useSelector(selectOrder);
  const carDetail = useSelector(selectCarDetail);
  const [imageLoading, setImageLoading] = useState(true);
  const { user } = useSelector(selectAuth);
  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear()).slice(-2);
    return `${day}-${month}-${year}`;
  };

  const currentDate = new Date();

  return (
    <SafeAreaView style={styles.mainContainer}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.heading}>Invoice</Text>
        <View style={styles.carIdContainer}>
          <Text style={styles.carIdText}>INV/TMMIN-{carDetail?.data?.id}/{user}/{formatDate(currentDate)}</Text>
          <TouchableOpacity style={styles.downloadButton}>
            <Icon name="download" size={24} color="#3D7B3F" />
          </TouchableOpacity>
        </View>
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
        <TouchableOpacity
          style={[styles.button, imageLoading && styles.buttonDisabled]}
          onPress={() => router.navigate("(tabs)")}
          disabled={imageLoading}
        >
          <Text style={styles.buttonText}>Back to Home</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 20,
    position: 'relative',
  },
  container: {
    flex: 1,
    paddingBottom: 80,
  },
  heading: {
    fontFamily: 'PoppinsBold',
    fontSize: 24,
    textAlign: 'center',
  },
  detailContainer: {
    marginBottom: 5,
  },
  label: {
    fontFamily: 'PoppinsBold',
    fontSize: 18,
  },
  text: {
    fontFamily: 'PoppinsRegular',
    fontSize: 16,
  },
  img: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  textContainer: {
    padding: 2,
    alignSelf: 'center',
  },
  carIdContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 2,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    marginVertical: 20,
  },
  carIdText: {
    fontFamily: 'PoppinsRegular',
    fontSize: 16,
  },
  downloadButton: {
    padding: 1,
  },
  slip: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
    marginBottom: 5,
  },
  image: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
  },
  buttonDisabled: {
    backgroundColor: '#B0B0B0',
  },

  button: {
    backgroundColor: '#3D7B3F',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'PoppinsBold',
    textAlign: 'center',
  },
});
