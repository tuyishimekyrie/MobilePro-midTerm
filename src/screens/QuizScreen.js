import React, { useState } from "react";
import { View, Text, StyleSheet, Modal, TouchableOpacity } from "react-native";
import colors from "../config/colors";
import CheckBox from "expo-checkbox";
import WelcomeBtn from "../components/button/welcome";
import { useNavigation } from "@react-navigation/native";

const QuizScreen = ({ route }) => {
  const { title } = route.params;
  const navigation = useNavigation();

  // Sample quiz data (replace with your own)
  const quizData = [
    {
      id: 1,
      question: "What is TypeScript?",
      options: ["A superset of JavaScript", "A programming language", "A framework for building UIs", "A testing library"],
      correctAnswerIndex: 0, // Correct answer index should be 0 (first option)
    },
    {
      id: 2,
      question: "What is React Native?",
      options: ["A framework for building UIs", "A programming language", "A database management system", "A testing library"],
      correctAnswerIndex: 0, // Correct answer index should be 0 (first option)
    },
    // Add more questions here
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);
  const [score, setScore] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const currentQuestion = quizData[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === quizData.length - 1;

  const handleOptionSelection = (index) => {
    setSelectedOptionIndex(index);
  };

  const handleNextQuestion = () => {
    const correctAnswerIndex = currentQuestion.correctAnswerIndex;

    if (selectedOptionIndex !== null) {
      if (selectedOptionIndex === correctAnswerIndex) {
        setScore(score + 1);
      }

      if (currentQuestionIndex < quizData.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        setIsModalVisible(true);
      }

      setSelectedOptionIndex(null);
    } else {
      // Provide feedback to the user that an option must be selected before moving to the next question
      alert("Please select an option before moving to the next question.");
    }
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    navigation.navigate("QuizList");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.question}>{currentQuestion.question}</Text>
      {currentQuestion.options.map((option, index) => (
        <View key={index} style={styles.optionContainer}>
          <CheckBox
            style={styles.checkbox}
            value={selectedOptionIndex === index}
            onValueChange={() => handleOptionSelection(index)}
            color={colors.primary}
          />
          <Text style={styles.optionText}>{option}</Text>
        </View>
      ))}
      <WelcomeBtn title={isLastQuestion ? "Submit" : "Next"} onPress={handleNextQuestion} />

      {/* Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>You scored {score}!</Text>
            <TouchableOpacity style={styles.closeButton} onPress={handleCloseModal}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.white,
    marginBottom: 20,
  },
  question: {
    fontSize: 18,
    color: colors.white,
    marginBottom: 20,
  },
  optionContainer: {
    flexDirection: "row",
    marginBottom: 10,
    alignItems: "center",
  },
  checkbox: {
    marginRight: 10,
  },
  optionText: {
    color: colors.white,
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: colors.white,
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalText: {
    fontSize: 20,
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  closeButtonText: {
    color: colors.white,
    fontSize: 16,
  },
});

export default QuizScreen;
