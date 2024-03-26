import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from "react-native";
import Screen from "../components/Screen";
import AppText from "../components/AppText";
import colors from "../config/colors";
import { SubmitButton, AppForm, AppFormField } from "../components/forms";
import { useNavigation } from "@react-navigation/native";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase";

export default function CreateQuizScreen() {
  const navigation = useNavigation();
  const defaultQuestion = { text: "", options: ["", ""], correctAnswer: "" };
  const [quizData, setQuizData] = useState({
    quizTitle: "",
    numberOfQuestions: 1,
    questions: [{ ...defaultQuestion }],
  });
  const [refreshing, setRefreshing] = useState(false); // State to manage refreshing

  const onRefresh = () => {
    // Function to handle refresh
    setRefreshing(true);
    // Reset options to default state
    const resetQuestions = quizData.questions.map((question) => ({
      ...question,
      options: ["", ""],
    }));
    setQuizData((prevState) => ({
      ...prevState,
      questions: resetQuestions,
    }));
    setTimeout(() => {
      setRefreshing(false);
    }, 1000); // Simulating a delay to refresh data
  };

  const handleAddQuestion = () => {
    setQuizData((prevState) => ({
      ...prevState,
      numberOfQuestions: prevState.numberOfQuestions + 1,
      questions: [...prevState.questions, { ...defaultQuestion }],
    }));
  };

  const handleChangeQuestion = (text, questionIndex) => {
    const newQuestions = [...quizData.questions];
    newQuestions[questionIndex].text = text;
    setQuizData((prevState) => ({
      ...prevState,
      questions: newQuestions,
    }));
  };

  const handleChangeCorrectAnswer = (text, questionIndex) => {
    const newQuestions = [...quizData.questions];
    newQuestions[questionIndex].correctAnswer = text;
    setQuizData((prevState) => ({
      ...prevState,
      questions: newQuestions,
    }));
  };

  const handleChangeOption = (text, questionIndex, optionIndex) => {
    const newQuestions = [...quizData.questions];
    newQuestions[questionIndex].options[optionIndex] = text;
    setQuizData((prevState) => ({
      ...prevState,
      questions: newQuestions,
    }));
  };

  const handleAddOption = (questionIndex) => {
    const newQuestions = [...quizData.questions];
    newQuestions[questionIndex].options.push(""); // Add an empty option
    setQuizData((prevState) => ({
      ...prevState,
      questions: newQuestions,
    }));
  };

  const handleSubmit = async() => {
    console.log(quizData);
    // Logic to submit quiz data to Firestore or wherever needed
    try {
      // Add quizData to Firestore
      const docRef = await addDoc(collection(db, "quizzes"), {
        ...quizData,
        createdAt: serverTimestamp() // Add timestamp when the quiz is created
      });
      console.log("Quiz added with ID: ", docRef.id);
      navigation.navigate("AdminQuizList"); // Navigate to the list of quizzes after adding
    } catch (error) {
      console.error("Error adding quiz: ", error);
    }
  };

  const handleNavigateWhere = () => {
    navigation.navigate("AdminQuizList");
  };

  return (
    <Screen style={styles.container}>
      <AppText style={styles.quizTitle}>Add Quiz</AppText>
      <AppForm initialValues={{ quizTitle: "" }} onSubmit={handleSubmit}>
        <AppFormField
          placeholder="Enter quiz title"
          name="quizTitle"
          value={quizData.quizTitle}
          onChangeText={(text) => setQuizData({ ...quizData, quizTitle: text })}
          autoCorrect={false}
          autoCapitalize="none"
        />
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {quizData.questions.map((question, questionIndex) => (
            <View key={questionIndex}>
              <AppFormField
                placeholder={`Question ${questionIndex + 1}`}
                value={question.text}
                onChangeText={(text) =>
                  handleChangeQuestion(text, questionIndex)
                }
                autoCorrect={false}
                autoCapitalize="none"
              />
              {question.options.map((option, optionIndex) => (
                <AppFormField
                  key={optionIndex}
                  placeholder={`Option ${optionIndex + 1}`}
                  value={option}
                  onChangeText={(text) =>
                    handleChangeOption(text, questionIndex, optionIndex)
                  }
                  autoCorrect={false}
                  autoCapitalize="none"
                />
              ))}
              <TouchableOpacity
                onPress={() => handleAddOption(questionIndex)}
                style={styles.addOptionButton}
              >
                <Text style={styles.addOptionButtonText}>Add Option</Text>
              </TouchableOpacity>
              <AppFormField
                placeholder="Correct Answer" // Input for correct numerical answer
                value={question.correctAnswer}
                onChangeText={(text) =>
                  handleChangeCorrectAnswer(text, questionIndex)
                }
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="numeric" // Set keyboardType to numeric for numerical input
              />
            </View>
          ))}
        </ScrollView>
        <TouchableOpacity onPress={handleAddQuestion} style={styles.addButton}>
          <Text style={styles.addButtonText}>Add Question</Text>
        </TouchableOpacity>
        <AppText style={styles.numberOfQuestions}>
          Total Questions: {quizData.numberOfQuestions}
        </AppText>
        <SubmitButton title="Submit" navigateWhere={handleNavigateWhere} />
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
    marginBottom: 20,
    alignItems: "center",
  },
  addButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "bold",
  },
  numberOfQuestions: {
    color: colors.white,
    alignSelf: "center",
  },
  addOptionButton: {
    backgroundColor: colors.primary,
    padding: 10,
    borderRadius: 40,
    marginTop: 10,
    marginBottom: 20,
    alignItems: "center",
    alignSelf: "flex-start",
    marginLeft: 10,
  },
  addOptionButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "bold",
  },
});
