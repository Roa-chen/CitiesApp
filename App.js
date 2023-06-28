import React, { Component, useState } from 'react';

import Tabs from "./src/index";
import { NavigationContainer } from '@react-navigation/native';

import { Provider } from 'react-redux';
import store from './src/reducers/index'

import auth from '@react-native-firebase/auth';
import Authentification from './src/authentification/Authentification';
class App extends Component {

  state = {
    user: null,
    initializing: true,
  }

  onAuthStateChange = (user) => {
    this.setState({user, initializing: false})
    console.log(user)
  }

  componentDidMount() {
    const subscriber = auth().onAuthStateChanged(this.onAuthStateChange);
    return subscriber
  }

  render() {

    if (this.state.initializing) return null
    
    if (!this.state.user) return <Authentification />

    return (
      <Provider store={store}>
        <NavigationContainer>
          <Tabs />
        </NavigationContainer>
      </Provider>
    )
  }
}

export default App