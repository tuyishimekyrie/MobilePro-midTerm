import { View, Text, TouchableOpacity,StyleSheet } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import QuizList from "../screens/QuizList";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Profile from "../screens/Profile";
import WelcomeScreen from "../screens/WelcomeScreen";
import colors from "../config/colors";
import AdminQuizList from "../screens/AdminQuizList";
import CreateQuizScreen from "../screens/CreateQuizScreen";
import AppText from "../components/AppText";


const Tab = createBottomTabNavigator();
export default function AdminNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#2563eb",
        tabBarActiveBackgroundColor: colors.bg,
        tabBarInactiveBackgroundColor: colors.bg,
      }}
    >
      <Tab.Screen
        name="AdminQuizList"
        component={AdminQuizList}
        options={{
          headerShown:false,
          headerStyle: {
            backgroundColor: colors.bg,
          },
          headerTintColor: colors.white,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="progress-question" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Add Quiz"
        component={CreateQuizScreen}
        options={{
          headerShown:false,
          headerStyle: {
            backgroundColor: colors.bg,
          },
          headerTintColor: colors.white,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="plus-circle-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown:false,
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
          tabBarButton: () => (
            <TouchableOpacity onPress={() => console.log('clicked')}>
              <View style={styles.logout}>
                <MaterialCommunityIcons name="logout" size={22} color={colors.light} />
                <AppText style={styles.logoutText}>Logout</AppText>
              </View>
            </TouchableOpacity>
          ),
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="logout" color={color} size={size} />
          ),
        })}
      />
    </Tab.Navigator>
  );
}
const styles = StyleSheet.create({
  logout: {
    flex: 1,
    alignItems: "center",
    justifyContent:"flex-end",
    gap: 5,
    paddingRight: 50,
    paddingLeft: 50,
    backgroundColor:colors.bg
  },
  logoutText: {
    color: colors.light,
    fontSize: 10
  }
})