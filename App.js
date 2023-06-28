import React, { Component } from 'react';

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
  }

  subscriber = null;

  componentDidMount() {
    this.subscriber = auth().onAuthStateChanged(this.onAuthStateChange);
  }

  componentWillUnmount() {
    this.subscriber();
  }

  StackRoot = createStackNavigator();

  render() {

    if (this.state.initializing) return <CustomButton title={"test"} onPress={() => {}} />

    return (
      <Provider store={store}>
        <NavigationContainer>
          <this.StackRoot.Navigator initialRouteName='Authentification' screenOptions={{headerShown: false}}>
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