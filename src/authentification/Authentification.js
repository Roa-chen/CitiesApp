import React from "react";
import { View, Button, StyleSheet } from "react-native"


import { CardStyleInterpolators, createStackNavigator } from "@react-navigation/stack";

import SelectAuth from "./SelectAuth";
import SignIn from "./SignIn/SignIn";

export default Authentification = () => {

  const stack = createStackNavigator();

  return (
    <stack.Navigator 
      initialRouteName="SelectAuth" 
      screenOptions={{
      gestureEnable: true,
      gestureDirection: "horizontal",
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    }}>
      <stack.Screen name="SelectAuth" component={SelectAuth} />
      <stack.Screen name="SignIn" component={SignIn} />
    </stack.Navigator>
  )
}

const styles = StyleSheet.create({
  button: {
    margin: 20,
  }
})
