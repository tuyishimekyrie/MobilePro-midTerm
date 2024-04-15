import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import QuizList from "../screens/QuizList";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Profile from "../screens/Profile";
import WelcomeScreen from "../screens/WelcomeScreen";
import colors from "../config/colors";
import AppText from "../components/AppText";
import QuizNavigator from "./QuizNavigator";
import { useUser } from "../context/UserContext";
import { signOut } from "@firebase/auth";
import { auth } from "../../firebase";
import Scores from "../screens/Scores";

const Tab = createBottomTabNavigator();
export default function AppNavigator() {
  const { setUser } = useUser();
  const handleLogout = async () => {
    try {
      await signOut(auth); // Sign out the user
      setUser(null); // Clear the user context
      // navigation.navigate('Login'); // Navigate to the login screen
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };
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
        component={QuizNavigator}
        options={{
          headerShown: false,
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
        name="Scores"
        component={Scores}
        options={{
          headerShown: false,
          headerStyle: {
            backgroundColor: colors.bg,
          },
          headerTintColor: colors.white,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="medal" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
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
            <TouchableOpacity onPress={() => handleLogout()}>
              <View style={styles.logout}>
                <MaterialCommunityIcons
                  name="logout"
                  size={22}
                  color={colors.light}
                />
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
    justifyContent: "flex-end",
    gap: 5,
    paddingRight:25,
    paddingLeft: 20,
    backgroundColor: colors.bg,
  },
  logoutText: {
    color: colors.light,
    fontSize: 10,
  },
});
