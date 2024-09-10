import { View, Text, Image, StyleSheet, TouchableOpacity, Modal, Dimensions, BackHandler } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectAuth } from '@/redux/reducers/auth/authSlice';
import { useRouter } from 'expo-router';

export default function Profile() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { isAuthenticated, user } = useSelector(selectAuth);
  const [isLogoutModalVisible, setLogoutModalVisible] = useState(false);
  const screenWidth = Dimensions.get('window').width;

  const handleLogout = () => {
    setLogoutModalVisible(true);
  };

  const confirmLogout = () => {
    dispatch(logout());
    setLogoutModalVisible(false);
  };

  const handleRegister = () => {
    router.push('../(auth)/Register');
  };
  // Handle Android Back Button to prompt logout
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      setLogoutModalVisible(true);
      return true;
    });

    return () => backHandler.remove();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title} accessibilityLabel="Account Title">Account</Text>
      <View style={styles.content}>
        <Image
          style={[styles.image, { width: screenWidth * 0.9, height: screenWidth * 0.45 }]}
          source={require('@/assets/images/park.png')}
          onError={() => Alert.alert('Error', 'Failed to load image')}
        />
        {isAuthenticated ? (
          <View style={styles.userInfo}>
            <Text style={styles.email} accessibilityLabel={`User Email: ${user}`}>
              Email: {user}
            </Text>
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
              <Text style={styles.logoutButtonText}>Logout</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.registerPrompt}>
            <Text style={styles.text} accessibilityLabel="Registration Prompt">
              Oops! You don’t have an account yet. Start creating an account to make transactions at TMMIN Car Rental easier.
            </Text>
            <TouchableOpacity style={styles.button} onPress={handleRegister}>
              <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Custom Logout Confirmation Modal */}
      <Modal
        visible={isLogoutModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setLogoutModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Are you sure you want to log out?</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setLogoutModalVisible(false)}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.confirmButton} onPress={confirmLogout}>
                <Text style={styles.buttonText}>Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    position: 'absolute',
    top: 20,
    left: 20,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    marginBottom: 20,
    alignSelf: 'center',
  },
  text: {
    fontSize: 14,
    fontWeight: '700',
    fontFamily: 'Poppins',
    textAlign: 'center',
    marginBottom: 20,
  },
  userInfo: {
    alignItems: 'center',
  },
  email: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  registerPrompt: {
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#3D7B3F',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  logoutButton: {
    backgroundColor: '#FF4D4D',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  cancelButton: {
    backgroundColor: '#CCC',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 10,
    alignItems: 'center',
  },
  confirmButton: {
    backgroundColor: '#FF4D4D',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginLeft: 10,
    alignItems: 'center',
  },
});
