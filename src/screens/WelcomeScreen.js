import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import WelcomeBtn from "../components/button/welcome";
import { useNavigation } from "@react-navigation/native";

const WelcomeScreen = () => {
  const navigation = useNavigation();

  const handleSignUpPress = () => {
    navigation.navigate("Signup"); 
  };
    const handleLogInPress = () => {
      navigation.navigate("Login");
    };
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/undraw_Quiz_re_aol4.png")}
        style={styles.image}
      />
      <WelcomeBtn
        title="Log In"
        onPress={handleLogInPress}
        style={{ backgroundColor: "#3730A3" }}
      />
      <WelcomeBtn
        title="Sign Up"
        onPress={handleSignUpPress}
        style={{ backgroundColor: "#1D4ED8" }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    width: "100%",
   
  },
  image: {
    width: 400, 
    height: 500, 
    marginBottom: 30,
  },
});

export default WelcomeScreen;
