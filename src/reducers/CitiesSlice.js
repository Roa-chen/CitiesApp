import { createSlice } from "@reduxjs/toolkit"
import AsyncStorage from "@react-native-async-storage/async-storage";

const key = 'state';

export const citiesSlice = createSlice({
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
      const locationIndex = state.cities[index].locations.findIndex(item => item !== action.payload.location)
      state.cities[index].locations.splice(locationIndex, 1)
    },
    setCitiesToState: (state, action) => {
      action.payload.forEach(element => {
        state.cities.push(element)
      });
      console.log(state.cities)
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
  AsyncStorage.setItem(key, JSON.stringify(state().cities))
    .catch(e => console.log('error : ', e))
  dispatch(addLocationToState(payload))
}
export const delLocation = payload => (dispatch, state) => {
  AsyncStorage.setItem(key, JSON.stringify(state().cities))
  .catch(e => console.log('error : ', e))
  dispatch(delLocationToState(payload))
}
export const setCities = () => async dispatch => {
  let cities = await AsyncStorage.getItem(key)
  cities = JSON.parse(cities)
  dispatch(setCitiesToState(cities.cities))
}

const {addCityToState, delCityToState, addLocationToState, delLocationToState, setCitiesToState} = citiesSlice.actions
export default citiesSlice.reducer;