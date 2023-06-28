import React from "react";
import { View, Button, StyleSheet } from "react-native"

import auth from '@react-native-firebase/auth';

export default LogIn = () => {

  const email = 'arsenechardon14@gmail.com'
  const password = 'password'

  const singIn = () => {
    auth().createUserWithEmailAndPassword(email, password)
      .then(() => {
        console.log('User account created & signed in!');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }
    
        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }
    
        console.error(error);
      });
  }

  return (
    <View>
      <Button title="Sign In" onPress={singIn} style={styles.button} />
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    margin: 20,
  }
})
