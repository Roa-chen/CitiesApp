import React, { useEffect, useState, useRef } from "react";
import { View, Text, DevSettings } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { NavigationContainer } from '@react-navigation/native';
import { CardStyleInterpolators, createStackNavigator } from "@react-navigation/stack";

import auth from '@react-native-firebase/auth';

import { navigateToAuth, isInAuth } from "..";

import HomeNavigation from "../home/HomeNavigation";
import AuthNavigation from "../auth/AuthNavigation";
import Carousel from "../../screens/auth/Carousel";

export let navRef;

export default MainNavigator = () => {

  navRef = useRef(null);

  const [firstLaunch, setFirstLaunch] = useState(null);
  const [initialize, setInitialize] = useState(true);
  const [user, setUser] = useState(auth().currentUser);

  onAuthStateChange = (user) => {
    setInitialize(false);
    setUser(user);
    if (!initialize && !isInAuth() && !user) navigateToAuth();
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(this.onAuthStateChange);

    AsyncStorage.getItem('hasLaunched')
    .then(value => {
      if (value === null || JSON.parse(value) === false ) {
        AsyncStorage.setItem('hasLaunched', JSON.stringify(true))
        setFirstLaunch(true)
      } else {
        setFirstLaunch(false)
      }
    })


    DevSettings.addMenuItem('Display User', () => {
      console.log(auth().currentUser.toJSON())
    })

    DevSettings.addMenuItem('Reset Carousel', () => {
      AsyncStorage.setItem('hasLaunched', JSON.stringify(false))
      .then(() => console.log('reset done'))
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

  if (initialize || firstLaunch===null) {
    return(
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontWeight: 'bold', fontSize: 50 }}>Loading</Text>
      </View>
    )
  }
  const getInitialRouteName = () => {
    if (firstLaunch) {
      return 'Carousel'
    } else {
      return ((user && user.emailVerified) ? 'App' : 'Authentification')
    }
  }

  return (
    <NavigationContainer ref={navRef}>
      <StackRoot.Navigator initialRouteName={getInitialRouteName()} screenOptions={{
        headerShown: false,
      }}>
        <StackRoot.Screen name="App" component={HomeNavigation} options={{cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS}} />
        <StackRoot.Screen name="Authentification" component={AuthNavigation} options={(navigation) => {
          if (navigation.route.params?.fromApp) return {cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS}
          if (navigation.route.params?.fromCarousel) return {cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS}
        }}/>
        <StackRoot.Screen name="Carousel" component={Carousel} />
      </StackRoot.Navigator>
    </NavigationContainer>
  )
}
