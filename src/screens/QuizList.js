import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Screen from "../components/Screen";
import colors from "../config/colors";
import { useNavigation } from "@react-navigation/native";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";

export default function QuizList() {
  const navigation = useNavigation();
  const [quizData, setQuizData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Enable offline persistence
    // async function enableOfflinePersistence() {
    //   await setPersistenceEnabled(true);
    // }
    // enableOfflinePersistence();

    const fetchQuizData = async () => {
      try {
        // Get initial data
        const initialSnapshot = await getDocs(collection(db, "quizzes"));
        const fetchedQuizData = initialSnapshot.docs.map((doc) => ({
          id: doc.id,
          title: doc.data().quizTitle,
        }));
        setQuizData(fetchedQuizData);

        // Listen for real-time updates
        const unsubscribe = onSnapshot(
          collection(db, "quizzes"),
          (snapshot) => {
            const updatedQuizData = snapshot.docs.map((doc) => ({
              id: doc.id,
              title: doc.data().quizTitle,
            }));
            setQuizData(updatedQuizData);
          }
        );

        return unsubscribe;
      } catch (error) {
        console.error("Error fetching quiz data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizData();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() =>
        navigation.navigate("QuizScreen", { id: item.id, title: item.title })
      }
    >
      <Text style={styles.title}>{item.title}</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <Screen style={styles.container}>
        <Text style={styles.loading}>Loading...</Text>
      </Screen>
    );
  }

  return (
    <Screen style={styles.container}>
      <FlatList
        data={quizData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.flatListContent}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
    justifyContent: "center",
    color: "#fff"
  },
  loading:{
    color:"#fff",
    fontSize:15,
    textAlign:"center"
  },
  flatListContent: {
    paddingVertical: 10,
  },
  item: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 5,
  },
  title: {
    color: colors.white,
    fontSize: 20,
  },
});
