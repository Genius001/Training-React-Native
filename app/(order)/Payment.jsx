import { View, Text, StyleSheet, Button, ActivityIndicator, Modal, TouchableOpacity, Pressable } from "react-native";
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
import React, { useState, useEffect } from "react";
import OrderListModal from "@/components/OrderList";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "expo-router";

export default function Payment() {
  const carDetail = useSelector(selectCarDetail);
  const { data, activeStep, selectedBank, status, errorMessage } = useSelector(selectOrder);
  const { user, accessToken } = useSelector(selectAuth);
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [orderListVisible, setOrderListVisible] = useState(false);
  const navigation = useNavigation();

  const handleOrder = async () => {
    if (!accessToken) {
      alert("Login First");
      return;
    }

    const formData = {
      carId: carDetail.data.id,
      startRentAt: moment().format('YYYY-MM-DD'),
      finishRentAt: moment().add(4, "days").format('YYYY-MM-DD'),
    };

    try {
      await dispatch(postOrder({ token: accessToken, formData }));
    } catch (error) {
      console.error("Order submission failed", error);
    }
  };

  useEffect(() => {
    if (status === "success") {
      dispatch(setStateByName({ name: 'activeStep', value: 1 }));
    } else if (status === "error") {
      setModalVisible(true);
    }
  }, [status]);

  return (
    <View style={styles.container}>
      {activeStep < 2 && (
        <Pressable
          onPress={() => {
            if (activeStep === 1) {
              dispatch(setStateByName({ name: 'selectedBank', value: null }));
            }
            navigation.goBack();
          }}
          style={styles.backButton}
        >
          <Feather name="arrow-left" size={24} color="black" />
          <Text style={styles.pembayaranText}>Pembayaran</Text>
        </Pressable>
      )}
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
              onPress={() => {
                dispatch(setStateByName({ name: 'isModalVisible', value: true }));
              }}
              title="Konfirmasi Pembayaran"
            />
          </>
        )}

        {activeStep > 0 && (
          <>
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={() => setOrderListVisible(true)}>
                <Text style={styles.orderListText}>Lihat Daftar Pesanan</Text>
              </TouchableOpacity>
            </View>
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
      <OrderListModal
        visible={orderListVisible}
        onClose={() => setOrderListVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  buttonContainer: {
    borderWidth: 2,
    borderColor: 'green',
    marginTop: 10,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
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
    zIndex: 1,
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
  closeButton: {
    padding: 10,
    backgroundColor: '#3D7B3F',
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    textAlign: 'center',
  },
  orderListText: {
    fontSize: 16,
    color: '#3D7B3F',
  },
  backButton: {
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    zIndex: 2,
  },
  pembayaranText: {
    fontSize: 18,
    fontFamily: "PoppinsBold",
    marginLeft: 10,
  },
});
