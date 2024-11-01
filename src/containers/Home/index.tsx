import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Animated,
} from "react-native";
import { Colors, Spacings } from "themes";
import { Swipeable } from "components";

interface HomeScreenProps {
  navigation: any;
}

const HomeScreen: React.FC<HomeScreenProps> = props => {
  const { navigation } = props;

  const [input, setInput] = useState("");
  const [todos, setTodos]: any[] = useState([]);

  const onAddTodo = () => {
    if (input.length > 0) {
      setTodos([...todos, input]);
      setInput("");
    }
  };

  const onDeleteTodo = (index: number) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  return (
    <View
      style={{
        flex: 1,
        padding: Spacings.normal,
        backgroundColor: Colors.primary,
      }}
    >
      <Text style={{ fontSize: Spacings.normal, color: Colors.secondary }}>
        Todo List
      </Text>
      {/* Todo list */}
      <TextInput
        value={input}
        onChangeText={setInput}
        placeholder={"Add your todo..."}
        placeholderTextColor={Colors.secondary}
        style={{
          width: "100%",
          fontSize: Spacings.normal,
          color: Colors.secondary,
          borderWidth: 0.5,
          borderColor: Colors.secondary,
          padding: Spacings.small,
          marginVertical: Spacings.small,
        }}
        selectionColor={Colors.secondary}
        onSubmitEditing={onAddTodo}
      />
      <TouchableOpacity
        style={{
          width: "100%",
          height: 40,
          backgroundColor: Colors.secondary,
          borderRadius: Spacings.small,
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={onAddTodo}
      >
        <Text style={{ fontSize: Spacings.normal, color: Colors.primary }}>
          Add
        </Text>
      </TouchableOpacity>
      <View
        style={{
          flex: 1,
          borderWidth: 1,
          borderColor: Colors.secondary,
          marginVertical: Spacings.large,
          overflow: "hidden",
        }}
      >
        {todos.map((todo: any, index: number) => (
          <Swipeable
            key={"todo" + todo}
            onSwipeRight={() => onDeleteTodo(index)}
          >
            <Text style={{ fontSize: Spacings.normal, color: Colors.primary }}>
              {todo}
            </Text>
          </Swipeable>
        ))}
      </View>
    </View>
  );
};

export default HomeScreen;
