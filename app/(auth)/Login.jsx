import { View, Text, Image, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import Button from '@/components/Button';
import React, { useCallback, useEffect, useState } from 'react';
import { Link, router } from 'expo-router';
import ModalPopUp from '../../components/Modal';
import { Feather } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuth, fetchAuth, closeModal } from '@/redux/reducers/auth/authSlice';

export default function Login() {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const dispatch = useDispatch();
  const authState = useSelector(selectAuth);

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSignIn = async () => {
    const { email, password } = formData;

    if (!email || !password) {
      showModal('Please fill out all fields.');
      return;
    }
    if (!email.includes('@')) {
      showModal('Please enter a valid email address.');
      return;
    }
    if (password.length < 6) {
      showModal('Password must be at least 6 characters long.');
      return;
    }
    if (password.includes(' ')) {
      showModal('Password cannot contain spaces.');
      return;
    }

    try {
      await dispatch(fetchAuth({ email, password })).unwrap();
      showModal('Login Successful!');
      setTimeout(() => {
        setModalVisible(false);
        router.navigate("../(tabs)");
      }, 1000);
    } catch (e) {
      showModal(`${e.message}`);
    }
  };

  const showModal = (message) => {
    setModalMessage(message);
    setModalVisible(true);
    setTimeout(() => {
      setModalVisible(false);
    }, 2000);
  };

  return (
    <View>
      <Image style={styles.logo} source={require('@/assets/images/tmmin.png')} />
      <Text style={styles.heading}>Welcome Back!</Text>
      <View style={styles.formContainer}>
        <Text style={styles.formLabel}>Email*</Text>
        <TextInput
          style={styles.formInput}
          placeholder='johndee@gmail.com'
          value={formData.email}
          onChangeText={(value) => handleChange('email', value)}
        />
      </View>
      <View style={styles.formContainer}>
        <Text style={styles.formLabel}>Password*</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.formInputPassword}
            secureTextEntry={!showPassword}
            placeholder='Password'
            value={formData.password}
            onChangeText={(value) => handleChange('password', value)}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)} activeOpacity={0.7}>
            <Feather
              name={showPassword ? "eye-off" : "eye"}
              size={24}
              style={styles.eyeIcon}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.formContainer}>
        <Button
          onPress={handleSignIn}
          color='#3D7B3F'
          title="Sign In"
        />
        <Text style={styles.textRegister}>
          Don't have an account?{` `}
          <Link
            style={styles.linkRegister} href="/Register">Sign up for free</Link>
        </Text>
      </View>
      <ModalPopUp visible={modalVisible}>
        <View style={styles.modalBackground}>
          <Feather
            name={modalMessage.startsWith('Login Successful') ? "check-circle" : "x-circle"}
            size={32}
            color={modalMessage.startsWith('Login Successful') ? "#3D7B3F" : 'red'}
            style={styles.modalIcon}
          />
          <Text style={styles.modalText}>{modalMessage}</Text>
        </View>
      </ModalPopUp>
    </View>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 40,
    fontFamily: 'PoppinsBold',
    textAlign: 'center',
    marginVertical: 40,
  },
  formContainer: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  formLabel: {
    fontFamily: 'PoppinsBold',
    fontSize: 14,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
  },
  eyeIcon: {
    right: 10,
  },
  formInput: {
    borderWidth: 1,
    padding: 10,
  },
  formInputPassword: {
    padding: 10,
  },
  textRegister: {
    marginTop: 10,
    textAlign: 'center',
  },
  linkRegister: {
    color: '#0D28A6',
    textDecorationLine: 'underline',
    fontFamily: 'Poppins',
    fontSize: 14,
    fontWeight: '700',
  },
  logo: {
    marginTop: 23,
    marginLeft: 21,
  },
  modalBackground: {
    width: '90%',
    backgroundColor: 'white',
    elevation: 20,
    borderRadius: 4,
    padding: 20,
    alignItems: 'center',
  },
  modalIcon: {
    alignItems: 'center',
  },
  modalText: {
    fontSize: 16,
    color: '#000000',
    textAlign: 'center',
    marginTop: 10,
  },
});
