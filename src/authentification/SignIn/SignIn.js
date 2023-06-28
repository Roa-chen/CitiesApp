import React, { useState } from "react";
import { View, Alert, StyleSheet } from "react-native"

import auth from '@react-native-firebase/auth';

import CustomTextInput from "../../components/CustomTextInput";
import CustomButton from "../../components/CustomButton";

export default LogIn = ({navigation}) => {

  const [emailText, setEmailText] = useState("");
  const [passwordText, setPasswordText] = useState("");

  const singIn = () => {
    if (emailText == '' || passwordText == '') {
      Alert.alert('Error', 'You have to enter your informations before logging in.')
    } else {
      auth().createUserWithEmailAndPassword(emailText, passwordText)
        .then(user => {
          if (user && user.emailVerified) {
            setEmailText('')
            setPasswordText('')
            navigation.navigate("App")
          } else {
            navigation.navigate("WaitEmail")
          }
        })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            console.log('That email address is already in use!');
          }

          if (error.code === 'auth/invalid-email') {
            console.log('That email address is invalid!');
          }

          Alert.alert('Error', error.toString())
          console.error(error);
        });
    }    
  }

  return (
    <View style={styles.container}>
      <CustomTextInput text="email..." onChange={setEmailText} value={emailText} inputMode="email" />
      <CustomTextInput text="password..." onChange={setPasswordText} value={passwordText} inputMode="text" secureTextEntry />
      <CustomButton title="Sign In" onPress={singIn} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  }
})
