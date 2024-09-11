import React from "react";
import { View, Text, StyleSheet, Modal, Pressable } from "react-native";
import { useSelector } from "react-redux";
import { selectCarDetail } from "@/redux/reducers/car/carDetailSlice";
import ListCar from "@/components/ListCar";

export default function OrderListModal({ visible, onClose }) {
  const data = useSelector(selectCarDetail).data;

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Daftar Pesanan</Text>
          {data ? (
            <ListCar
              image={{ uri: data.image }}
              carName={data.name}
              price={data.price}
              baggage={data.baggage || 4}
              passengers={data.passengers || 5}
            />
          ) : (
            <Text style={styles.noOrdersText}>No Orders Available</Text>
          )}
          <Pressable style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Close</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
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
  noOrdersText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#3D7B3F',
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    textAlign: 'center',
  },
});
