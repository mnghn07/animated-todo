import React, { useRef, useState } from "react";
import {
  Animated,
  TouchableOpacity,
  Text,
  ViewStyle,
  View,
} from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import { Colors, Spacings } from "themes";
import { EVENT_TYPE } from "utils";

interface Props {
  onSwipeRight: () => void;
}

const Swipeable: React.FC<Props> = props => {
  const { onSwipeRight } = props;
  // main children element animated Value
  const swiperAnimatedValue = useRef(new Animated.Value(0)).current;
  const dismissAnimatedValue = useRef(new Animated.Value(0)).current;
  const backgroundAnimatedValue = useRef(new Animated.Value(0)).current;

  // State of events
  // ! UNDETERMINED -> BEGAN ------> ACTIVE ------> END -> UNDETERMINED

  return (
    <PanGestureHandler
      onGestureEvent={Animated.event(
        [{ nativeEvent: { translationX: swiperAnimatedValue } }],
        {
          useNativeDriver: true,
        },
      )}
      minPointers={1}
      maxPointers={1}
      onHandlerStateChange={(event: any) => {
        console.log("event", event.nativeEvent);
        const { state, translationX } = event.nativeEvent;
        if (state === EVENT_TYPE.END) {
          if (translationX > -250) {
            Animated.parallel([
              Animated.timing(backgroundAnimatedValue, {
                toValue: 1,
                duration: 100,
                useNativeDriver: true,
              }),
              Animated.timing(dismissAnimatedValue, {
                toValue: -100,
                duration: 300,
                useNativeDriver: true,
              }),
            ]).start(({ finished }) => {
              if (finished) {
                onSwipeRight && onSwipeRight();
              } else {
                Animated.timing(dismissAnimatedValue, {
                  toValue: 0,
                  duration: 200,
                  useNativeDriver: true,
                }).start();
              }
            });
            return;
          }
          Animated.timing(swiperAnimatedValue, {
            toValue: 0,
            duration: 100,
            useNativeDriver: true,
          }).start();
        }
      }}
    >
      <Animated.View
        style={[
          {
            width: "100%",
            height: 40,
            // width: 120,
            backgroundColor: Colors.secondary,
            marginBottom: Spacings.small,
            justifyContent: "center",
            alignItems: "flex-start",
            overflow: "hidden",
          },
          {
            transform: [
              {
                translateX: swiperAnimatedValue,
              },
            ],
          },
        ]}
      >
        <Animated.View
          style={[
            {
              flex: 1,
              width: "100%",
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
              overflow: "hidden",
            },
            {
              transform: [
                {
                  translateY: dismissAnimatedValue,
                },
              ],
            },
          ]}
        >
          {props.children}
          <Animated.View
            style={[
              {
                position: "absolute",
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: Colors.black,
                opacity: 0,
              },
              {
                opacity: backgroundAnimatedValue,
              },
            ]}
          />
        </Animated.View>
      </Animated.View>
    </PanGestureHandler>
  );
};

export default Swipeable;
