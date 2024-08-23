import { View, Text } from 'react-native'
import { useLocalSearchParams } from 'expo-router'
import React from 'react'

export default function details() {
    const { id } = useLocalSearchParams();

    return (
        <View>
            <Text>detail {id}</Text>
        </View>
    )
}