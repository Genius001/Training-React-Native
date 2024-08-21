import React from 'react';
import { Text, StyleSheet } from 'react-native';

export default function FormLabel({ label }) {
    return (
        <Text style={styles.label}>
            {label}
        </Text>
    );
}

const styles = StyleSheet.create({
    label: {
        fontFamily: 'Poppins-Bold',
        fontSize: 14,
        marginBottom: 5,
    },
});
