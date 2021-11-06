import React from "react";
import {
  Text,
  Animated,
  Pressable,
  StyleSheet,
  TextProps,
} from "react-native";

const AnimatedText = Animated.createAnimatedComponent(Text);
const DownloadButton = (props: Animated.WithAnimatedObject<TextProps>) => {
  return (
    <Pressable style={{ width: "100%" }} onPress={props.onPress}>
      <AnimatedText style={[style.button, props.style]}>
        Download
      </AnimatedText>
    </Pressable>
  )
}

const style = StyleSheet.create({
  button: {
    padding: 8,
    borderRadius: 6,
    color: "white",
    textAlign: "center",
    backgroundColor: "#7C3AED",
    fontWeight: "bold",
    marginVertical: 5
  }
})

export default DownloadButton;
