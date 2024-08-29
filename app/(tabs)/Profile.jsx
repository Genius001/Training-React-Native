import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectAuth } from '@/redux/reducers/auth/authSlice';
import { useRouter } from 'expo-router';

export default function Profile() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { isAuthenticated, user } = useSelector(selectAuth);

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleRegister = () => {
    router.push('../(auth)/Register');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Akun</Text>
      <Image style={styles.image} source={require('@/assets/images/park.png')} />
      {isAuthenticated ? (
        <View style={styles.userInfo}>
          <Text style={styles.email}>Email: {user?.email}</Text>
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={handleLogout}
          >
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View>
          <Text style={styles.text}>
            Upss kamu belum memiliki akun. Mulai buat akun agar transaksi di TMMIN Car Rental lebih mudah
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={handleRegister}
          >
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 20,
    alignSelf: 'flex-start',
  },
  image: {
    width: '100%',
    height: 200,
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
  },
  button: {
    backgroundColor: '#3D7B3F',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
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
});
