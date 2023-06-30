import store from './reducers/index'

const colors = !store.getState().theme.darkMode ? {
  primary: '#1976D2',
  primaryTransparent: '#1976D299',
  textLight: '#777',
  textLightTranslucide: '#7778',
  textDark: '#555',
  textDarkTranslucide: '#5558',
  input: '#fff',
  background: '#004297',
  black: '#000',
  blackTranslucide: '#0008',
} : {
  primary: '#1976D2',
  primaryTransparent: '#1976D299',
  textLight: '#777',
  textLightTranslucide: '#7778',
  textDark: '#222',
  textDarkTranslucide: '#2228',
  input: '#777',
  background: '#004297',
  black: '#000',
  blackTranslucide: '#0008',
}

export {
  colors
}