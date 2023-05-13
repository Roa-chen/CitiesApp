import React from 'react';

import Cities from './Cities/Cities';
import City from './Cities/City';
import AddCity from './AddCity/AddCity';

import {colors} from './theme';
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const options = {
  navigationOptions: {
    headerStyle: {
      backgroundColor: colors.primary,
    },
    headerTintColor: '#fff',
  },
};

const Stack = createNativeStackNavigator()

const CitiesNav = (props) => {
  return (
    <Stack.Navigator screenOptions={{headerStyle: {backgroundColor: colors.primary}, headerTitleStyle: {
      color: 'white',
      fontWeight: '400',
      fontSize: 20
    }}}>
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

const Tabs = props => {
  return (
    <Tab.Navigator 
      screenOptions={{ tabBarIcon: () => null, headerShown: false}} >
      <Tab.Screen name="CitiesContainer" component={CitiesNav} />
      <Tab.Screen name="AddCity" component={AddCity} />
    </Tab.Navigator>
  )
}

export default Tabs;
