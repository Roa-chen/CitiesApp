import React from "react";
import { View, Button, StyleSheet } from "react-native"

import auth from '@react-native-firebase/auth';

export default LogIn = () => {

  const email = 'arsenechardon14@gmail.com'
  const password = 'password'

  const logIn = () => {
    auth().signInWithEmailAndPassword(email, password)
  }

  return (
    <View>
      <Button title="Log In" onPress={logIn} style={styles.button} />
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    margin: 20,
  }
})
