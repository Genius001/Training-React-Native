import { View, Text, Button, Image, StyleSheet } from 'react-native'
import React from 'react'
import { router } from 'expo-router'
import { Container } from '@/components/Grid'


export default function Profile() {
  return (
    <View>
      <Container style={styles.container} >
        <Text style={styles.title}>Akun</Text>
        <Image style={styles.image} source={require('@/assets/images/park.png')} />
        <Text style={styles.text}>Upss kamu belum memiliki akun. Mulai buat akun agar transaksi di TMMIN Car Rental lebih mudah</Text>
        <Button style={styles.button} title="Register" onPress={() => router.push('../(auth)/Register')} />
      </Container>
    </View>
  )
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
  },
  image: {
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 150,

  },
  text: {
    fontSize: 14,
    fontWeight: '700',
    fontFamily: 'Poppins',
    textAlign: 'center',
    justifyContent: 'center',
  },
  button: {}
})