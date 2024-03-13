import { View, Text, StyleSheet } from "react-native";
import React from "react";
import Screen from "../components/Screen";
import AppText from "../components/AppText";
import colors from "../config/colors";
import { AppForm, AppFormField } from "../components/forms";

export default function CreateQuizScreen() {
  return (
    <Screen style={styles.container}>
      <AppText style={styles.quizTitle}>Add Quiz</AppText>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.bg,
    flex: 1,
    alignItems: "center",
  },
  quizTitle: {
    color: colors.white,
  },
});
