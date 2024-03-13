import { View, Text } from "react-native";
import React from "react";
// import { createStackNavigator } from "@react-navigation/stack";
import QuizScreen from "../screens/QuizScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import QuizList from "../screens/QuizList";
import colors from "../config/colors";

const Stack = createNativeStackNavigator();

export default function QuizNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="QuizList"
        component={QuizList}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="QuizScreen" component={QuizScreen}   options={{
          headerStyle: {
            backgroundColor: colors.bg,
          },
          headerTintColor: "white",
        }}/>
    </Stack.Navigator>
  );
}
