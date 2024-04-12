// import React from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   FlatList,
//   TouchableOpacity,
// } from "react-native";
// import colors from "../config/colors";
// import { useNavigation } from "@react-navigation/native";

// const AdminQuizScreen = ({ route }) => {
//   const { title, questions } = route.params;
//   const navigation = useNavigation();
//   console.log(questions);
//   const renderQuizTitle = ({ item }) => (
//     <TouchableOpacity
//       style={styles.item}
//       onPress={() =>
//         navigation.navigate("AdminQuizQuestions", { questions: item.questions })
//       }
//     >
//       <Text style={styles.title}>{item.title}</Text>
//     </TouchableOpacity>
//   );

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>{title}</Text>
//       <FlatList
//         data={questions}
//         renderItem={renderQuizTitle}
//         keyExtractor={(item) => item.id.toString()}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: colors.bg,
//     padding: 20,
//   },
//   screenTitle: {
//     fontSize: 24,
//     fontWeight: "bold",
//     color: colors.white,
//     marginBottom: 20,
//   },
//   title: {
//     fontSize: 20,
//     color: colors.white,
//     marginBottom: 10,
//   },
//   item: {
//     backgroundColor: "rgba(255, 255, 255, .1)",
//     padding: 20,
//     marginVertical: 8,
//     borderRadius: 5,
//   },
// });

// export default AdminQuizScreen;
import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import colors from "../config/colors";

const AdminQuizScreen = ({ route }) => {
  const { title, questions } = route.params;
  console.log(questions);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>

      <FlatList
        data={questions}
        renderItem={({ item }) => (
          <View style={styles.questionContainer}>
            <Text style={styles.questionText}>{item.text}</Text>
            {/* <FlatList
              data={item.options}
              renderItem={({ item }) => (
                <Text key={item} style={styles.option}>
                  {item}
                </Text>
              )}
              keyExtractor={(item) => item} // Use the option content as the key
            /> */}
            {item.options.map((option, index) => (
              <Text key={index} style={styles.option}>
                {option}
              </Text>
            ))}
          </View>
        )}
        keyExtractor={(item) => item.id} // Change this line
      />
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
    fontSize: 20,
    fontWeight: "bold",
    color: colors.white,
    marginBottom: 10,
    alignItems:"center"
  },
  questionContainer: {
    backgroundColor: "rgba(255, 255, 255, .1)",
    padding: 20,
    marginVertical: 8,
    borderRadius: 5,
  },
  questionText: {
    fontSize: 18,
    color: colors.white,
    marginBottom: 10,
  },
  option: {
    fontSize: 15,
    color: colors.white,
  },
});

export default AdminQuizScreen;
