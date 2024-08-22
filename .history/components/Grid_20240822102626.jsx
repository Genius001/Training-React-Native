import { StyleSheet } from "react-native";
import { View } from "react-native-web";

export function Container({ style, children }) {
    return (
        <View styles={{ ...style.container, style }}>
            {children}
        </View>
    )
}

export function Row({ alignItems, justfyContent, style, children }) {
    return (
        <View styles={
            {
                ...styles.row,
                alignItems: alignItems ? alignItems : 'baseline',
                justfyContent: justfyContent ? justfyContent : 'flex-start',
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