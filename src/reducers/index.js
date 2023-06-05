import combineReducer from 'redux';
import citiesReducer from './CitiesReducer';

const rootReducer = combineReducer({
  citiesReducer,
})

export default rootReducer;