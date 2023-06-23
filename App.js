import React, { Component, useState, createContext } from 'react';
import { StyleSheet, Text, View, Button, StatusBar } from 'react-native';

import Tabs from "./src/index";
import { NavigationContainer } from '@react-navigation/native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import store from './src/reducers';
import { Provider, connect } from 'react-redux';
import { setCities } from './src/reducers/CitiesSlice';

const key = 'state';

class App extends Component { // TODO save cities in asynStorage


  async componentDidMount() {
    this.props.setCities()
  }

  render() {
    return (
      <NavigationContainer>
        <Tabs />
      </NavigationContainer>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  setCities: () => dispatch(setCities())
})

export default connect(null, mapDispatchToProps)(App)
