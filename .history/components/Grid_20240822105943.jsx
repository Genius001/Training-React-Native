import { StyleSheet, View } from "react-native";
import React from "react";

export function Container({ style, children }) {
    return (
        <View style={{ ...style.container, style }}>
            {children}
        </View>
    )
}

export function Row({ alignItems, justifyContent, style, children }) {
    return (
        <View style={
            {
                ...styles.row,
                alignItems: alignItems ? alignItems : 'baseline',
                justifyContent: justifyContent ? justifyContent : 'flex-start',
                ...style
            }
        }>
            {children}
        </View >
    )
}

export function Col({ style, children }) {
    return (
        <View style={style}>
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
    },
    row: {
        flexDirection: "row",

    }
})