import { View, Text,StyleSheet } from 'react-native'
import React from 'react'
import Screen from '../components/Screen'
import AppText from '../components/AppText'
import {MaterialCommunityIcons} from '@expo/vector-icons'
import WelcomeBtn from '../components/button/welcome'
import colors from '../config/colors'
import { useUser } from "../context/UserContext";

export default function Profile() {
    const { setUser } = useUser();
    // Function to handle logout
    const handleLogout = () => {
      setUser(null); // Clear the user context
      // Navigate to the login or welcome screen after logout
      // You can use navigation functions here if needed
    };
    return (
      <Screen style={styles.container}>
        <AppText style={styles.wordColors}>User Profile</AppText>
        <MaterialCommunityIcons name="account" size={50} color={colors.white} />
        <View>
          <View style={styles.wordWrapper}>
            <AppText style={styles.wordColors}>Email:</AppText>
            <AppText style={styles.wordColors}>
              tuyishimehope01@gmail.com
            </AppText>
          </View>
          <View style={styles.wordWrapper}>
            <AppText style={styles.wordColors}>Role:</AppText>
            <AppText style={styles.wordColors}>Admin</AppText>
          </View>
          <WelcomeBtn
            title="Log Out"
            style={styles.btn}
            onPress={() => handleLogout()}
          />
        </View>
      </Screen>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems:"center",
        backgroundColor: colors.bg
    },
    wordWrapper: {
        // flex: 1,
        marginTop: 15,
        flexDirection: "row",
        gap:5
    },
    btn: {
        marginTop: 50
    },
    wordColors: {
        color: colors.white
    }
})