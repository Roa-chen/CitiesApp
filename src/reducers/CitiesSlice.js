import { createSlice } from "@reduxjs/toolkit"

export const citiesSlice = createSlice({
  name: 'cities',
  initialState: {
    cities: [{"city": "testtest", "country": "testtest", "id": "270f7428-6f13-4fc3-bfb7-82f4cbd0cd6d", "locations": []}]
  },
  reducers: {
    addCity: (state, action) => {
      state.cities.push(action.payload);
    },
    delCity: (state, action) => {
      const index = state.cities.findIndex(item => item.id === action.payload.id);
      state.cities.splice(index, 1)
    },
    addLocation: (state, action) => {
      const index = state.cities.findIndex(item => {
        return item.id === action.payload.city.id;
      })
      state.cities[index].locations.push(action.payload.location)
    },
    delLocation: (state, action) => {
      const index = state.cities.findIndex(item => item.id === action.payload.city.id)
      const locationIndex = state.cities[index].locations.findIndex(item => item !== action.payload.location)
      state.cities[index].locations.splice(locationIndex, 1)
    }
  }
})

export const {addCity, delCity, addLocation, delLocation} = citiesSlice.actions;
export default citiesSlice.reducer;