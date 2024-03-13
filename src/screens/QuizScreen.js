import { View, Text, StyleSheet } from "react-native";
import React from "react";
import Screen from "../components/Screen";
import colors from "../config/colors";
import AppText from "../components/AppText";
import WelcomeBtn from "../components/button/welcome";
// import CheckBox from "@react-native-community/checkbox"
import CheckBox from "expo-checkbox"

export default function QuizScreen({ route }) {
  const {id,title}  = route.params;
  const [isSelected, setSelected] = React.useState(false);
  console.log(id);
  console.log(title)
  return (
    <Screen style={styles.container}>
      <View style={styles.containerWrapper}>
      <AppText style={styles.questionTitle}>Question 1/5</AppText>
      <AppText style={styles.questionHeader}>What is typescript?</AppText>
      <View style={styles.containerAnswer}>
      <CheckBox
            value={isSelected}
            onValueChange={() => setSelected(!isSelected)}
            // style={styles.checkbox}
          />
        <AppText style={styles.questionMultiple}>it is a cooking tool</AppText>
      </View>
      <WelcomeBtn title="Next"/>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.bg,
    flex: 1,
    alignItems: "start",
    padding: 5,
  },
  containerWrapper : {
    borderRadius: 5,
    padding: 8,
    backgroundColor: "rgba(255,255,255,.15)"

  },
  questionTitle: {
    color: colors.secondary,
    paddingBottom: 15
  },
  questionHeader: {
    color: colors.white,
    fontSize: 25,
    paddingBottom: 15
  },
  questionMultiple: {
    color: colors.white,
    fontSize:18,
    paddingBottom: 10
  },
  containerAnswer: {
    // flex: 1,
    flexDirection: "row",
    alignItems:"center",
    // justifyContent: "space-between",
    gap:15
  }
});
