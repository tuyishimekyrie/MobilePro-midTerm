import React, { useState, useEffect, useContext } from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WelcomeScreen from "./src/screens/WelcomeScreen";
// import Signup from "./src/screens/Signup";
import About from "./src/screens/About";
import Login from "./src/screens/Login";
import QuizList from "./src/screens/QuizList";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AccountNavigator from "./src/navigation/AccountNavigator";
import AppNavigator from "./src/navigation/AppNavigator";
import AdminNavigator from "./src/navigation/AdminNavigator";
import AuthNavigator from "./src/navigation/AuthNavigator";
import { UserProvider } from "./src/context/UserContext";

import { UserContext } from "./src/context/UserContext";

function App() {
  const { user } = useContext(UserContext); // Access user and role from context
  console.log(user);
  // Render navigation based on user authentication status and role
  return (
    <NavigationContainer>
      {user ? (
        // If user is authenticated, render appropriate navigator based on role
        user.role === "admin" ? (
          <AdminNavigator />
        ) : (
          <AccountNavigator />
        )
      ) : (
        // If user is not authenticated, render the AuthNavigator for authentication
        <AuthNavigator />
      )}
    </NavigationContainer>
  );
}

// Wrap the App component with the UserProvider to provide user context
export default function WrappedApp() {
  return (
    <UserProvider>
      <App />
    </UserProvider>
  );
}
