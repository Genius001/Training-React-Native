import { StyleSheet, View } from "react-native";
import React from "react";

export function Container({ style, children }) {
    return (
        <View styles={{ ...style.container, style }}>
            {children}
        </View>
    )
}

export function Row({ alignItems, justifyContent, style, children }) {
    return (
        <View styles={
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
        <View styles={style}>
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