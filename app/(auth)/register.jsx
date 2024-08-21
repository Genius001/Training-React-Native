import {
    View, Text, Image, TextInput,
    Button, StyleSheet
} from 'react-native'
import React from 'react'
import { Link, router } from 'expo-router';

export default function Register() {
    return (
        <View>
            <Image style={styles.logo} source={require('@/assets/images/tmmin.png')} />
            <Text style={styles.heading}>Sign Up</Text>
            <View style={styles.formContainer}>
                <Text style={styles.formLabel}>Name*</Text>
                <TextInput
                    style={styles.formInput}
                    placeholder='Full Name' />
            </View>
            <View style={styles.formContainer}>
                <Text style={styles.formLabel}>Email*</Text>
                <TextInput
                    style={styles.formInput}
                    placeholder='johndee@gmail.com' />
            </View>
            <View style={styles.formContainer}>
                <Text style={styles.formLabel}>Password*</Text>
                <TextInput
                    style={styles.formInput}
                    secureTextEntry={true}
                    placeholder='password'
                />
            </View>
            <View style={styles.formContainer}>
                <Button
                    onPress={() => router.navigate('/')}
                    color='#3D7B3F'
                    title="Sign Up" />
                <Text style={styles.textRegister}>
                    Already have an account?{` `}
                    <Link
                        style={styles.linkLogin} href="/">Sign In here</Link></Text>
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
    linkLogin: {
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