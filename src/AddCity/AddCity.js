import React, { useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import 'react-native-get-random-values'
import { v4 as uuidV4 } from 'uuid';
import { colors } from '../theme';
import Context from "../../Context";
import LinearGradient from 'react-native-linear-gradient';

export default class AddCity extends React.Component {

  static contextType = Context;

  state = {
    city: '',
    country: '',
  }

  onChangeText = (key, value) => {
    this.setState({ [key]: value })
  }

  submit = props => {
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

    this.context.addCity(city);
    this.setState({ city: '', country: '' }, () => {
      this.props.navigation.navigate('Cities')
    })
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
        <LinearGradient colors={['#333', '#777']} style={styles.button} start={{x: 0, y: 0}} end={{x: 1, y: 1}}>
          <TouchableOpacity onPress={this.submit}>
            {/* <View style={styles.button}> */}
              <Text style={styles.buttonText}>Add City</Text>
            {/* </View> */}
          </TouchableOpacity>
        </LinearGradient>
      </View>
    )
  }
}

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
