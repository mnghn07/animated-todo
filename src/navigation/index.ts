import React from "react";
import {
  CommonActions,
  LinkingOptions,
  NavigationContainer,
  NavigatorScreenParams,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// create navigation container
const AppNavigator = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <AppNavigator.Navigator></AppNavigator.Navigator>
    </NavigationContainer>
  );
};
