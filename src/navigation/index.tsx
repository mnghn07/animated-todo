import React from "react";
import {
  CommonActions,
  LinkingOptions,
  NavigationContainer,
  NavigatorScreenParams,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { HomeScreen } from "containers";
import { Colors } from "themes";

// create navigation container
const AppNavigator = createStackNavigator();

const Root = () => {
  return (
    <NavigationContainer>
      <AppNavigator.Navigator
        initialRouteName="home"
        screenOptions={{
          headerTitle: "TODO HERE",
          headerTitleStyle: { color: Colors.primary, fontSize: 24 },
        }}
      >
        <AppNavigator.Screen name="home" component={HomeScreen} />
      </AppNavigator.Navigator>
    </NavigationContainer>
  );
};

export default Root;
