import React, { useState } from "react";
import { StyleSheet, Text ,Alert} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Screen from "../components/Screen";
import colors from "../config/colors";

import * as Yup from "yup";
import { AppForm, AppFormField, SubmitButton } from "../components/forms";

import { createUserWithEmailAndPassword } from "@firebase/auth";
import AppText from "../components/AppText";
import { collection, addDoc } from "@firebase/firestore";
import { auth, db } from "../../firebase";

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label("Name"),
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
});

const Signup = () => {
  const navigation = useNavigation();
  const [error, setError] = useState("");
  const handlePressLogIn = async (values) => {
    const { name, email, password } = values;
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Store user data in Firestore
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: name,
        email: email,
        password: password,
        Role:"user"
      });
      // You can add additional user data to firestore or other database here if needed
      console.log("User signed up successfully!", user);
      // Navigate to home screen after successful signup
       navigation.navigate("Login");
    } catch (error) {
       if (error.code === "auth/email-already-in-use") {
         // Show alert indicating email is already in use
         Alert.alert(
           "Email Already in Use",
           "The email provided is already registered. Would you like to log in instead?",
           [
             {
               text: "Cancel",
               style: "cancel",
             },
             {
               text: "Log In",
               onPress: () => navigation.navigate("Login"),
             },
           ]
         );
       } else {
         setError(error.message);
         setTimeout(() => {
           setError("");
         }, 5000);
         console.error("Error signing up:", error.message);
         // Handle other errors, e.g., display error message to the user
       }

      // setError(error.message);
      // setTimeout(() => {
      //   setError("");
      // }, 5000);
      // console.error("Error signing up:", error.message);
      // Handle error, e.g., display error message to the user
    }
    // console.log(values);
    // navigation.navigate("Login");
  };
  return (
    <Screen style={styles.container}>
      <Text style={styles.title}>Sign Up </Text>
      <AppForm
        initialValues={{ name: "", email: "", password: "" }}
        onSubmit={(values) => handlePressLogIn(values)}
        validationSchema={validationSchema}
      >
        <AppFormField
          icon="account"
          name="name"
          placeholder="Name"
          autoCapitalize="none"
          autoCorect={false}
        />
        <AppFormField
          name="email"
          icon="email"
          placeholder="Email"
          autoCapitalize="none"
          autoCorect={false}
          keyboardType="email-address"
        />
        {/* <ErrorMessage error={errors.email} visible={touched.email} /> */}
        {/* <AppText style={{ color: "red" }}>{errors.email}</AppText> */}
        <AppFormField
          icon="lock"
          name="password"
          placeholder="Password"
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry
        />
        {error && <AppText style={{ color: colors.light }}>{error}</AppText>}
        <SubmitButton title="Sign Up" style={{ marginTop: 45 }} />
      </AppForm>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#062141",
    padding: 20,
  },
  title: {
    color: "#fff",
    fontSize: 40,
    paddingLeft: 80,
    paddingBottom: 50,
  },
  inputs: {
    display: "flex",
    flexDirection: "column",
    gap: 5,
    paddingTop: 40,
  },
  label: {
    fontSize: 35,
    color: "#fff",
  },
  inputholder: {
    backgroundColor: "#EBF3FF",
    outline: "none",
    paddingHorizontal: 5,
    paddingVertical: 12,
    borderRadius: 5,
  },
  inputholderpass: {
    backgroundColor: "#EBF3FF",
    outline: "none",
    paddingHorizontal: 5,
    paddingVertical: 12,
    borderRadius: 5,
    marginBottom: 40,
  },
  welcomeBtnWrapper: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",

    gap: 10,
  },
});

export default Signup;
