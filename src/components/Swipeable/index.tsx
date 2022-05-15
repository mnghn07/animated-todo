import React, { useRef, useState } from "react";
import { Animated, TouchableOpacity, Text } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import { Colors, Spacings } from "themes";
import { EVENT_TYPE } from "utils";

interface Props {}

const Swipeable: React.FC<Props> = props => {
  const swiperValue = useRef(new Animated.Value(0)).current;

  // State of events
  // ! UNDETERMINED -> BEGAN ------> ACTIVE ------> END -> UNDETERMINED

  // ? UNDETERMINED(0)
  // ? FAILED(1)
  // ? BEGAN(2)
  // ? CANCELLED(3)
  // ? ACTIVE(4)
  // ? END(5)

  return (
    <PanGestureHandler
      onGestureEvent={Animated.event(
        [{ nativeEvent: { translationX: swiperValue } }],
        {
          useNativeDriver: true,
        },
      )}
      minPointers={1}
      maxPointers={1}
      onHandlerStateChange={(event: any) => {
        console.log("event", event.nativeEvent);
        if (event.nativeEvent.state === EVENT_TYPE.END) {
          // if (event.nativeEvent.translationX < -200) {
          // Animated.timing(animatedTodoValue, {
          //   toValue: -200,
          //   duration: 200,
          //   useNativeDriver: true,
          // }).start(({ finished }) => {
          //   // if finished,
          //   if (finished) {
          //     Animated.timing(animatedTodoValue, {
          //       toValue: 0,
          //       duration: 0,
          //       useNativeDriver: true,
          //     }).start();
          //   }
          // });
          // } else {
          Animated.timing(swiperValue, {
            toValue: 0,
            duration: 100,
            useNativeDriver: true,
          }).start();
          // }
        }
      }}
    >
      <Animated.View
        style={[
          {
            width: "100%",
            // height: 40,
            // width: 120,
            backgroundColor: Colors.secondary,
            padding: Spacings.normal,
            marginBottom: Spacings.small,
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
          },
          {
            transform: [
              {
                translateX: swiperValue,
              },
            ],
          },
        ]}
      >
        {props.children}
      </Animated.View>
    </PanGestureHandler>
  );
};

export default Swipeable;
