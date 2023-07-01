import React, { useState } from "react";
import { View, Alert, StyleSheet } from "react-native"

import auth from '@react-native-firebase/auth';

import CustomTextInput from "../../components/CustomTextInput";
import CustomButton from "../../components/CustomButton";
import { navigateToApp, navigateToWaitEmail } from "../../navigation";
import { createUserCloud } from "../../cloud";

export default LogIn = ({navigation}) => {

  const [isLoading, setLoading] = useState(false)

  const [emailText, setEmailText] = useState("arsenechardon14@gmail.com");
  const [passwordText, setPasswordText] = useState("password");

  const singIn = () => {
    auth().signInWithEmailAndPassword(emailText, passwordText).then(() => {
      createUserCloud().then(() => {
        navigateToApp();
      });
    });

    return
    if (emailText == '' || passwordText == '') {
      Alert.alert('Error', 'You must enter your informations before logging in.')
    } else {
      setLoading(true)
      auth().createUserWithEmailAndPassword(emailText, passwordText)
        .then(user => {
          if (user && user.emailVerified) {
            setEmailText('')
            setPasswordText('')
            setLoading(false)
            navigateToApp()
          } else {
            setLoading(false)
            navigateToWaitEmail()
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
          setLoading(false)
        });
    }    
  }

  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <View style={styles.container}>
        <CustomTextInput text="email..." onChange={setEmailText} value={emailText} inputMode="email" style={{marginTop: 20}} />
        <CustomTextInput text="password..." onChange={setPasswordText} value={passwordText} inputMode="none" secureTextEntry style={{marginTop: 20}} />
        <CustomButton title="Sign In" onPress={singIn} style={{marginTop: 20}} isLoading={isLoading} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '80%',
  }
})
