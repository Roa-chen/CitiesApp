import React from 'react';

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

const Tabs = props => {
  return (
    <Tab.Navigator 
      screenOptions={{headerShown: false}} >
      <Tab.Screen name="Cities List" component={CitiesNav} options={{
        tabBarIcon: (state) => <Icon name={"home"} size={30} color={state.focused ? colors.primary : '#666'} />}} />
      <Tab.Screen name="AddCity" component={AddCity} options={{
        tabBarIcon: (state) => <Icon name={"plus"} size={30} color={state.focused ? colors.primary : '#666'} />}} />
    </Tab.Navigator>
  )
}

export default Tabs;


//home-search
