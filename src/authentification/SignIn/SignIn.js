import React, { useState } from "react";
import { View, Alert, StyleSheet } from "react-native"

import auth from '@react-native-firebase/auth';

import CustomTextInput from "../../components/CustomTextInput";
import CustomButton from "../../components/CustomButton";

export default LogIn = ({navigation}) => {

  const [emailText, setEmailText] = useState("");
  const [passwordText, setPasswordText] = useState("");

  const singIn = () => {
    // navigation.navigate("WaitEmail", 'test')

    auth().createUserWithEmailAndPassword(emailText, passwordText)
      .then(user => {
        console.log(user)
        if (user && user.emailVerified) {
          console.log("okk");
          navigation.navigate("App")
        } else {
          console.log("needEmail");
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

  return (
    <View style={styles.container}>
      <CustomTextInput text="email..." onChange={setEmailText} value={emailText} inputMode="email" />
      <CustomTextInput text="password..." onChange={setPasswordText} value={passwordText} inputMode="text" />
      <CustomButton title="Sign In" onPress={singIn} />
      <CustomButton title="test" onPress={() => navigation.navigate("WaitEmail")} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  }
})
