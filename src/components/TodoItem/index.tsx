import React, { useRef, useState } from "react";
import { Animated, TouchableOpacity, Text } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import { Colors, Spacings } from "themes";

interface Props {
  todo: string;
  onDelete?: () => void;
}

const TodoItem: React.FC<Props> = props => {
  const { todo, onDelete } = props;
  const animatedTodoValue = useRef(new Animated.Value(0)).current;

  return (
    <PanGestureHandler
      onGestureEvent={Animated.event(
        [{ nativeEvent: { translationX: animatedTodoValue } }],
        {
          useNativeDriver: true,
        },
      )}
      minPointers={1}
      maxPointers={1}
      onHandlerStateChange={(event: any) => {
        console.log("event", event.nativeEvent);
        if (event.nativeEvent.state === 5) {
          if (event.nativeEvent.translationX < -100) {
            Animated.timing(animatedTodoValue, {
              toValue: -200,
              duration: 200,
              useNativeDriver: true,
            }).start(() => {
              onDelete && onDelete();
            });
          } else {
            Animated.timing(animatedTodoValue, {
              toValue: 0,
              duration: 200,
              useNativeDriver: true,
            }).start();
          }
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
                translateX: animatedTodoValue,
              },
            ],
          },
        ]}
      >
        <Text style={{ fontSize: Spacings.normal, color: Colors.primary }}>
          {todo}
        </Text>
      </Animated.View>
    </PanGestureHandler>
  );
};

export default TodoItem;
