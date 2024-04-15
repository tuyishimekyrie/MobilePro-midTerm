import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
  Alert,
  ActivityIndicator, // Import ActivityIndicator
} from "react-native";
import Screen from "../components/Screen";
import colors from "../config/colors";
import { useNavigation } from "@react-navigation/native";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import SQLiteTestComponent from "../components/SQLiteTestComponent";
import CreateQuizTest from "../components/createQuizTest";

export default function AdminQuizList() {
  const navigation = useNavigation();
  const [quizData, setQuizData] = useState([]);
  const [loading, setLoading] = useState(false); // Add loading state
  const [refreshing, setRefreshing] = useState(false);

  const fetchQuizData = async () => {
    try {
      setLoading(true); // Set loading state to true while fetching data
      const querySnapshot = await getDocs(collection(db, "quizzes"));
      const fetchedQuizData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setQuizData(fetchedQuizData);
    } catch (error) {
      console.error("Error fetching quiz data:", error);
    } finally {
      // Set loading state to false after fetch completes
      setLoading(false);
      // Set refreshing state to false after fetch completes
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchQuizData();
  }, []);

  const handleDeleteQuiz = async (id) => {
    try {
      await deleteDoc(doc(db, "quizzes", id));
      Alert.alert("Success", "Quiz deleted successfully");
      await fetchQuizData(); // Refresh the quiz list after deletion
    } catch (error) {
      console.error("Error deleting quiz:", error);
      Alert.alert("Error", "An error occurred while deleting the quiz");
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchQuizData();
  };

  const renderQuizItem = ({ item }) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("AdminQuizScreen", {
          quizId: item.id,
          title: item.quizTitle,
          questions: item.questions,
        })
      }
      style={styles.item}
    >
      <Text style={styles.title}>{item.quizTitle}</Text>
      <View style={styles.iconsHolder}>
        <TouchableOpacity onPress={() => console.log("clicked edit icon")}>
          <MaterialCommunityIcons
            name="pencil"
            size={30}
            color={colors.secondary}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDeleteQuiz(item.id)}>
          <MaterialCommunityIcons
            name="trash-can-outline"
            size={30}
            color="red"
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <Screen style={styles.container}>
      {loading && <ActivityIndicator color={"#fff"} size={30} />}
      <FlatList
        data={quizData}
        renderItem={renderQuizItem}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </Screen>
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
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    color: colors.white,
    fontSize: 18,
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
  iconsWrapper: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 40,
  },
  iconsHolder: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 10,
  },
});
