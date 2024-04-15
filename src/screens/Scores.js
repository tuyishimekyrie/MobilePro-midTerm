import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { RefreshControl } from "react-native";
import Screen from "../components/Screen";
import colors from "../config/colors";
import { useNavigation } from "@react-navigation/native";
import {
  collection,
  getDocs,
  getDoc,
  doc,
  query,
  where,
} from "@firebase/firestore";
import { db } from "../../firebase";
import { UserContext } from "../context/UserContext";

const Scores = () => {
  const navigation = useNavigation();
  const [scoresData, setScoresData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const { user } = useContext(UserContext); // Access user and role from context

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user && user.user && user.user.uid) {
          await fetchScoresData();
        }
      } catch (error) {
        console.error("Error fetching scores data:", error);
      }
    };

    fetchData();
  }, [user]); // Add user to dependency array

  const fetchScoresData = async () => {
    try {
      // Set refreshing state to true
      setRefreshing(true);

      // Query scores for the logged-in user
      const scoresQuery = query(
        collection(db, "scores"),
        where("userId", "==", user.user.uid)
      );
      const scoresSnapshot = await getDocs(scoresQuery);

      console.log("Scores Snapshot:", scoresSnapshot.docs);

      const fetchedScoresData = await Promise.all(
        scoresSnapshot.docs.map(async (scoreDoc) => {
          const quizId = scoreDoc.data().quizId;
          const score = scoreDoc.data().score;

          const quizRef = doc(db, "quizzes", quizId);
          const quizSnapshot = await getDoc(quizRef);

          if (quizSnapshot.exists()) {
            const quizData = quizSnapshot.data();
            return {
              id: scoreDoc.id,
              quizId: quizId,
              score: score,
              title: quizData.quizTitle,
            };
          } else {
            console.error("Quiz not found for score:", scoreDoc.id);
            return null;
          }
        })
      );

      console.log("Fetched Scores Data:", fetchedScoresData);

      setScoresData(fetchedScoresData.filter(Boolean));
      setLoading(false);
    } catch (error) {
      console.error("Error fetching scores data:", error);
      setLoading(false);
    } finally {
      // Set refreshing state to false after fetch completes
      setRefreshing(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchScoresData();
    setRefreshing(false);
  };

  return (
    <Screen style={styles.container}>
      <Text style={styles.titles}>Scores</Text>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#1e3a8a"]}
            tintColor="#000"
          />
        }
      >
        {loading ? (
          <ActivityIndicator size="large" color="#fff" />
        ) : (
          scoresData.map((score) => (
            <View key={score.id} style={styles.score}>
              <Text style={styles.title}>Quiz Title: {score.title}</Text>
              <Text style={styles.scores}>Score: {score.score}</Text>
            </View>
          ))
        )}
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: colors.bg,
    gap: 20,
    paddingBottom: 25,
  },
  score: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#94a3b8",
    borderRadius: 5,
    marginBottom: 20,
  },
  titles: {
    textAlign: "center",
    fontSize: 24,
    color: "#fff",
  },
  head: {
    color: "#fff",
    fontSize: 20,
  },
  title: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 12,
  },
  scores: {
    color: "#f59e0b",
  },
});

export default Scores;
