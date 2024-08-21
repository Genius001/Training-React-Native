import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

export default function FormInput({ placeholder, secureTextEntry, value, onChangeText, accessibilityLabel }) {
    return (
        <TextInput
            style={styles.input}
            placeholder={placeholder}
            secureTextEntry={secureTextEntry}
            value={value}
            onChangeText={onChangeText}
            accessible={true}
            accessibilityLabel={accessibilityLabel}
        />
    );
}

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
    },
});
