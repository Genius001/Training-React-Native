import {
    View, Text, Image, TextInput,
    Button, StyleSheet, Alert, TouchableOpacity
} from 'react-native';
import React, { useState } from 'react';
import { Link, router } from 'expo-router';
import ModalPopUp from '../../components/Modal';
import { Feather } from '@expo/vector-icons';
import * as SecureStore from 'expo-secure-store';

async function save(key, value) {
    await SecureStore.setItemAsync(key, value);
}

export default function Login() {
    const [modalVisible, setModalVisible] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (name, value) => {
        setFormData({ ...formData, [name]: value });
    };

    const handleSignIn = async () => {
        console.log('Form Data:', formData);
        const { email, password } = formData;

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

        try {
            const response = await fetch("https://api-car-rental.binaracademy.org/customer/auth/login", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password,
                }),
            });

            const body = await response.json();
            if (!response.ok) throw new Error(body.message)
            save("user", JSON.stringify(body))
            setModalVisible(true);
            setTimeout(() => {
                setModalVisible(false);
                router.navigate("../(tabs)");
            }, 1000);
        } catch (e) {
            console.log(e)
            console.log(e.message);
        }
    };

    return (
        <View>
            <Image style={styles.logo} source={require('@/assets/images/tmmin.png')} />
            <Text style={styles.heading}>Welcome Back!</Text>
            <View style={styles.formContainer}>
                <Text style={styles.formLabel}>Email</Text>
                <TextInput
                    style={styles.formInputEmail}
                    placeholder='johndee@gmail.com'
                    value={formData.email}
                    onChangeText={(value) => handleChange('email', value)}
                    accessibilityLabel="Email"
                />
            </View>
            <View style={styles.formContainer}>
                <Text style={styles.formLabel}>Password</Text>
                <View style={styles.passwordContainer}>
                    <TextInput
                        style={styles.formInputPassword}
                        secureTextEntry={!showPassword}
                        placeholder='password'
                        value={formData.password}
                        onChangeText={(value) => handleChange('password', value)}
                        accessibilityLabel="Password"
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
                    onPress={handleSignIn}
                    color='#3D7B3F'
                    title="Sign In"
                    accessibilityLabel='Sign In'
                />
                <Text style={styles.textRegister}>
                    Don't have an account?{` `}
                    <Link
                        style={styles.linkRegister} href="/Register">Sign up for free</Link>
                </Text>
            </View>
            <ModalPopUp
                visible={modalVisible}>
                <View style={styles.modalBackground}>
                    <Feather
                        name="check-circle"
                        size={32}
                        color="#3D7B3F"

                    />
                    <Text style={styles.formLabel}>Login Success!</Text>
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
    formInputEmail: {
        padding: 10,
        borderWidth: 1,
    },
    eyeIcon: {
        right: 10,
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
    },
});
