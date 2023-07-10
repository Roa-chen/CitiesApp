import React, { Component } from 'react';
import {View, Text, Appearance, DevSettings} from 'react-native';

import Tabs from "./src/index";
import Authentification from './src/authentification/Authentification';
import WaitEmail from './src/authentification/SignIn/WaitEmail';

import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { isOnAuth, navigateToAuth, navigationRef } from './src/navigation';

import { Provider, connect } from 'react-redux';
import store from './src/reducers/index'

import auth from '@react-native-firebase/auth';
import { setDarkMode } from './src/reducers/ThemeSlice';

class App extends Component {

  state = {
    user: null,
    initializing: true,
  }

  onAuthStateChange = (user) => {
    this.setState({user, initializing: false})
    if (!user && !isOnAuth()) navigateToAuth();
  }

  subscriber = null;

  componentDidMount() {
    this.subscriber = auth().onAuthStateChanged(this.onAuthStateChange);
    // this.props.setDarkMode(Appearance.getColorScheme() === 'dark')
    Appearance.addChangeListener((theme) => {
      // this.props.setDarkMode(theme.colorScheme === 'dark')
      this.props.setDarkMode(false)
    })
    DevSettings.addMenuItem('Display User', () => {
      console.log(auth().currentUser.toJSON())
    })

  }

  componentWillUnmount() {
    this.subscriber();
  }

  StackRoot = createStackNavigator();

  render() {

    if (this.state.initializing) return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{fontWeight: 'bold', fontSize: 50}}>Loading</Text>
        </View>
      )

    return (
      <NavigationContainer ref={navigationRef} theme={this.props.darkMode ? DarkTheme : DefaultTheme}>
        <this.StackRoot.Navigator initialRouteName={(this.state.user && this.state.user.emailVerified) ? 'App' : 'Authentification'} screenOptions={{headerShown: false}}>
          <this.StackRoot.Screen name="App" component={Tabs} />
          <this.StackRoot.Screen name="Authentification" component={Authentification} initialParams={{move: this.resetRootFunc}}/>
        </this.StackRoot.Navigator>
      </NavigationContainer>
    )
  }
}

const mapStateToProps = (state) => ({
  darkMode: state.theme.darkMode,
})

const mapDispatchToProps = (dispatch) => ({
  setDarkMode: (payload) => dispatch(setDarkMode(payload))
})

const StoreApp = connect(mapStateToProps, mapDispatchToProps)(App)

const ProviderApp = () => {
  return (
    <Provider store={store}>
      <StoreApp />
    </Provider>
  )
}

export default ProviderApp