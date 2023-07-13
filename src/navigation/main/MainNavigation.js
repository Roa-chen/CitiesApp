import React, { useEffect, useState, useRef } from "react";
import { View, Text, DevSettings } from "react-native";

import { NavigationContainer } from '@react-navigation/native';
import { CardStyleInterpolators, createStackNavigator } from "@react-navigation/stack";

import auth from '@react-native-firebase/auth';

import { navigateToAuth, isInAuth } from "..";

import HomeNavigation from "../home/HomeNavigation";
import AuthNavigation from "../auth/AuthNavigation";

export let navRef;

export default MainNavigator = () => {

  navRef = useRef(null);

  const [initialize, setInitialize] = useState(true);
  const [user, setUser] = useState(auth().currentUser);

  onAuthStateChange = (user) => {
    setInitialize(false);
    setUser(user);
    if (!initialize && !isInAuth() && !user) navigateToAuth();
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(this.onAuthStateChange);

    DevSettings.addMenuItem('Display User', () => {
      console.log(auth().currentUser.toJSON())
    })

    // this.props.setDarkMode(Appearance.getColorScheme() === 'dark')
    // Appearance.addChangeListener((theme) => {
      // this.props.setDarkMode(theme.colorScheme === 'dark')
      // this.props.setDarkMode(false)
    // })

    return () => {
      subscriber();
    };
  }, []);
  
  const StackRoot = createStackNavigator();

  if (initialize) {
    return(
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontWeight: 'bold', fontSize: 50 }}>Loading</Text>
      </View>
    )
  }

  return (
    <NavigationContainer ref={navRef}>
      <StackRoot.Navigator initialRouteName={(user && user.emailVerified) ? 'App' : 'Authentification'} screenOptions={{
        headerShown: false,
        // cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
      }}>
        <StackRoot.Screen name="App" component={HomeNavigation} options={{cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS}} />
        <StackRoot.Screen name="Authentification" component={AuthNavigation} options={(navigation) => {
          if (navigation.route.params?.fromApp) return {cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS}
        }}/>
      </StackRoot.Navigator>
    </NavigationContainer>
  )
}
