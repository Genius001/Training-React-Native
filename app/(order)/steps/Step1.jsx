import { useSelector } from "react-redux";
import { View, Text, TextInput, StyleSheet } from "react-native";
import ListCar from "@/components/ListCar";
import Button from "@/components/Button";
import { selectOrder } from "@/redux/reducers/order/orderSlice";
import { selectCarDetail } from "@/redux/reducers/car/carDetailSlice";
import { useCallback, useState } from "react";
import { Feather } from "@expo/vector-icons";

const formatCurrency = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
})
const paymentMethods = [
    "BCA", "MANDIRI", "BNI"
]
export default function step1({ setActivityStep }) {
    const [selectMethod, setSelectMethod] = useState(null);
    const { carId } = useSelector(selectOrder);
    const { data } = useSelector(selectCarDetail);
    const formatIDR = useCallback((price) => formatCurrency.format(price), []);
    return (
        <View style={styles.container}>
            <ListCar
                image={{ uri: data?.image }}
                carName={data?.name}
                passengers={data?.passengers || 5}
                baggage={data?.baggage || 2}
                price={data?.price}

            />
            <Text style={styles.textBold}>Pilih Bank Transfer</Text>R
            <Text style={styles.textBold}>
                Kamu bisa membayar dengan transfer melalui ATM, Internet Banking atau
                Mobile Banking
            </Text>
            <View>
                {paymentMethods.map((e) => (
                    <Button
                        key={e}
                        style={styles.paymentMethod}
                        onPress={() => setSelectMethod(e)}
                    >
                        <Text style={styles.paymentBox}>{e}</Text>
                        <Text style={styles.paymentText}>{e} Transfer</Text>
                        {selectMethod === e && <Feather size={20} name="check" color={"#3D7B3F"} />}
                    </Button>
                ))}

            </View>
            <View>
                <Text>% Pakai Kode Promo</Text>
                <View>
                    <TextInput placeholder="Tulis promomu disini" />
                    <Button title={"Terapkan"} />
                </View>
            </View>
            <View style={styles.footer}>
                <Text style={styles.price}>{formatIDR(data.price || 0)}</Text>
                <Button
                    disabled={true}
                    color="#3D7B3F"
                    onPress={() => {
                        setActiveStep(1)
                    }}
                    title="Lanjutkan Pembayaran"
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20
    },
    textBold: {
        fontFamily: 'PoppinsBold',
        fontSize: 16,
        marginBottom: 10
    },
    paymentMethod: {
        flexDirection: "row",
        alignItems: "flex-start",
        padding: 20,
        borderWidthBottom: 1,
        borderColorBottom: '#D0D0D0'
    },
    paymentBox: {
        borderWidth: 1,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderColor: '#D0D0D0'
    }
});