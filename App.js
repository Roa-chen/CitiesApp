import React, { Component, useState, createContext } from 'react';
import { StyleSheet, Text, View, Button, StatusBar } from 'react-native';

import Tabs from "./src/index";
import { NavigationContainer } from '@react-navigation/native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import Context from './Context';

const key = 'state';

export default class App extends Component {
  state = {
    cities: []
  }

  async componentDidMount() {
    try {
      let cities = await AsyncStorage.getItem(key);
      cities = JSON.parse(cities);
      // cities.push({ "city": "Paris", "country": "France", "id": "e95fe2e5-62f3-4d5c-a537-4ed7b913564f", "locations": [] });
      if (cities !== null) this.setState({cities});
      console.log('cities found : ', cities)
    } catch (error) {
      console.log('error from asyncStorage : ', error)
      // this.setState({cities : [{ "city": "Paris", "country": "France", "id": "e95fe2e5-62f3-4d5c-a537-4ed7b913564f", "locations": [] }]})
    }
  }

  addCity = (city) => {
    const cities = this.state.cities;
    cities.push(city);
    this.setState({ cities });
    AsyncStorage.setItem(key, JSON.stringify(cities))
      .catch(e => console.log('error : ', e))
  }

  delCity = (city) => {
    let cities = this.state.cities;
    cities = cities.filter((item) => (item.id !== city.id));
    this.setState({cities});
    AsyncStorage.setItem(key, JSON.stringify(cities))
      .catch(e => console.log('error : ', e))
  }

  addLocation = (location, city) => {
    const index = this.state.cities.findIndex(item => {
      return item.id === city.id;
    })
    const chosenCity = this.state.cities[index];
    chosenCity.locations.push(location);
    const cities = [
      ...this.state.cities.slice(0, index),
      chosenCity,
      ...this.state.cities.slice(index + 1)
    ]
    this.setState({ cities })
    AsyncStorage.setItem(key, JSON.stringify(cities))
      .catch(e => console.log('error : ', e))
  }

  delLocation = (location, city) => {
    const index = this.state.cities.findIndex(item => {
      return item.id === city.id;
    })
    const chosenCity = this.state.cities[index];
    chosenCity.locations = chosenCity.locations.filter(item => item !== location)
    const cities = [
      ...this.state.cities.slice(0, index),
      chosenCity,
      ...this.state.cities.slice(index + 1)
    ]
    this.setState({ cities })
    AsyncStorage.setItem(key, JSON.stringify(cities))
      .catch(e => console.log('error : ', e))
  }
  
  render() {
    return (
      <MyContext.Provider value={{
        cities: this.state.cities,
        addCity: this.addCity,
        addLocation: this.addLocation,
        delCity: this.delCity,
        delLocation: this.delLocation,
    }}>
        <NavigationContainer>
          <Tabs />
        </NavigationContainer>
      </MyContext.Provider>
    )
  }
}

