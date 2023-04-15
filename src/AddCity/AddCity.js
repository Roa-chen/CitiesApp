import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import {v4 as uuidV4} from 'uuid';
import {colors} from '../theme';

export default class AddCity extends React.Component {
  state = {
    city: '',
    country: '',
  }

  onChangeText = (key, value) => {
    this.setState({[key]: value})
  }

  submit = () => {
    if (this.state.city === '' || this.state.country === '') {
      alert('Please complete form')
    }
    const city = {
      city: this.state.city,
      country: this.state.country,
      id: uuidV4(),
      locations: []
    }
    this.props.screenProps.addCity(city);
    this.setState({city: '', country: ''}, () => {
      this.props.navigation.navigate('Cities')
    })
  }

  render() {

    return (
      <View style={styles.container}>
        <Text style={styles.heading}>Cities</Text>
        <TextInput
          placeholder='City name'
          onChangeText={val => this.onChangeText('city', val)}
          style={styles.input}
          value={this.state.city}
        />
        <TextInput
          placeholder='Country name'
          onChangeText={val => this.onChangeText('country', val)}
          style={styles.input}
          value={this.state.city}
        />
        <TouchableOpacity onPress={this.submit}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Add City</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  button: {
    height: 50,
  }
});
