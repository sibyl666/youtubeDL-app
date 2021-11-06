import React, { useRef } from "react";
import {
  Animated,
} from "react-native";

export const useButtonAnimation = (): [
  Animated.AnimatedInterpolation, 
  () => void
] => {
  const value = useRef(new Animated.Value(0)).current;

  const backgroundColor = value.interpolate({
    inputRange: [0, 1],
    outputRange: ["rgba(124, 58, 237, 1)", "rgba(33, 33, 33, 1)"]
  })

  const startEffect = () => {
    Animated.stagger(500, [
      Animated.timing(value, {
        toValue: 1,
        duration: 200,
        useNativeDriver: false
      }),
      Animated.timing(value, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false
      })
    ]).start();
  }

  return [backgroundColor, startEffect]
}
