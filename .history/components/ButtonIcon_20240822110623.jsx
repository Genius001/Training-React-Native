import { Pressable, StyleSheet } from 'react-native'
import React from 'react'
import { Feather } from '@expo/vector-icons'


export default function ButtonIcon(
    { onPress, style, ...rest }
) {
    return (
        <Pressable style={styles.box} onPress={onPress}>
            <Feather size={28} style={style}{...rest} />
        </Pressable>
    )
}

const styles = StyleSheet.create({
    box: {
        borderRadius: 8,
        backgroundColor: '#A43333',
        padding: 20,

    },
})