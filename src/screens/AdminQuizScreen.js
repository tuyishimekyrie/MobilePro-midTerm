import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import colors from "../config/colors";
import { useNavigation } from "@react-navigation/native";

const AdminQuizScreen = ({ route }) => {
  const { title, questions } = route.params;
  const navigation = useNavigation();

  const renderQuizTitle = ({ item }) => (
    <TouchableOpacity style={styles.item} onPress={() => navigation.navigate("AdminQuizQuestions", { questions: item.questions })}>
      <Text style={styles.title}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <FlatList
        data={questions}
        renderItem={renderQuizTitle}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
    padding: 20,
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.white,
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    color: colors.white,
    marginBottom: 10,
  },
  item: {
    backgroundColor: "rgba(255, 255, 255, .1)",
    padding: 20,
    marginVertical: 8,
    borderRadius: 5,
  },
});

export default AdminQuizScreen;
