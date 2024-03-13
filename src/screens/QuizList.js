import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import Screen from "../components/Screen";
import AppText from "../components/AppText";
import colors from "../config/colors";
import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import QuizScreen from "./QuizScreen";
import { NavigationContainer } from "@react-navigation/native";

export default function QuizList() {
  const navigation = useNavigation();

  const quizData = [
    {
      id: 1,
      title: "Introduction to typescript",
    },
    {
      id: 2,
      title: "Introduction to Docker",
    },
    {
      id: 3,
      title: "Introduction to typescript",
    },
    {
      id: 4,
      title: "Introduction to typescript",
    },
    {
      id: 5,
      title: "Introduction to typescript",
    },
    {
      id: 6,
      title: "Introduction to typescript",
    },
    {
      id: 7,
      title: "Introduction to typescript",
    },
    {
      id: 8,
      title: "Introduction to typescript",
    },
    {
      id: 9,
      title: "Introduction to typescript",
    },
  ];

  const Item = ({ title, id }) => (
    <ScrollView>
      <View style={styles.item}>
     
        <TouchableOpacity
          onPress={() => navigation.navigate("QuizScreen",  {id,title})}
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
        <View>
          <FlatList
            style={styles.containerBottom}
            data={quizData}
            renderItem={({ item }) => <Item title={item.title} id={item.id} />}
            keyExtractor={(item) => item.id}
          />
        </View>
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
