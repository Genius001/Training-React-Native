import { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button, ActivityIndicator, Modal } from "react-native";
import { ProgressStep, ProgressSteps } from "react-native-progress-stepper";
import formatIDR from '@/utils/formatCurrency';
import Step1 from "./steps/Step1";
import Step2 from "./steps/Step2";
import Step3 from "./steps/Step3";
import { selectCarDetail } from "@/redux/reducers/car/carDetailSlice";
import { selectOrder, setStateByName, postOrder } from "@/redux/reducers/order/orderSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectAuth } from '@/redux/reducers/auth/authSlice';
import moment from 'moment';
import React from "react";

export default function Payment() {
  const carDetail = useSelector(selectCarDetail);
  console.log(carDetail);
  const { data, activeStep, selectedBank, status, errorMessage } = useSelector(selectOrder);
  const { user, accessToken, isAuthenticated } = useSelector(selectAuth);
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);

  const handleOrder = () => {
    if (!accessToken) {
      console.error("User token is missing");
      return; // You might want to display an error message here
    }

    const formData = {
      carId: carDetail.data.id,
      startRentAt: moment().format('YYYY-MM-DD'),
      finishRentAt: moment().add(4, "days").format('YYYY-MM-DD'),
    };
    dispatch(postOrder({ token: accessToken, formData }));
  };

  useEffect(() => {
    if (status === "success") {
      console.log('Order Success');
      dispatch(setStateByName({ name: 'activeStep', value: 1 }));
    } else if (status === "error") {
      console.error('Error: ', errorMessage);
      setModalVisible(true); // Show error message to user
    }
  }, [status]);

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

      {status === "loading" && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#3D7B3F" />
          <Text style={styles.loadingText}>Processing your order...</Text>
        </View>
      )}

      <View style={styles.footer}>
        {activeStep === 0 && (
          <>
            <Text style={styles.price}>{formatIDR(carDetail.data.price || 0)}</Text>
            <Button
              disabled={!selectedBank}
              color="#3D7B3F"
              onPress={handleOrder}
              title="Lanjutkan Pembayaran"
            />
          </>
        )}
        {activeStep === 1 && (
          <>
            <Text style={styles.label}>Klik konfirmasi pembayaran untuk mempercepat proses pengecekan</Text>
            <Button
              color="#3D7B3F"
              style={{ marginBottom: 10 }}
              onPress={() => {
                dispatch(setStateByName({ name: 'isModalVisible', value: true }));
              }}
              title="Konfirmasi Pembayaran"
            />
            <Button
              color="#ffffff"
              TextColor="#000"
              title="Lihat Daftar Pesanan"
              onPress={() => {
                carDetail.data.name;
              }}
            />
          </>
        )}
      </View>

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Error</Text>
            <Text style={styles.modalMessage}>{errorMessage || 'Something went wrong. Please try again.'}</Text>
            <Button
              title="Close"
              onPress={() => setModalVisible(false)}
              color="#3D7B3F"
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  price: {
    fontFamily: "PoppinsBold",
    fontSize: 20,
    marginBottom: 10,
  },
  label: {
    fontFamily: "PoppinsBold",
    fontSize: 14,
    marginBottom: 10,
  },
  footer: {
    backgroundColor: "#eeeeee",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    zIndex: 1000,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#3D7B3F',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 16,
    marginBottom: 20,
  },
});
