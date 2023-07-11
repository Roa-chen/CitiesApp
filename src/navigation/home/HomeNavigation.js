import React, { useEffect, useRef } from 'react';

import { TouchableOpacity, Animated } from 'react-native';

import Cities from '../../screens/cities/Cities';
import City from '../../screens/cities/City';
import AddCity from '../../screens/cities/AddCity';

import { colors } from '../../theme';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';

import Icon from 'react-native-vector-icons/AntDesign';
import ControlCenter from '../../screens/parameters/ControlCenter';

const Stack = createStackNavigator()

const CitiesNav = (props) => {
  return (
    <Stack.Navigator screenOptions={{
      headerStyle: { backgroundColor: colors.primary },
      headerTintColor: 'white',
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
        options={{ title: 'Cities' }}
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

  const { name, onPress, accessibilityState } = props;
  const { selected } = accessibilityState;
  const scaleValue = useRef(new Animated.Value(selected ? 1 : 0))

  useEffect(() => {
    Animated.timing(scaleValue.current, {
      toValue: selected ? 1 : 0,
      duration: 200,
      useNativeDriver: true
    }).start()
  }, [selected])

  return (
    <TouchableOpacity onPress={onPress} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
      <Icon name={name} style={{ paddingBottom: 5 }} size={30} color={selected ? colors.primary : '#666'} />
      <Animated.View style={{ alignSelf: 'center', width: '10%', height: 6, backgroundColor: colors.primary, borderRadius: 3, backgroundColor: selected ? colors.primary : '#666', transform: [{ scale: scaleValue.current }] }} />
    </TouchableOpacity>
  )
}

export default HomeNavigation = props => {
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
        tabBarButton: (props) => <TabButton {...props} name="home" />
      }} />
      <Tab.Screen name="AddCity" component={AddCity} options={{
        tabBarButton: (props) => <TabButton {...props} name="plus" />
      }} />
      <Tab.Screen name="ControlCenter" component={ControlCenter} options={{
        tabBarButton: (props) => <TabButton {...props} name="setting" />
      }} />
    </Tab.Navigator>
  )
}
