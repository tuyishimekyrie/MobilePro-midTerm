import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import * as MailComposer from "expo-mail-composer";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

export default function SendEmailScreen() {
  const [recipients, setRecipients] = useState([]);

  useEffect(() => {
    fetchRecipients();
  }, []);

  const fetchRecipients = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "users"));
      const fetchedRecipients = querySnapshot.docs.map(
        (doc) => doc.data().email
      );
      setRecipients(fetchedRecipients);
    } catch (error) {
      console.error("Error fetching recipients: ", error);
    }
  };

  const sendEmail = async () => {
    const emailSubject = "Your Subject";
    const emailBody = "Your Body";

    try {
      const { status } = await MailComposer.composeAsync({
        recipients: recipients,
        subject: emailSubject,
        body: emailBody,
      });

      if (status === "sent") {
        console.log("Email sent successfully!");
      }
    } catch (error) {
      console.error("Error sending email: ", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Send Email</Text>
      <Button title="Send Email" onPress={sendEmail} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  heading: {
    fontSize: 24,
    marginBottom: 20,
  },
});
