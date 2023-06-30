import React, { useState } from "react";
import { View, Text, Alert, StyleSheet, ActivityIndicator } from "react-native"

import CustomButton from "../components/CustomButton"
import CustomTextInput from "../components/CustomTextInput";
import { colors } from "../theme";

import auth from '@react-native-firebase/auth';
import LinearGradient from "react-native-linear-gradient";

export default LogIn = ({ navigation }) => {

  const [emailText, setEmailText] = useState("");
  const [passwordText, setPasswordText] = useState("");

  const [isLoading, setLoading] = useState(false)

  const singIn = () => {
    navigation.navigate("SignIn")
  }

  const logIn = () => {
    if (emailText == '' || passwordText == '') {
      Alert.alert('Error', 'You must enter your informations before logging in.')
    } else {
      setLoading(true)
      auth().signInWithEmailAndPassword(emailText, passwordText)
        .then(info => {
          setLoading(false)
          if (info.user && info.user.emailVerified) {
            setEmailText('')
            setPasswordText('')
            navigation.navigate("App")
          } else {
            navigation.navigate("WaitEmail")
          }
        })
        .catch(err => {
          setLoading(false)
          console.log(err.code)
          if (err.code == "auth/network-request-failed") {
            Alert.alert('Error', "Please verify your network and try again.")
          } else {
            Alert.alert('Error', err.toString())
          }
        })
    }
  }

  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <View style={styles.container}>
        <CustomTextInput text="email..." onChange={setEmailText} value={emailText} inputMode="email" style={{ marginTop: 20 }} />
        <CustomTextInput text="password..." onChange={setPasswordText} value={passwordText} inputMode="none" secureTextEntry style={{ marginTop: 20 }} />
        <CustomButton title="Log In" onPress={logIn} style={{ marginTop: 20 }} isLoading={isLoading} />
        <View style={styles.orContainer}>
          <LinearGradient colors={['#ffffff00', colors.textLight]} style={styles.gradient} start={{ x: 0.5, y: 0.5 }} end={{ x: 1, y: .5 }} />
          <Text style={styles.separator} >Or</Text>
          <LinearGradient colors={['#ffffff00', colors.textLight]} style={styles.gradient} start={{ x: .5, y: .5 }} end={{ x: 0, y: 0.5 }} />
        </View>
        <CustomButton title="Sign In" onPress={singIn} style={{ marginTop: 20 }} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '80%',
  },
  separator: {
    fontSize: 20,
    color: colors.textLight,
    marginHorizontal: 10,
  },
  orContainer: {
    flexDirection: "row",
    alignItems: 'center',
    marginTop: 20,
  },
  gradient: {
    flex: 1,
    borderRadius: 100,
    paddingVertical: 2.4,
  }
})
