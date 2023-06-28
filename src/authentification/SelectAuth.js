import React from "react";
import { View, Text, Button, StyleSheet } from "react-native"

import auth from '@react-native-firebase/auth';
import { TouchableOpacity } from "react-native-gesture-handler";
import { colors } from "../theme";

export default LogIn = ({navigation}) => {

  const email = 'arsenechardon14@gmail.com'
  const password = 'password'

  const singIn = () => {
    navigation.navigate("SignIn")
  }
  
  const logIn = () => {
    console.log("LogIn")
    navigation.navigate("LogIn")
  }

  const CustomButton = ({title, onPress}) => {
    return (
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={onPress} style={styles.button}>
          <Text style={styles.text} >{title}</Text>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <CustomButton title="Sign In" onPress={singIn} />
      <CustomButton title="Log In" onPress={logIn} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  buttonContainer: {
    backgroundColor: colors.primary,
    width: "80%",
    height: 50,
    marginTop: 20,
    borderRadius: 10,
  },
  button: {
    width: "100%",
    height: "100%",
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold'
  }
})
