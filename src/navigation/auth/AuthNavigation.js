import React from "react";

import { CardStyleInterpolators, createStackNavigator } from "@react-navigation/stack";

import SelectAuth from "../../screens/auth/SelectAuth";
import SignIn from "../../screens/auth/SignIn";
import WaitEmail from "../../screens/auth/WaitEmail";

export default AuthNavigation = ({navigation}) => {

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
      <stack.Screen name="WaitEmail" component={WaitEmail} />
    </stack.Navigator>
  )
}
