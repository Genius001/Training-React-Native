import { Pressable, Text } from "react-native";
import { useCallback } from "react";
import Animated, { useSharedValue, withSpring } from "react-native-reanimated";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default Button = ({ title, children, color, disabled = false, onPress, style }) => {
    const opacity = useSharedValue(1);

    const handlePressIn = () => {
        opacity.value = withSpring(0.8);
    };

    const handlePressOut = () => {
        opacity.value = withSpring(1);
    };

    return (
        <AnimatedPressable
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            onPress={onPress}
            disabled={disabled}
            style={{
                opacity: disabled ? 0.5 : opacity,
                backgroundColor: color || '#fff',
                paddingVertical: 8,
                alignItems: "center",
                color: "#fff",
                ...style,
            }}
        >
            {!children ? <Text style={{
                color: "#fff",
                fontFamily: "PoppinsBold",
                fontSize: 14,
            }}
            >{title}</Text> : children}
        </AnimatedPressable>
    );
};