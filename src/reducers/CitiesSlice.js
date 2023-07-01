import React from 'react';
import { createSlice } from "@reduxjs/toolkit"
import AsyncStorage from "@react-native-async-storage/async-storage";

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
      
      console.log("locationIndex:", locationIndex)
      state.cities[index].locations.splice(locationIndex, 1)
    },
    setCitiesToState: (state, action) => {
      state.cities.splice(0, 0, ...action.payload)
    }
  }
})

export const addCity = payload => (dispatch, state) => {
  dispatch(addCityToState(payload))
  AsyncStorage.setItem(key, JSON.stringify(state().cities))
    .catch(e => console.log('error : ', e))
}
export const delCity = payload => (dispatch, state) => {
  dispatch(delCityToState(payload))
  AsyncStorage.setItem(key, JSON.stringify(state().cities))
    .catch(e => console.log('error : ', e))
}
export const addLocation = payload => (dispatch, state) => {
  dispatch(addLocationToState(payload))
  AsyncStorage.setItem(key, JSON.stringify(state().cities))
    .catch(e => console.log('error : ', e))
}
export const delLocation = payload => (dispatch, state) => {
  console.log(payload)
  dispatch(delLocationToState(payload))
  AsyncStorage.setItem(key, JSON.stringify(state().cities))
  .catch(e => console.log('error : ', e))
}
export const setCities = () => async dispatch => {
  let cities = await AsyncStorage.getItem(key)
  cities = JSON.parse(cities)
  dispatch(setCitiesToState(cities.cities))
}

const {addCityToState, delCityToState, addLocationToState, delLocationToState, setCitiesToState} = citiesSlice.actions
export default citiesSlice.reducer;