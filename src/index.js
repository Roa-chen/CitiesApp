import React from 'react';

import {View, TouchableOpacity} from 'react-native';

import Cities from './Cities/Cities';
import City from './Cities/City';
import AddCity from './AddCity/AddCity';

import { colors } from './theme';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';

import Icon from 'react-native-vector-icons/AntDesign';

const options = {
  navigationOptions: {
    headerStyle: {
      backgroundColor: colors.primary,
    },
    headerTintColor: '#fff',
  },
};

const Stack = createStackNavigator()

const CitiesNav = (props) => {
  return (
    <Stack.Navigator screenOptions={{
      headerStyle: {backgroundColor: colors.primary}, 
      headerTitleStyle: {
        color: 'white',
        fontWeight: '400',
        fontSize: 20
      },
      gestureEnabled: true,
      gestureDirection: 'vertical',
      cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS,
    }}>
      <Stack.Screen 
        name="Cities" 
        component={Cities} 
        initialParams={props.route.params} 
        options={{title: 'Cities'}}
      />
      <Stack.Screen 
        name="City" 
        component={City} 
        initialParams={props.route.params} />
    </Stack.Navigator>
  )
}

const Tab = createBottomTabNavigator();

const TabButton = (props) => {

  const {name, onPress, accessibilityState} = props;
  const {selected} = accessibilityState;

  return (
    <TouchableOpacity onPress={onPress} style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Icon name={name} size={30} color={selected ? colors.primary : '#666'} />
    </TouchableOpacity>
  )
}

const Tabs = props => {
  return (
    <Tab.Navigator 
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 60,
          borderRadius: 20,
          margin: 10,
          position: 'absolute'
        },
      }} >
      <Tab.Screen name="Cities List" component={CitiesNav} options={{
          tabBarButton: (props) => <TabButton {...props} name="home" /> }} />
      <Tab.Screen name="AddCity" component={AddCity} options={{
          tabBarButton: (props) => <TabButton {...props} name="plus" /> }} />
    </Tab.Navigator>
  )
}

export default Tabs;


//home-search
