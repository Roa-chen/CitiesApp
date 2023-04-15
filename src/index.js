import React from "react";
import Cities from "./Cities/Cities"
import City from "./Cities/City"
import AddCity from "./AddCity/AddCity"

import {colors} from "./theme";
import {createBottomTabNavigator} from "react-navigation-tabs";
import {createStackNavigator} from 'react-navigation-stack'

const options = {
  navigationOption: {
    headerStyle: {
      backgroundColor: colors.primary
    },
    headerTintColor: '#fff'
  }
}

// const CitiesNav = createStackNavigator({
//   Cities: {screen: Cities},
//   City: {screen: City}
// }, options)

const Tabs = createBottomTabNavigator({
  // Cities: {screen: CitiesNav},
  AddCity: {screen: AddCity}
})

export default Tabs;
