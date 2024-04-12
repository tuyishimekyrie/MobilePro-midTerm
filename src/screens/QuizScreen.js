import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, Modal, TouchableOpacity } from "react-native";
import colors from "../config/colors";
import CheckBox from "expo-checkbox";
import WelcomeBtn from "../components/button/welcome";
import { useNavigation } from "@react-navigation/native";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../firebase";
import { UserContext } from "../context/UserContext";

const QuizScreen = ({ route }) => {
  const { id, title } = route.params;
  const { user } = useContext(UserContext); // Access user and role from context
  console.log(user);
  const navigation = useNavigation();

  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);
  const [score, setScore] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const docRef = doc(db, "quizzes", id); // Reference to the quiz document
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const fetchedQuestions = docSnap.data().questions; // Assuming questions is an array field in the quiz document
          setQuestions(fetchedQuestions);
          console.log(questions);
          setLoading(false);
        } else {
          console.log("No such document!");
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching questions:", error);
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [id]);

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  const handleOptionSelection = (index) => {
    setSelectedOptionIndex(index);
  };

  const handleNextQuestion = () => {
    // const correctAnswerIndex = currentQuestion.correctAnswerIndex;
    const correctAnswerIndex = currentQuestion.correctAnswer - 1;

    if (selectedOptionIndex !== null) {
      if (selectedOptionIndex === correctAnswerIndex) {
        setScore(score + 1);
      }

      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        setIsModalVisible(true);
      }

      setSelectedOptionIndex(null);
    } else {
      alert("Please select an option before moving to the next question.");
    }
  };

  const handleCloseModal = async () => {
    // Assuming you have a way to get the current user ID (e.g., currentUser.uid)
    const userId = user.uid; // Replace currentUser.uid with actual user ID
    try {
      // Add the score to the "scores" collection
      await addDoc(collection(db, "scores"), {
        userId: userId,
        quizId: id,
        score: score,
        createdAt: serverTimestamp(), // Add timestamp when the score is recorded
      });
      console.log("Score added successfully!");
    } catch (error) {
      console.error("Error adding score:", error);
    }
    setIsModalVisible(false);
    navigation.navigate("QuizList");
  };

  if (loading || questions.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.loading}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {currentQuestion ? (
        <>
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
          <WelcomeBtn
            title={isLastQuestion ? "Submit" : "Next"}
            onPress={handleNextQuestion}
          />

          <Modal
            animationType="slide"
            transparent={true}
            visible={isModalVisible}
            onRequestClose={() => setIsModalVisible(false)}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalText}>You scored {score}!</Text>
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={handleCloseModal}
                >
                  <Text style={styles.closeButtonText}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </>
      ) : (
        <Text>No questions found for this quiz.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
    padding: 20,
  },
  loading:{
    textAlign:"center",
    color: "#fff",
    fontSize:20
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
