import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Screen from "../components/Screen";
import AppText from "../components/AppText";
import colors from "../config/colors";
import { SubmitButton, AppForm, AppFormField } from "../components/forms";

export default function CreateQuizScreen() {
  const [numberOfQuestions, setNumberOfQuestions] = useState(1);
  const [questions, setQuestions] = useState([""]);

  const incrementNumberOfQuestions = () => {
    setNumberOfQuestions(numberOfQuestions + 1);
    setQuestions([...questions, ""]);
  };

  const handleChangeQuestion = (text, index) => {
    const newQuestions = [...questions];
    newQuestions[index] = text;
    setQuestions(newQuestions);
  };

  return (
    <Screen style={styles.container}>
      <AppText style={styles.quizTitle}>Add Quiz</AppText>
      <AppForm>
        <AppFormField
          placeholder="Enter quiz title"
          name="quizTitle"
        />
        {questions.map((question, index) => (
          <AppFormField
            key={index}
            placeholder={`Question ${index + 1}`}
            name={`question${index + 1}`} // Set unique name for each question field
          />
        ))}
        <SubmitButton title="Add Question" onPress={incrementNumberOfQuestions} style={styles.addButton}/>
        <SubmitButton title="Submit" />
      </AppForm>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.bg,
    flex: 1,
    padding: 20,
  },
  quizTitle: {
    color: colors.white,
    fontSize: 24,
    alignSelf: "center",
    marginBottom: 20,
  },
  addButton: {
    backgroundColor: colors.primary,
    padding: 10,
    borderRadius: 40,
    marginTop: 20,
    marginBottom: 40,
  },
});
