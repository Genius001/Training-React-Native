import { Pressable, StyleSheet } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function ButtonIcon(
    { onPress, style, ...rest }
) {
    return (
        <Pressable style={styles.box} onPress={onPress}>
            <FontAwesome size={28} style={style}{...rest} />

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