import React from "react";
import { View, Button, StyleSheet } from "react-native"


import { CardStyleInterpolators, createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from '@react-navigation/native';

import SelectAuth from "./SelectAuth";
import LogIn from "./LogIn";
import SignIn from "./SignIn";

export default Authentification = () => {

  const email = 'arsenechardon14@gmail.com'
  const password = 'password'

  const stack = createStackNavigator();

  return (
    <NavigationContainer>
      <stack.Navigator initialRouteName="SelectAuth" screenOptions={{
        gestureEnable: true,
        gestureDirection: "horizontal",
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}>
        <stack.Screen name="SelectAuth" component={SelectAuth} />
        <stack.Screen name="LogIn" component={LogIn} />
        <stack.Screen name="SignIn" component={SignIn} />
      </stack.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  button: {
    margin: 20,
  }
})
