import React from "react";
import {  StyleSheet, Text, } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Screen from "../components/Screen";

import * as Yup from "yup";
import { AppForm, AppFormField, SubmitButton } from "../components/forms";

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label("Name"),
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
});

const Login = () => {
  const navigation = useNavigation();
  const handlePressLogIn = () => {
    navigation.navigate("Signup");
  };
  return (
    <Screen style={styles.container}>
      <Text style={styles.title}>Sign Up </Text>
      <AppForm
        initialValues={{ name: "", email: "", password: "" }}
        onSubmit={(values) => console.log(values)}
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
        <SubmitButton
          title="Sign Up"
          style={{ marginTop: 45 }}
          navigateWhere={handlePressLogIn}
        />
      </AppForm>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    backgroundColor: "#062141",
    // alignItems: "center",
    // width: "100%",
    padding: 20,
  },
  title: {
    color: "#fff",
    fontSize: 40,
    paddingLeft: 100,
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
});

export default Login;
