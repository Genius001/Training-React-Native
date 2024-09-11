import {
  View, Text, Image, TextInput,
  Button, StyleSheet,
} from 'react-native';
import React, { useState } from 'react';
import { Link, useRouter } from 'expo-router';
import ModalPopUp from '../../components/Modal';
import { Feather } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { registerUser } from '@/redux/reducers/auth/authApi';
import * as Yup from 'yup';
import { Formik } from 'formik';

// Yup validation schema
const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string()
    .min(8, 'Too Short!')
    .max(20, 'Too Long!')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character")
    .required('Required'),
});

export default function Register() {
  const [modalVisible, setModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const router = useRouter();
  const dispatch = useDispatch(); // Ensure dispatch is correctly used

  const handleSubmit = async (values) => {
    console.log('test submit');
    try {
      // Dispatch registerUser thunk with form values
      await dispatch(registerUser(values)).unwrap();
      console.log('Registration successful');
      setSuccessMessage('Register Successfully!');
      setModalVisible(true);
      setTimeout(() => {
        setModalVisible(false);
        setSuccessMessage(null);
        router.navigate('/Login');
      }, 2000);
    } catch (e) {
      console.error('Registration error:', e);
      setErrorMessage(e.message);
      setModalVisible(true);
      setTimeout(() => {
        setModalVisible(false);
        setErrorMessage(null);
      }, 2000);
    }
  };

  return (
    <View>
      <Image style={styles.logo} source={require('@/assets/images/tmmin.png')} />
      <Text style={styles.heading}>Sign Up</Text>

      <Formik
        initialValues={{
          name: '',
          email: '',
          password: ''
        }}
        validationSchema={SignupSchema}
        onSubmit={handleSubmit} // Use the handleSubmit function directly
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <>
            <View style={styles.formContainer}>
              <Text style={styles.formLabel}>Name*</Text>
              <TextInput
                onBlur={handleBlur('name')}
                onChangeText={handleChange('name')}
                style={styles.formInput}
                placeholder='Name'
                autoCapitalize='words'
              />
              {errors.name && touched.name ? <Text style={styles.errorText}>{errors.name}</Text> : null}
            </View>
            <View style={styles.formContainer}>
              <Text style={styles.formLabel}>Email*</Text>
              <TextInput
                onBlur={handleBlur('email')}
                onChangeText={handleChange('email')}
                style={styles.formInput}
                placeholder='johndee@gmail.com'
                keyboardType='email-address'
                autoCapitalize='none'
              />
              {errors.email && touched.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}
            </View>
            <View style={styles.formContainer}>
              <Text style={styles.formLabel}>Password*</Text>
              <TextInput
                style={styles.formInput}
                onBlur={handleBlur('password')}
                onChangeText={handleChange('password')}
                secureTextEntry={true}
                placeholder='Password'
                autoCapitalize='none'
              />
              {errors.password && touched.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}
            </View>

            <View style={styles.formContainer}>
              <Button
                onPress={handleSubmit}
                color="#3D7B3F"
                title="Sign Up"
              />
              <Text style={styles.textRegister}>
                Already have an account?{` `}
                <Link style={styles.linkRegister} href="/Login">Sign in here</Link>
              </Text>
            </View>
          </>
        )}
      </Formik>

      {/* Modal for showing success or error messages */}
      <ModalPopUp visible={modalVisible}>
        <View style={styles.modalBackground}>
          {errorMessage ?
            <>
              <Feather size={32} name={'x-circle'} color={'red'} style={styles.modalIcon} />
              <Text style={styles.modalText}>{errorMessage}</Text>
            </>
            :
            <>
              <Feather size={32} name={'check-circle'} color={'#3D7B3F'} style={styles.modalIcon} />
              <Text style={styles.modalText}>{successMessage}</Text>
            </>
          }
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
  formInput: {
    borderWidth: 1,
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
  errorText: {
    color: 'red',
    marginTop: 5,
  },
});
