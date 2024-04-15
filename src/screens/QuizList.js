import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import {
  query, // Import query function
  orderBy, // Import orderBy function
} from "firebase/firestore";

import Screen from "../components/Screen";
import colors from "../config/colors";
import { RefreshControl } from "react-native";

import { useNavigation } from "@react-navigation/native";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import AppText from "../components/AppText";

export default function QuizList() {
  const navigation = useNavigation();
  const [quizData, setQuizData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchQuizData();
  }, []);
const fetchQuizData = async () => {
  try {
    setRefreshing(true);

    // Query quizzes collection ordered by createdAt field in descending order
    const querySnapshot = await getDocs(
      query(collection(db, "quizzes"), orderBy("createdAt", "desc"))
    );

    const fetchedQuizData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      title: doc.data().quizTitle,
    }));

    setQuizData(fetchedQuizData);

    const unsubscribe = onSnapshot(collection(db, "quizzes"), (snapshot) => {
      const updatedQuizData = snapshot.docs.map((doc) => ({
        id: doc.id,
        title: doc.data().quizTitle,
      }));

      setQuizData(updatedQuizData);
    });

    return unsubscribe;
  } catch (error) {
    console.error("Error fetching quiz data:", error);
  } finally {
    setLoading(false);
    setRefreshing(false);
  }
};

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchQuizData();
    setRefreshing(false);
  };

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
      <View style={styles.loader}>
        <Text style={styles.loading}>Loading Data from server</Text>
        <ActivityIndicator
          size="large"
          color="#f1f5f9"
          style={styles.loading}
        />
      </View>
    );
  }

  return (
    <Screen style={styles.container}>
      <AppText style={styles.list}>List Of Quizzes</AppText>
      <FlatList
        data={quizData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.flatListContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#1e40af"]}
            tintColor="#fff"
          />
        }
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
    justifyContent: "center",
    color: "#fff",
  },
  list: {
    color: "#fff",
    textAlign:"center"
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
    color: "#fff",
    fontSize: 15,
    textAlign: "center",
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
