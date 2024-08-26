import {
    View, Text, Image, TextInput,
    Button, StyleSheet, Alert, TouchableOpacity
} from 'react-native';
import React, { useState } from 'react';
import { Link, router } from 'expo-router';
import ModalPopUp from '../../components/Modal';
import { Feather } from '@expo/vector-icons';

export default function Register() {
    const [modalVisible, setModalVisible] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (name, value) => {
        setFormData({ ...formData, [name]: value });
    };

    const handleSignUp = async () => {
        const { email, password } = formData;

        console.log('Form Data:', formData);

        if (!email || !password) {
            Alert.alert('Error', 'Please fill out all fields.');
            return;
        }
        if (!email.includes('@')) {
            Alert.alert('Error', 'Please enter a valid email address.');
            return;
        }
        if (password.length < 6) {
            Alert.alert('Error', 'Password must be at least 6 characters long.');
            return;
        }
        if (password.includes(' ')) {
            Alert.alert('Error', 'Password cannot contain spaces.');
            return;
        }
        const specialCharPattern = /[!@#$%^&*(),.?":{}|<>]/;
        if (!specialCharPattern.test(password)) {
            Alert.alert('Error', 'Password must contain at least one special character.');
            return;
        }

        try {
            const response = await
                fetch('https://api-car-rental.binaracademy.org/customer/auth/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: formData.email,
                        password: formData.password,
                        role: 'Customer',
                    }),
                });

            const body = await response.json();
            if (!response.ok) throw new Error(body.message || body.errors[0].message || "Something Went Wrong!")
            setModalVisible(true)
            setTimeout(() => {
                setModalVisible(false)
                router.navigate('/Login')
            }, 1000)
        } catch (e) {
            setErrorMessage(e.message)
            setModalVisible(true)
            setTimeout(() => {
                setModalVisible(false)
                setErrorMessage(null)
            }, 3000)
        }
    }

    return (
        <View>
            <Image style={styles.logo} source={require('@/assets/images/tmmin.png')} />
            <Text style={styles.heading}>Sign Up</Text>
            <View style={styles.formContainer}>
                <Text style={styles.formLabel}>Name*</Text>
                <TextInput
                    style={styles.formInput}
                    placeholder='name' />
                <View />

                <View style={styles.formContainer}></View>
                <Text style={styles.formLabel}>Email*</Text>
                <TextInput
                    style={styles.formInput}
                    placeholder='johndee@gmail.com'
                    value={formData.email}
                    onChangeText={(value) => handleChange('email', value)}
                    accessibilityLabel="Email"
                />
            </View>
            <View style={styles.formContainer}>
                <Text style={styles.formLabel}>Password*</Text>
                <View style={styles.passwordContainer}>
                    <TextInput
                        style={styles.formInputPassword}
                        secureTextEntry={!showPassword}
                        placeholder='password'
                        value={formData.password}
                        onChangeText={(value) => handleChange('password', value)}
                        accessibilityLabel="Password"
                        autoCapitalize='none'
                    />
                    <TouchableOpacity>
                        <Feather
                            name={showPassword ? "eye-off" : "eye"}
                            size={24}
                            onPress={() => setShowPassword(!showPassword)}
                            style={styles.eyeIcon}
                        />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.formContainer}>
                <Button
                    onPress={() => handleSignUp()}
                    color='#3D7B3F'
                    title="Sign Up"
                    accessibilityLabel='Sign Up'
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
                    {errorMessage !== null ?
                        <>
                            <Feather size={32} name={'x-circle'} color={'#3D7B3F'} style={{ alignItems: 'center' }} />
                            <Text>{errorMessage}</Text>
                        </>
                        :
                        <>
                            <Feather size={32} name={'check-circle'} color={'#3D7B3F'} style={{ alignItems: 'center' }} />
                            <Text>Register Successfully!</Text>
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
    },
});
