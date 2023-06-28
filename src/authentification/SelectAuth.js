import React, { useState } from "react";
import { View, Text, Alert, StyleSheet } from "react-native"

import CustomButton from "../components/CustomButton"
import CustomTextInput from "../components/CustomTextInput";

import auth from '@react-native-firebase/auth';

export default LogIn = ({navigation}) => {

  const [emailText, setEmailText] = useState("");
  const [passwordText, setPasswordText] = useState("");

  const singIn = () => {
    navigation.navigate("SignIn")
  }
  
  const logIn = () => {
    auth().signInWithEmailAndPassword(emailText, passwordText).catch(err => Alert.alert('Error', err.toString()))
  }

  return (
    <View style={styles.container}>
      <CustomTextInput text="email..." onChange={setEmailText} value={emailText} inputMode="email" />
      <CustomTextInput text="password..." onChange={setPasswordText} value={passwordText} inputMode="text" />
      <CustomButton title="Log In" onPress={logIn} />
      <Text style={styles.separator} >Or</Text>
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
    marginTop: 20,
    color: colors.text,
  }
})
