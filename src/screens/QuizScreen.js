import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
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
import Ionicons from "@expo/vector-icons/Ionicons";
import { FontAwesome5 } from "@expo/vector-icons";
const QuizScreen = ({ route }) => {
  const [loadingModal, setLoadingModal] = useState(false);
  const { id, title } = route.params;
  const { user } = useContext(UserContext); // Access user and role from context
  console.log("user", user);
  console.log("user_id", user?.uid || user?.user?.uid);
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
    const userId = user?.uid || user?.user?.uid; // Replace currentUser.uid with actual user ID
    console.log(userId);
    try {
      setLoadingModal(true);
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
    } finally {
      setLoadingModal(false); // Set loading back to false after the operation completes
    }
    setIsModalVisible(false);
    navigation.navigate("QuizList");
  };

  if (loading || questions.length === 0) {
    return (
      <View style={[styles.loader]}>
        <Text style={styles.loading}>Loading Data from server</Text>
        <ActivityIndicator
          size="large"
          color="#f1f5f9"
          style={styles.loading}
        />
      </View>
    );
  }
  if (loadingModal) {
    console.log("Heloo");
  }
  console.log(questions);
  return (
    <View style={styles.container}>
      <Text style={styles.questionHeading}>
        Questions {currentQuestionIndex + 1} / {questions.length}
      </Text>
      <Text style={styles.title}>{title}</Text>
      {currentQuestion ? (
        <>
          <Text style={styles.question}>{currentQuestion.text}</Text>
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
                <FontAwesome5 name="award" size={50} color="#eab308" />
                <Text style={styles.titles}>{title}</Text>
                <Text style={styles.modalText}>
                  You scored {score} Out Of {questions.length}!
                </Text>
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={handleCloseModal}
                >
                  <Text style={styles.closeButtonText}>
                    {" "}
                    {loadingModal ? <ActivityIndicator /> : "Close"}
                  </Text>
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
  titles: {
    color: "#1e40af",
    fontSize: 24,
    flexWrap: "wrap",
  },
  loader: {
    backgroundColor: colors.bg,
    flex: 1,
    gap: 5,
    // flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  loading: {
    textAlign: "center",
    color: "#fff",
    fontSize: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.white,
    marginBottom: 10,
  },
  questionHeading: {
    color: "#3b82f6",
    marginBottom: 10,
  },
  question: {
    fontSize: 18,
    color: colors.white,
    marginBottom: 30,
  },
  optionContainer: {
    flexDirection: "row",
    marginBottom: 20,
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
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalText: {
    fontSize: 20,
    marginBottom: 20,
    marginTop: 10,
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
