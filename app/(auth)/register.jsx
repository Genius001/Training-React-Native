import {
  View, Text, Image, TextInput,
  Button, StyleSheet, TouchableOpacity
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { Link, router } from 'expo-router';
import ModalPopUp from '../../components/Modal';
import { Feather } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '@/redux/reducers/auth/authApi';
import { selectAuth } from '@/redux/reducers/auth/authSlice';
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

  const dispatch = useDispatch();
  const authState = useSelector(selectAuth);

  useEffect(() => {
    let timeout;

    if (authState.error) {
      setErrorMessage(authState.error);
      setSuccessMessage(null);
      setModalVisible(true);
      timeout = setTimeout(() => {
        setModalVisible(false);
        setErrorMessage(null);
      }, 2000);
    } else if (authState.user) {
      setErrorMessage(null);
      setSuccessMessage('Register Successfully!');
      setModalVisible(true);
      timeout = setTimeout(() => {
        setModalVisible(false);
        setSuccessMessage(null);
        router.navigate('/Login');
      }, 2000);
    }

    return () => clearTimeout(timeout);
  }, [authState]);

  return (
    <View>
      <Image style={styles.logo} source={require('@/assets/images/tmmin.png')} />
      <Text style={styles.heading}>Sign Up</Text>

      {/* Formik component with Yup validation */}
      <Formik
        initialValues={{
          name: '',
          email: '',
          password: ''
        }}
        validationSchema={SignupSchema}
        onSubmit={async (values) => {
          try {
            // Dispatch registerUser thunk with form values
            await dispatch(registerUser(values)).unwrap();
            setSuccessMessage('Register Successfully!');
            setModalVisible(true);
            setTimeout(() => {
              setModalVisible(false);
              setSuccessMessage(null);
              router.navigate('/Login');
            }, 2000);
          } catch (e) {
            setErrorMessage(e.message);
            setModalVisible(true);
            setTimeout(() => {
              setModalVisible(false);
              setErrorMessage(null);
            }, 2000);
          }
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <>
            <View style={styles.formContainer}>
              <Text style={styles.formLabel}>Name*</Text>
              <TextInput
                onBlur={handleBlur('name')}
                onChangeText={handleChange('name')}
                style={styles.formInput}
                placeholder='name'
              />
              {errors.name && touched.name ? <Text>{errors.name}</Text> : null}
            </View>
            <View style={styles.formContainer}>
              <Text style={styles.formLabel}>Email*</Text>
              <TextInput
                onBlur={handleBlur('email')}
                onChangeText={handleChange('email')}
                style={styles.formInput}
                placeholder='johndee@gmail.com'
              />
              {errors.email && touched.email ? <Text>{errors.email}</Text> : null}
            </View>
            <View style={styles.formContainer}>
              <Text style={styles.formLabel}>Create Password</Text>
              <TextInput
                style={styles.formInput}
                onBlur={handleBlur('password')}
                onChangeText={handleChange('password')}
                secureTextEntry={true}
                placeholder='password'
              />
              {errors.password && touched.password ? <Text>{errors.password}</Text> : null}
            </View>

            <View style={styles.formContainer}>
              <Button
                onPress={handleSubmit}
                color="#3D7B3F"
                title="Sign Up"
              />
              <Text style={styles.textRegister}>
                Already have an account?{` `}
                <Link style={styles.linkRegister} href="/">Sign in free</Link>
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
});
