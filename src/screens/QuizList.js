import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import React, { useState } from "react";
import Screen from "../components/Screen";
import AppText from "../components/AppText";
import colors from "../config/colors";
import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import QuizScreen from "./QuizScreen";
import { NavigationContainer } from "@react-navigation/native";

export default function QuizList() {
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false); // State to manage refreshing

  const onRefresh = () => {
    // Function to handle refresh
    setRefreshing(true);
    // You may perform any necessary operations here to update quizData
    setTimeout(() => {
      setRefreshing(false);
    }, 1000); // Simulating a delay to refresh data
  };

  const quizData = [
    {
      id: 1,
      title: "Introduction to TypeScript",
      description: "Learn the basics of TypeScript programming language.",
      numberOfQuestions: 5,
    },
    {
      id: 2,
      title: "Introduction to Docker",
      description: "Learn the fundamentals of Docker containerization.",
      numberOfQuestions: 10,
    },
    {
      id: 3,
      title: "React Hooks",
      description: "Explore React's Hooks API for state and side effects.",
      numberOfQuestions: 8,
    },
    {
      id: 4,
      title: "Node.js Fundamentals",
      description:
        "Learn the core concepts of Node.js for backend development.",
      numberOfQuestions: 12,
    },
    {
      id: 5,
      title: "HTML Basics",
      description: "Understand the fundamentals of HTML markup language.",
      numberOfQuestions: 7,
    },
    {
      id: 6,
      title: "CSS Styling",
      description: "Master the art of styling web pages using CSS.",
      numberOfQuestions: 9,
    },
    {
      id: 7,
      title: "JavaScript Essentials",
      description:
        "Explore the essential concepts of JavaScript programming language.",
      numberOfQuestions: 15,
    },
    {
      id: 8,
      title: "Python Basics",
      description: "Learn the basics of Python programming language.",
      numberOfQuestions: 10,
    },
    {
      id: 9,
      title: "SQL Fundamentals",
      description:
        "Understand the fundamentals of SQL for database management.",
      numberOfQuestions: 10,
    },
    {
      id: 10,
      title: "Algorithms and Data Structures",
      description: "Study the fundamental algorithms and data structures.",
      numberOfQuestions: 20,
    },
  ];

  const Item = ({ title, id }) => (
    <ScrollView
    >
      <View style={styles.item}>
        <TouchableOpacity
          onPress={() => navigation.navigate("QuizScreen", { id, title })}
        >
          <Text style={styles.title}>{title}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
  return (
    <>
      <Screen style={styles.container}>
        <AppText style={styles.headtitle}>List Of Quiz</AppText>
        <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      } // Integrating RefreshControl
    >
          <FlatList
            style={styles.containerBottom}
            data={quizData}
            renderItem={({ item }) => <Item title={item.title} id={item.id} />}
            keyExtractor={(item) => item.id}
          />
        </ScrollView>
      </Screen>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
    flex: 1,
    //   width: "100%",
    //   alignItems: "center"
  },
  item: {
    backgroundColor: "rgba(255,255,255,.1)",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 5,
  },
  title: {
    color: colors.white,
    fontSize: 20,
  },
  headtitle: {
    color: colors.white,
    marginTop: 10,
    marginBottom: 10,
    paddingLeft: 140,
  },
  containerBottom: {
    marginBottom: 100,
  },
});
