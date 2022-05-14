// create a swipe-able component that wraps the children
import React, { Children, useRef } from "react";
import { View, Text } from "react-native";

import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";

interface SwipeableProps {
  // children should be content inside a Swipeable, could be button
  // children: React.ReactNode;
  // left buttons for swipe left
  leftButtons: React.ReactNode;
  // right buttons for swipe right
  rightButtons: React.ReactNode;
}

const Swipeable: React.FC<SwipeableProps> = props => {
  // const { children } = props;
  const isPressed = useSharedValue(false);
  const start = useSharedValue({ x: 0, y: 0 });
  const offset = useSharedValue({ x: 0, y: 0 });
  // const dragX = useRef(new Animated.Value(0)).current;

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: offset.value.x }, { translateY: 0 }],
    };
  });

  const gesture = Gesture.Pan()
    .onBegin(() => {
      "worklet";
      isPressed.value = true;
    })
    .onUpdate(e => {
      "worklet";
      offset.value = {
        x: e.translationX + start.value.x,
        y: e.translationY,
      };
    })
    .onEnd(() => {
      "worklet";
      start.value = {
        x: offset.value.x,
        y: offset.value.y,
      };
    })
    .onEnd(() => {
      "worklet";
      isPressed.value = false;
    });

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[{ flex: 1, width: "100%" }, animatedStyles]}>
        {props.children}
      </Animated.View>
    </GestureDetector>
  );
};

export default Swipeable;
