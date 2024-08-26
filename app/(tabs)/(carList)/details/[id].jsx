import { View, Text, ScrollView, Image, Button, StyleSheet } from 'react-native'
import { useLocalSearchParams } from 'expo-router'
import { useState, useEffect } from 'react'

export default function details() {
    const { id } = useLocalSearchParams();
    const [cars, setCars] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const controller = new AbortController(); // UseEffect cleanup untuk menghindari memory Leak
        const signal = controller.signal;  // UseEffect cleanup

        setLoading(true); //loading state
        const getData = async () => {
            try {
                const response = await fetch(
                    "https://api-car-rental.binaracademy.org/customer/car/" + id,
                    { signal: signal }  // UseEffect cleanup
                );
                const body = await response.json();
                setCars(body);
            } catch (e) {
                console.log(e) // Error Handling
                if (err.name === 'AbortError') {
                    console.log('successfully aborted');
                } else {
                    console.log(err)
                }
            }
        };
        getData();
        return () => {
            // cancel request sebelum component di close

        };
    }, [id]);

    return (
        <View style={style.container}>
            <ScrollView>
                <Text>{cars.name}</Text>
                <Image
                    source={{ uri: cars.image }}
                    height={100}
                    width={100}
                />
            </ScrollView>
            <View style={style.footer}>
                <Text style={style.price}>{cars.price}</Text>
                <Button
                    color='#3D7B3F'
                    title="Lanjutkan Pembayaran"
                />
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        paddingTop: 100,
        flex: 1,
        backgroundColor: '#ffffff'
    },
    price: {
        fontFamily: 'PoppinsBold',
        fontSize: 16,
        marginBottom: 10
    },
    footer: {
        backgroundColor: '#eeeeee',
        position: 'fixed',
        bottom: 0,
        padding: 20,
    }
})