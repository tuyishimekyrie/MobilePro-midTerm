import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import WelcomeScreen from "./WelcomeScreen";
// import About from "./src/screens/About";
import Login from "./Login";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AdminNavigator from "../navigation/AdminNavigator";
// import AppNavigator from "./src/navigation/AppNavigator";
import QuizNavigator from "../navigation/QuizNavigator";
import { UserProvider } from "../context/UserContext";

const Stack = createStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator>
      {/* <Tab.Screen name="Quiz" component={QuizNavigator} /> */}
      {/* <Tab.Screen name="Admin" component={AdminNavigator} /> */}
      <Tab.Screen name="App" component={AppNavigator} />
    </Tab.Navigator>
  );
}

function App() {
  const isLoggedIn = true; // Add your logic here to check if the user is logged in
  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator headerMode="none">
          {isLoggedIn ? (
            <Stack.Screen name="MainTabs" component={MainTabs} />
          ) : (
            <Stack.Screen name="AuthStack" component={AuthStack} />
          )}
          {/* <Stack.Screen name="About" component={About} /> */}
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
}

export default App;
