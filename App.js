import * as React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WelcomeScreen from "./src/screens/WelcomeScreen";
import Signup from "./src/screens/Signup";
import About from "./src/screens/About";
import Login from "./src/screens/Login";
import QuizList from "./src/screens/QuizList";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AccountNavigator from "./src/navigation/AccountNavigator";
import AppNavigator from "./src/navigation/AppNavigator";
import AdminNavigator from "./src/navigation/AdminNavigator";
import AuthNavigator from "./src/navigation/AuthNavigator";




function App() {
  return (
    <NavigationContainer>
      {/* <AccountNavigator /> */}
      {/* <AdminNavigator /> */}
      <AuthNavigator />
    </NavigationContainer>
  );
}

export default App;
