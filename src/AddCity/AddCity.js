import React, { useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  PermissionsAndroid,
  ToastAndroid,
  Platform,
} from 'react-native';

import 'react-native-get-random-values'
import { v4 as uuidV4 } from 'uuid';
import { colors } from '../theme';
import LinearGradient from 'react-native-linear-gradient';
import Geolocation from 'react-native-geolocation-service';

import { connect } from 'react-redux';
import { addCity } from '../reducers/CitiesSlice';

class AddCity extends React.Component {

  state = {
    city: 'testtest',
    country: 'testtest',
  }

  onChangeText = (key, value) => {
    this.setState({ [key]: value })
  }

  submit = () => {
    if (this.state.city === '' || this.state.country === '') {
      alert('Please complete form');
      return;
    }
    const city = {
      city: this.state.city,
      country: this.state.country,
      id: uuidV4(),
      locations: []
    }

    this.props.addCity(city);

    this.setState({ city: '', country: '' }, () => {
      this.props.navigation.navigate('Cities')
    })
  }

  getCoordinates = async () => {

    const isGranted = await PermissionsAndroid.check('android.permission.ACCESS_FINE_LOCATION');

    if (!isGranted) {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      )
      console.log('granted: ', granted);

      if (granted !== 'granted' && granted !== 'restricted') return
    }

    return new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(
        (position) => resolve(position.coords),
        (err) => reject(err),
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 10000 }
      );
    })

  }

  getCityFromCoordinates = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  getLocation = async () => {
    let coordinates;
    try {
      coordinates = await this.getCoordinates();
    } catch (error) {
      console.log('error: ', error);
      if (Platform.OS === "android") {
        ToastAndroid.show('Error while getting coordinates', ToastAndroid.SHORT)
      }
    }

    let data;
    try {
      data = await this.getCityFromCoordinates(coordinates.latitude, coordinates.longitude)
    } catch (error) {
      console.log('error: ', error);
      if (Platform.OS === "android") {
        ToastAndroid.show('Error while getting place from coordinates', ToastAndroid.SHORT)
      }
    }

    let cityName;
    const scale = ["hamlet", "village", "town", "city"]
    for (let index in scale) {
      if (data.address[scale[index]]) {
        cityName = data.address[scale[index]];
        break;
      }
    }

    const countryName = data.address.country;

    this.setState({ city: cityName, country: countryName })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>Cities</Text>
        <TextInput
          placeholder='City name'
          placeholderTextColor={'gray'}
          onChangeText={val => this.onChangeText('city', val)}
          style={styles.input}
          value={this.state.city}
        />
        <TextInput
          placeholder='Country name'
          placeholderTextColor={'gray'}
          onChangeText={val => this.onChangeText('country', val)}
          style={styles.input}
          value={this.state.country}
        />
        <TouchableOpacity onPress={this.submit}>
          <LinearGradient colors={['#333', '#777']} style={styles.button} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
            <Text style={styles.buttonText}>Add City</Text>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.getLocation}>
          <LinearGradient colors={['#333', '#777']} style={styles.button} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
            <Text style={styles.buttonText}>get from location</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    cities: state.cities
  }
}

const mapDispatchToProps = (dispatch) => ({
  addCity: (city) => dispatch(addCity(city)),
})

export default connect(mapStateToProps, mapDispatchToProps)(AddCity)

const styles = StyleSheet.create({
  button: {
    height: 50,
    backgroundColor: "#666",
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    borderRadius: 25,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  heading: {
    color: "white",
    fontSize: 40,
    marginBottom: 10,
    alignSelf: 'center'
  },
  container: {
    backgroundColor: colors.primary,
    flex: 1,
    justifyContent: "center"
  },
  input: {
    margin: 10,
    backgroundColor: 'white',
    paddingHorizontal: 8,
    height: 50,
    color: 'black',
    borderRadius: 25,
  }
});
