import {
    View,
    Text,
    ScrollView,
    Image,
    StyleSheet,
    Button,
    ActivityIndicator,
    TouchableOpacity,
} from "react-native";
import React, { useEffect } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { Col, Row } from "@/components/Grid";
import { getCarDetail, selectCarDetail } from "@/redux/reducers/car/carDetailSlice";
import { useSelector, useDispatch } from "react-redux";

const formatCurrency = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
});

const include = [
    { key: "Apa saja yang termasuk dalam paket misal durasi max 12 jam" },
    { key: "Sudah termasuk bensin selama 12 jam" },
    { key: "Sudah termasuk Tiket Wisata" },
    { key: "Sudah termasuk pajak" },
];

const exclude = [
    { key: "Tidak termasuk biaya makan sopir Rp 75.000/hari" },
    { key: "Jika overtime lebih dari 12 jam akan ada tambahan biaya Rp 20.000/jam" },
    { key: "Tidak termasuk akomodasi penginapan" },
];

export default function DetailScreen() {
    const { id } = useLocalSearchParams();
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const { data, isLoading, isError } = useSelector(selectCarDetail);

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        dispatch(getCarDetail({ id, signal }));

        return () => {
            controller.abort();
        };
    }, [id, dispatch]);

    if (isLoading) {
        return <ActivityIndicator size="large" color="#0000ff" style={styles.loading} />;
    }

    if (isError || !data) {
        return <Text style={styles.errorText}>Failed to load car details. Please try again later.</Text>;
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.goBack()}
            >
                <Feather name="arrow-left" size={24} color="#000" />
            </TouchableOpacity>

            <View style={styles.header}>
                <Text style={styles.carName}>{data.name}</Text>
                <Row style={styles.icon}>
                    <Col style={styles.textIcon}>
                        <Feather size={24} name={"users"} color={"#8A8A8A"} />
                        <Text style={styles.capacityText}>{data.passengers || 5}</Text>
                    </Col>
                    <Col style={styles.textIcon}>
                        <Feather size={24} name={"briefcase"} color={"#8A8A8A"} />
                        <Text style={styles.capacityText}>{data.baggages || 2}</Text>
                    </Col>
                </Row>
                {data.image ? (
                    <Image
                        source={{ uri: data.image }}
                        style={styles.img}
                        accessibilityLabel={`Image of ${data.name}`}
                    />
                ) : (
                    <Text style={styles.errorText}>Image not available</Text>
                )}
            </View>

            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <View style={styles.containerText}>
                    <Text style={styles.text}>Tentang Paket</Text>
                    <View>
                        <Text style={styles.text}>Include</Text>
                        <View>
                            {include.map((item, index) => (
                                <Text key={index} style={styles.textIsi}>{`\u2022 ${item.key}`}</Text>
                            ))}
                        </View>
                    </View>
                    <View>
                        <Text style={styles.text}>Exclude</Text>
                        <View>
                            {exclude.map((item, index) => (
                                <Text key={index} style={styles.textIsi}>{`\u2022 ${item.key}`}</Text>
                            ))}
                        </View>
                    </View>
                </View>
            </ScrollView>

            <View style={styles.footer}>
                <Text style={styles.price}>{formatCurrency.format(data.price)}</Text>
                <Button color="#3D7B3F" title="Lanjutkan Pembayaran" accessibilityLabel="Proceed to Payment" />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backButton: {
        position: 'absolute',
        top: 40,
        left: 20,
        zIndex: 10,
    },
    header: {
        alignItems: "center",
        padding: 15,
        backgroundColor: "#fff",
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
    },
    scrollViewContent: {
        padding: 15,
        flexGrow: 1,
    },
    loading: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    errorText: {
        color: 'red',
        fontSize: 16,
        textAlign: 'center',
        marginTop: 20,
    },
    carName: {
        fontFamily: "PoppinsBold",
        fontSize: 20,
        marginBottom: 10,
        textAlign: "center",
    },
    capacityText: {
        color: "#8A8A8A",
        fontSize: 16,
        fontFamily: "PoppinsBold",
    },
    icon: {
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 20,
    },
    textIcon: {
        flexDirection: "row",
        alignItems: "center",
        gap: 2,
        margin: 5,
    },
    img: {
        width: "100%",
        height: 200,
        borderRadius: 10,
        marginBottom: 20,
        marginTop: 20,
        resizeMode: "contain",
    },
    containerText: {
        paddingTop: 20,
        paddingHorizontal: 20,
        backgroundColor: "#fff",
        borderRadius: 10,
        shadowColor: "#000",
        shadowRadius: 3,
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 1 },
        marginBottom: 20,
    },
    text: {
        fontFamily: "PoppinsBold",
        fontSize: 16,
    },
    textIsi: {
        fontFamily: "PoppinsBold",
        fontSize: 16,
        color: "#8A8A8A",
        padding: 5,
    },
    price: {
        fontFamily: "PoppinsBold",
        fontSize: 16,
        marginBottom: 20,
    },
    footer: {
        backgroundColor: "#eeeeee",
        padding: 20,
    },
});
