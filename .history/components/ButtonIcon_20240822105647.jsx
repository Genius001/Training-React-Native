import { Pressable, StyleSheet } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons'
import React from 'react'


export default function ButtonIcon(
    { onPress, style, ...rest }
) {
    return (
        <Pressable style={styles.box} onPress={onPress}>
            <FontAwesome5 size={28} style={style}{...rest} />
        </Pressable>
    )
}

const styles = StyleSheet.create({
    box: {
        borderRadius: 8,
        backgroundColor: '#A43333',
        padding: 10,

    },
})