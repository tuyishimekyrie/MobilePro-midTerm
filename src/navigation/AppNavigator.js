import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import QuizList from "../screens/QuizList";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Profile from "../screens/Profile";
import WelcomeScreen from "../screens/WelcomeScreen";
import colors from "../config/colors";

const Tab = createBottomTabNavigator();
export default function AppNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#2563eb",
        tabBarActiveBackgroundColor: colors.bg,
        tabBarInactiveBackgroundColor: colors.bg,
      }}
    >
      <Tab.Screen
        name="Quiz"
        component={QuizList}
        options={{
          headerStyle: {
            backgroundColor: colors.bg,
          },
          headerTintColor: colors.white,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerStyle: {
            backgroundColor: colors.bg,
          },
          headerTintColor: colors.white,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Logout"
        component={WelcomeScreen}
        options={({ navigation }) => ({
          //   tabBarButton: () => (
          //     <TouchableOpacity onPress={() => console.log("clicked")}>
          //       <View>
          //         <MaterialCommunityIcons name="logout" size={30} />
          //       </View>
          //     </TouchableOpacity>
          //   ),
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="logout" color={color} size={size} />
          ),
        })}
      />
    </Tab.Navigator>
  );
}
