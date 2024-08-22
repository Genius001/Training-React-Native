import { View, Text } from 'react-native'
import React from 'react'
import { Row, Col } from '@/components/Grid';
import { Feather } from '@expo/vector-icons';
import { StyleSheet, Image } from 'react-native';

const formatCurrency = newCurrency =
    new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
    })

export default function ListCar({ image, carName, passengers, baggage, price }) {
    return (
        <View style={styles.card}>
            <Row alignItems={'center'} gap={20}>
                <Col>
                    <Image style={styles.img} source={image} />
                </Col>
                <Col>
                    <Text style={styles.carName}>{carName}</Text>
                    <Row>
                        <Col style={styles.textIcon} >
                            <Feather name="users" size={12} color="8A8A8A" />
                            <Text style={styles.capacityText}>{passengers} </Text>
                        </Col>
                        <Col style={styles.textIcon}>
                            <Feather name="briefcase" size={12} color="8A8A8A" />
                            <Text style={styles.capacityText}>{baggage}</Text>
                        </Col>
                    </Row>
                    <Text style={styles.price}>{formatCurrency.format(price)}</Text>
                </Col>

            </Row>
        </View>
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
    },
    img: {
        width: 40,
        height: 40,
        objectFit: 'contain',
    },
    carName: {
        fontSize: 14,
        fontFamily: 'Poppins',
        fontWeight: '400',
        color: '#000000',
    },
    capacityText: {
        color: "#8A8A8A",
        fontFamily: 'Poppins',
        fontSize: 12,
        fontWeight: '700',
        marginLeft: 4,
    },
    price: {
        color: "#5CB85F",
        fontFamily: 'Poppins',
        fontSize: 14,
    },
    textIcon: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 2,
    }
})