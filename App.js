import React, { Component } from 'react';
import { View, Text, Appearance, DevSettings } from 'react-native';

import { Provider } from 'react-redux';
import store from './src/reducers/index'

import MainNavigation from './src/navigation/main/MainNavigation';

export default App = () => (
  <Provider store={store}>
    <MainNavigation />
  </Provider>
)


