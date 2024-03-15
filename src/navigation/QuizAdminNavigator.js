import { View, Text } from "react-native";
import React from "react";
// import { createStackNavigator } from "@react-navigation/stack";
import QuizScreen from "../screens/QuizScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import QuizList from "../screens/QuizList";
import colors from "../config/colors";
import AdminQuizList from "../screens/AdminQuizList";
import AdminQuizScreen from "../screens/AdminQuizScreen";


const Stack = createNativeStackNavigator();

export default function QuizAdminNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="QuizList"
        component={AdminQuizList}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="AdminQuizScreen" component={AdminQuizScreen}   options={{
          headerStyle: {
            backgroundColor: colors.bg,
          },
          headerTintColor: "white",
        }}/>
    </Stack.Navigator>
  );
}
