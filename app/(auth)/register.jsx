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

export default function Register() {
    const [modalVisible, setModalVisible] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });

    const dispatch = useDispatch();
    const authState = useSelector(selectAuth);

    useEffect(() => {
        let timeout;

        console.log('authState:', authState);

        if (authState.error) {
            console.log('Error detected:', authState.error);
            setErrorMessage(authState.error);
            setSuccessMessage(null);
            setModalVisible(true);
            timeout = setTimeout(() => {
                setModalVisible(false);
                setErrorMessage(null);
            }, 2000);
        } else if (authState.user) {
            console.log('User registered successfully:', authState.user);
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

    const handleChange = (name, value) => {
        setFormData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleSignUp = async () => {
        const { name, email, password } = formData;

        if (!name || !email || !password) {
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
        const specialCharPattern = /[!@#$%^&*(),.?":{}|<>]/;
        if (!specialCharPattern.test(password)) {
            showModal('Password must contain at least one special character.');
            return;
        }

        try {
            console.log('Dispatching registerUser with:', { name, email, password });
            await dispatch(registerUser({ name, email, password })).unwrap();
            setFormData({ name: '', email: '', password: '' });
            setErrorMessage(null);
            setSuccessMessage('Register Successfully!');
            setModalVisible(true);
            setTimeout(() => {
                setModalVisible(false);
                setSuccessMessage(null);
                router.navigate('/Login');
            }, 2000);
        } catch (e) {
            console.error('Registration failed:', e.message);
            showModal(e.message);
        }
    };

    const showModal = (message) => {
        console.log('Showing modal with message:', message);
        setErrorMessage(message);
        setSuccessMessage(null);
        setModalVisible(true);
        setTimeout(() => {
            setModalVisible(false);
            setErrorMessage(null);
        }, 2000);
    };

    return (
        <View>
            <Image style={styles.logo} source={require('@/assets/images/tmmin.png')} />
            <Text style={styles.heading}>Sign Up</Text>
            <View style={styles.formContainer}>
                <Text style={styles.formLabel}>Name*</Text>
                <TextInput
                    style={styles.formInput}
                    placeholder='Full Name'
                    value={formData.name}
                    onChangeText={(value) => handleChange('name', value)}
                />
            </View>
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
                        autoCapitalize='none'
                    />
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
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
                    onPress={handleSignUp}
                    color='#3D7B3F'
                    title="Sign Up"
                />
                <Text style={styles.textLogin}>
                    Already have an account?{` `}
                    <Link
                        style={styles.linkLogin}
                        href="/Login">Sign In here</Link>
                </Text>
            </View>
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
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 1,
    },
    eyeIcon: {
        right: 10,
    },
    formLabel: {
        fontFamily: 'PoppinsBold',
        fontSize: 14,
    },
    formInput: {
        borderWidth: 1,
        padding: 10,
    },
    formInputPassword: {
        padding: 10,
    },
    textLogin: {
        marginTop: 10,
        textAlign: 'center',
    },
    linkLogin: {
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
