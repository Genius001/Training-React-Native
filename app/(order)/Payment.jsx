import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { ProgressStep, ProgressSteps } from "react-native-progress-stepper";
import formatIDR from '@/utils/formatCurrency'
import Step1 from "./steps/Step1";
import Step2 from "./steps/Step2";
import Step3 from "./steps/Step3";
import { selectCarDetail } from "@/redux/reducers/car/carDetailSlice";
import { selectOrder, setStateByName } from "@/redux/reducers/order/orderSlice"
import { useDispatch, useSelector } from "react-redux";

export default function Payment() {
  const { data } = useSelector(selectCarDetail);
  const { activeStep, selectedBank } = useSelector(selectOrder)
  const dispatch = useDispatch()
  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <ProgressSteps activeStep={activeStep}>
        <ProgressStep label="Pilih Metode" removeBtnRow={true}>
          <Step1 />
        </ProgressStep>
        <ProgressStep label="Bayar" removeBtnRow={true}>
          <Step2 />
        </ProgressStep>
        <ProgressStep label="Tiket" removeBtnRow={true}>
          <Step3 />
        </ProgressStep>
      </ProgressSteps>
      <View style={styles.footer}>
        <Text style={styles.price}>{formatIDR(data.price || 0)}</Text>
        <Button
          disabled={!selectedBank && true}
          color="#3D7B3F"
          onPress={() => {
            dispatch(setStateByName({ name: 'activeStep', value: 1 }));
          }}
          title="Lanjutkan Pembayaran"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  price: {
    fontFamily: "PoppinsBold",
    fontSize: 20,
    marginBottom: 10,
  },
  footer: {
    backgroundColor: "#eeeeee",
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
  },
})
