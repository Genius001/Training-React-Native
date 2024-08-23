import {
    View, Text, Image, TextInput,
    Button, StyleSheet, Alert
} from 'react-native'
import React, { useState } from 'react'
import { Link, router } from 'expo-router';

export default function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignIn = () => {
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


        router.navigate('../(tabs)');
        Alert.alert('Sign In Succesfully!');
    };
    return (
        <View>
            <Image style={styles.logo} source={require('@/assets/images/tmmin.png')} />
            <Text style={styles.heading}>Welcome Back!</Text>
            <View style={styles.formContainer}>
                <Text style={styles.formLabel}>Email</Text>
                <TextInput
                    style={styles.formInput}
                    placeholder='johndee@gmail.com'
                    value={email}
                    onChangeText={setEmail}
                    accessibilityLabel="Email"
                />
            </View>
            <View style={styles.formContainer}>
                <Text style={styles.formLabel}>Password</Text>
                <TextInput
                    style={styles.formInput}
                    secureTextEntry={true}
                    placeholder='password'
                    value={password}
                    onChangeText={setPassword}
                    accessibilityLabel="Password"
                />
            </View>
            <View style={styles.formContainer}>
                <Button
                    onPress={handleSignIn}
                    color='#3D7B3F'
                    title="Sign In"
                    accessibilityLabel='Sign In' />
                <Text style={styles.textRegister}>
                    Don't have an account?{` `}
                    <Link
                        style={styles.linkRegister} href="./register">Sign up for free</Link></Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    heading: {
        fontSize: 40,
        fontFamily: 'PoppinsBold',
        textAlign: 'center',
        marginVertical: 40
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
        textAlign: 'center'
    },
    linkRegister: {
        color: '#0D28A6',
        textDecorationLine: 'underline',
        fontFamily: 'Poppins',
        fontSize: 14,
        fontWeight: '700'
    }

    , logo: {
        marginTop: 23,
        marginLeft: 21,
    }
})