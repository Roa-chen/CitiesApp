import React, { useState } from "react";
import { View, Text, Alert, StyleSheet } from "react-native"

import CustomButton from "../components/CustomButton"
import CustomTextInput from "../components/CustomTextInput";
import { colors } from "../theme";

import auth from '@react-native-firebase/auth';
import LinearGradient from "react-native-linear-gradient";

export default LogIn = ({navigation}) => {

  const [emailText, setEmailText] = useState("");
  const [passwordText, setPasswordText] = useState("");

  const singIn = () => {
    navigation.navigate("SignIn")
  }
  
  const logIn = () => {
    console.log('test')
    auth().signInWithEmailAndPassword(emailText, passwordText)
      .then(user => {
        if (user && user.emailVerified) {
          console.log("okk");
          navigation.navigate("App")
        } else {
          console.log("needEmail");
          navigation.navigate("WaitEmail")
        }
      })
      .catch(err => {
        console.log(err.code)
        if (err.code == "auth/network-request-failed") {
          Alert.alert('Error', "Please verify your network and try again.")
        } else {
          Alert.alert('Error', err.toString())
        }
      })
  }

  return (
    <View style={styles.container}>
      <CustomTextInput text="email..." onChange={setEmailText} value={emailText} inputMode="email" />
      <CustomTextInput text="password..." onChange={setPasswordText} value={passwordText} inputMode="text" />
      <CustomButton title="Log In" onPress={logIn} />
      <View style={styles.orContainer}>
        <LinearGradient colors={['#ffffff00', colors.text]} style={styles.gradient} start={{x: 0.5, y: 0.5}} end={{x: 1, y: .5}} />
        <Text style={styles.separator} >Or</Text>
        <LinearGradient colors={['#ffffff00', colors.text]} style={styles.gradient} start={{x: .5, y: .5}} end={{x: 0, y: 0.5}} />
      </View>
      <CustomButton title="Sign In" onPress={singIn} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  separator: {
    fontSize: 20,
    color: colors.text,
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
