import React, { Component } from 'react';
import {View, Text} from 'react-native';

import Tabs from "./src/index";
import Authentification from './src/authentification/Authentification';
import WaitEmail from './src/authentification/SignIn/WaitEmail';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { Provider } from 'react-redux';
import store from './src/reducers/index'

import auth from '@react-native-firebase/auth';
import CustomButton from './src/components/CustomButton';
class App extends Component {

  state = {
    user: null,
    initializing: true,
  }

  onAuthStateChange = (user) => {
    this.setState({user, initializing: false})
    if (!user) this.navigationRef.current.navigate('Authentification')
    console.log('found user: ', user);
  }

  subscriber = null;

  componentDidMount() {
    this.subscriber = auth().onAuthStateChanged(this.onAuthStateChange);
  }

  componentWillUnmount() {
    this.subscriber();
  }

  navigationRef = React.createRef()
  StackRoot = createStackNavigator();

  render() {

    if (this.state.initializing) return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{fontWeight: 'bold', fontSize: 50}}>Loading</Text>
        </View>
      )

    return (
      <Provider store={store}>
        <NavigationContainer ref={this.navigationRef}>
          <this.StackRoot.Navigator initialRouteName={(this.state.user && this.state.user.emailVerified) ? 'App' : 'Authentification'} screenOptions={{headerShown: false}}>
            <this.StackRoot.Screen name="App" component={Tabs} />
            <this.StackRoot.Screen name="Authentification" component={Authentification} />
            <this.StackRoot.Screen name="WaitEmail" component={WaitEmail} />
          </this.StackRoot.Navigator>
        </NavigationContainer>
      </Provider>
    )
  }
}

export default App