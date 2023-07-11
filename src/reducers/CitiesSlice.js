import React from 'react';
import { createSlice } from "@reduxjs/toolkit"
import AsyncStorage from "@react-native-async-storage/async-storage";
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { addCityToFirestore, addLocationToFirestore, delCityToFirestore, delLocationToFirestore } from '../services/firestore';

const key = 'state';

const citiesSlice = createSlice({
  name: 'cities',
  initialState: {
    cities: []
  },
  reducers: {
    addCityToState: (state, action) => {
      state.cities.push(action.payload);
    },
    delCityToState: (state, action) => {
      const index = state.cities.findIndex(item => item.id === action.payload.id);
      state.cities.splice(index, 1)
    },
    addLocationToState: (state, action) => {
      const index = state.cities.findIndex(item => {
        return item.id === action.payload.city.id;
      })
      state.cities[index].locations.push(action.payload.location)
    },
    delLocationToState: (state, action) => {
      const index = state.cities.findIndex(item => item.id === action.payload.city.id)
      console.log(state.cities[index].locations, action.payload.location)
      const locationIndex = state.cities[index].locations.findIndex(item => (JSON.stringify(item) === JSON.stringify(action.payload.location)))
      state.cities[index].locations.splice(locationIndex, 1)
    },
    setCitiesToState: (state, action) => {
      state.cities.splice(0, 0, ...action.payload)
    },
    updateCitiesToState: (state, action) => {
      state.cities = action.payload;
    },

  }
})

export const addCity = payload => (dispatch) => {
  dispatch(addCityToState(payload))
  addCityToFirestore(payload)
}

export const delCity = payload => (dispatch) => {
  dispatch(delCityToState(payload))
  delCityToFirestore(payload)
}

export const addLocation = payload => (dispatch) => {
  dispatch(addLocationToState(payload))
  addLocationToFirestore(payload.city, payload.location)
}

export const delLocation = payload => (dispatch) => {
  dispatch(delLocationToState(payload))
  delLocationToFirestore(payload.city, payload.location)
}

export const updateCities = payload => (dispatch) => {
  dispatch(updateCitiesToState(payload))
}

const {addCityToState, delCityToState, addLocationToState, delLocationToState, updateCitiesToState} = citiesSlice.actions

export default citiesSlice.reducer;