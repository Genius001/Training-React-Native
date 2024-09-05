import { Text, StyleSheet, Image } from 'react-native';
import React from 'react';
import { Row, Col } from '@/components/Grid';
import { Feather } from '@expo/vector-icons';
import Button from './Button';

const formatCurrency = new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR',
});

export default function ListCar({
  onPress,
  image,
  carName,
  passengers,
  baggage,
  price,
  style,
}) {
  const formatIDR = (price) => formatCurrency.format(price);

  return (
    <Button
      style={{ ...styles.card, ...style }}
      onPress={onPress}>
      <Row alignItems={'center'} gap={20}>
        <Col>
          <Image style={styles.img} source={image} resizeMode="contain" />
        </Col>
        <Col>
          <Text style={styles.carName}>{carName}</Text>
          <Row>
            <Col style={styles.textIcon}>
              <Feather name="users" size={12} color="#8A8A8A" />
              <Text style={styles.capacityText}>{passengers}</Text>
            </Col>
            <Col style={styles.textIcon}>
              <Feather name="briefcase" size={12} color="#8A8A8A" />
              <Text style={styles.capacityText}>{baggage}</Text>
            </Col>
          </Row>
          <Text style={styles.price}>{formatIDR(price)}</Text>
        </Col>
      </Row>
    </Button>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
    shadowColor: '#000000',
    shadowOpacity: 0.15,
    elevation: 20,
    padding: 20,
    marginBottom: 20,
    width: '100%',
    alignItems: 'left',
  },
  img: {
    width: 60,
    height: 60,
  },
  carName: {
    fontSize: 14,
    fontFamily: 'Poppins',
    fontWeight: '400',
    color: '#000000',
  },
  capacityText: {
    color: '#8A8A8A',
    fontFamily: 'Poppins',
    fontSize: 12,
    fontWeight: '700',
    marginLeft: 4,
  },
  price: {
    color: '#5CB85F',
    fontFamily: 'Poppins',
    fontSize: 14,
  },
  textIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
});
