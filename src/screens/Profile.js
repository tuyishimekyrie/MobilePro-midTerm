import { View, Text,StyleSheet } from 'react-native'
import React from 'react'
import Screen from '../components/Screen'
import AppText from '../components/AppText'
import {MaterialCommunityIcons} from '@expo/vector-icons'
import WelcomeBtn from '../components/button/welcome'
import colors from '../config/colors'

export default function Profile() {
  return (
    <Screen style={styles.container}>
        <AppText style={styles.wordColors}>User Profile</AppText>
        <MaterialCommunityIcons name="account" size={50} color={colors.white}/>
        <View>
            <View style={styles.wordWrapper}>
                <AppText style={styles.wordColors}>Email:</AppText>
                <AppText style={styles.wordColors}>tuyishimehope01@gmail.com</AppText>
            </View>
            <View style={styles.wordWrapper}>
                <AppText style={styles.wordColors}>Role:</AppText>
                <AppText style={styles.wordColors}>user</AppText>
            </View>
            <WelcomeBtn title="Log Out"  style={styles.btn}/>
        </View>
    </Screen>
  )
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