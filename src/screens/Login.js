import React, { useState } from "react";
import { StyleSheet, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Screen from "../components/Screen";
import { signInWithEmailAndPassword } from "@firebase/auth";
import { auth } from "../../firebase";
import {db}  from "../../firebase";
import * as Yup from "yup";
import { AppForm, AppFormField, SubmitButton } from "../components/forms";
import { useUser } from "../context/UserContext";
// import { getFirestore, collection, addDoc } from "@firebase/firestore";
import { getFirestore, doc, getDoc, collection } from "firebase/firestore";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
});

const Login = () => {
  const navigation = useNavigation();
  const [error, setError] = useState("");
  const { user,setUser } = useUser();
  const handlePressLogIn = async (values) => {
    try {
      const { user: authUser } = await signInWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      console.log(values);
      // console.log(user);
      setError("");

      // try {
      //   const userRef = db.collection("users").doc(user.uid);
      //   const userDoc = await getDoc(userRef);
      //   if (userDoc.exists()) {
      //     // Document exists, proceed with data retrieval
      //     console.log(userDoc.data());
      //   } else {
      //     console.log("User document does not exist");
      //   }
      // } catch (error) {
      //   console.error("Error fetching user document:", error);
      // }
      // setUser({ ...authUser, role: "user" });
      // Check if the email is "tuyishimehope0@gmail.com"
      if (values.email === "tuyishimehope0@gmail.com") {
        // If yes, set the user role to "admin"
        setUser({ ...authUser, role: "admin" });
      } else {
        // If not, set the user role to "user"
        setUser({ ...authUser, role: "user" });
      }
      // Redirect to Home screen or any other screen upon successful login
      // if (user) navigation.navigate("About");
      // Navigate based on user's role
      // if (user.role === "admin") {
      //   navigation.navigate("AdminHome");
      // } else if (user.role === "user") {
      //   navigation.navigate("Quiz");
      // } else {
      //   // Handle other roles or scenarios
      //   console.warn("Unknown user role:", user.role);
      // }
    } catch (error) {
      setError("Invalid email or password. Please try again.");
      console.error("Error logging in:", error.message);
    }
  };
  return (
    <Screen style={styles.container}>
      <Text style={styles.title}>Log In </Text>
      <AppForm
        initialValues={{ email: "", password: "" }}
        onSubmit={(values) => handlePressLogIn(values)}
        validationSchema={validationSchema}
      >
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
        {error ? <Text style={styles.error}>{error}</Text> : null}
        <SubmitButton title="Log In" style={{ marginTop: 45 }} />
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
    // alignItems: "center",
    flexDirection: "column",

    gap: 10,
  },
  error: {
    color: "red"
  }
});

export default Login;
