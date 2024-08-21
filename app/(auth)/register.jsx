import {
    View, Text, Image, TextInput,
    Button, StyleSheet, Alert
} from 'react-native';
import React, { useState } from 'react';
import { Link, router } from 'expo-router';

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignUp = () => {
        if (!name || !email || !password) {
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


        router.navigate('/');
        Alert.alert('Success', 'Account created successfully!');
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
                    value={name}
                    onChangeText={setName}
                    accessibilityLabel="Full Name"
                />
            </View>
            <View style={styles.formContainer}>
                <Text style={styles.formLabel}>Email*</Text>
                <TextInput
                    style={styles.formInput}
                    placeholder='johndee@gmail.com'
                    value={email}
                    onChangeText={setEmail}
                    accessibilityLabel="Email"
                />
            </View>
            <View style={styles.formContainer}>
                <Text style={styles.formLabel}>Password*</Text>
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
                    onPress={handleSignUp}
                    color='#3D7B3F'
                    title="Sign Up"
                    accessibilityLabel='Sign Up'
                />
                <Text style={styles.textRegister}>
                    Already have an account?{` `}
                    <Link
                        style={styles.linkLogin}
                        href="/">Sign In here</Link>
                </Text>
            </View>
        </View>
    );
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
    linkLogin: {
        color: '#0D28A6',
        textDecorationLine: 'underline',
        fontFamily: 'Poppins',
        fontSize: 14,
        fontWeight: '700'
    },
    logo: {
        marginTop: 23,
        marginLeft: 21,
    }
});
