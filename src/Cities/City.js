import React, { useLayoutEffect, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
  TextInput,
  TouchableOpacity,
  Image,
  Share,
} from "react-native";

import CenterMessage from "../components/CenterMessage";
import { colors } from "../theme";
import Context from "../../Context";
import { Colors } from "react-native/Libraries/NewAppScreen";
import Icon from 'react-native-vector-icons/AntDesign';


export default class City extends React.Component {

  componentDidMount() {
    this.props.navigation.setOptions({ title: this.props.route.params.city.city });
  }

  state = {
    name: '',
    info: ''
  }

  onChangeText = (key, value) => {
    this.setState({ [key]: value })
  }

  addLocations = () => {
    if (this.state.name === '' || this.state.info === '') return

    const { city } = this.props.route.params;
    const location = {
      name: this.state.name,
      info: this.state.info
    }
    this.context.addLocation(location, city);
    this.setState({ name: '', info: '' })
  }

  share = async (location) => {
    const { city } = this.props.route.params;

    try {
      const response = await Share.share({message: `Hey, I have visited "${location.name}" in ${city.city}, ${city.country}.`, title: 'message title'})
    } catch(error) {
      console.log('error : ', error);
    }
  }

  static contextType = Context;

  ButtonIcon = ({name, onPress}) => (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={{padding: 10}}>
        <Icon name={name} size={30} color={colors.primary} /> 
      </View>
    </TouchableWithoutFeedback>
  )

  render() {
    const { city } = this.props.route.params;

    return (
      <View style={{ flex: 1 }}>
        <ScrollView style={{ marginBottom: 2 }} contentContainerStyle={[!city.locations.length && { flex: 1 }]}>
          <View style={[{ padding: 10 }, [!city.locations.length && { flex: 1, justifyContent: 'center' }]]} >
            {
              !city.locations.length && <CenterMessage message='No locations for this city' />
            }
            {
              city.locations.map((location, index) => (
                <View style={styles.locationContainer} key={index}>
                  <View>
                    <Text style={styles.locationName}>{location.name}</Text>
                    <Text style={styles.locationInfo}>{location.info}</Text>
                  </View>
                  <View style={{ alignSelf: 'center', flexDirection: 'row' }}>
                    <this.ButtonIcon name="sharealt" onPress={() => this.share(location)} />
                    <this.ButtonIcon name="delete" onPress={() => this.context.delLocation(location, city)} />
                  </View>
                </View>
              ))
            }
          </View>
        </ScrollView>
        <View style={styles.actionBarContainer}>
          <View style={styles.inputContainer}>
            <TextInput
              onChangeText={val => this.onChangeText('name', val)}
              placeholder="Location name"
              value={this.state.name}
              style={[styles.input, styles.input1]}
              placeholderTextColor={'white'} />
            <TextInput
              onChangeText={val => this.onChangeText('info', val)}
              placeholder="Location info"
              value={this.state.info}
              style={[styles.input, styles.input2]}
              placeholderTextColor={'white'} />
          </View>
          <TouchableOpacity onPress={this.addLocations} >
            <View style={styles.button}>
              <Text style={styles.buttonText}>Add Location</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  actionBarContainer: {
    padding: 10,
    bottom: 80,
    flexDirection: 'row',
    height: 100,
  },
  inputContainer: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: "space-between",
  },
  button: {
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginLeft: 4,
    width: 80,
    height: 80,
    borderTopEndRadius: 15,
    borderBottomEndRadius: 15,
  },
  input: {
    height: 38,
    padding: 7,
    borderRadius: 5,
    backgroundColor: colors.primaryTransparent,
    color: 'white',
  },
  input1: {
    borderTopLeftRadius: 15,
  },
  input2: {
    borderBottomLeftRadius: 15,
  },
  buttonText: {
    color: 'white'
  },
  locationContainer: {
    padding: 10,
    borderBottomColor: colors.primary,
    borderBottomWidth: 2,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  locationName: {
    fontSize: 20,
    color: 'black'
  },
  locationInfo: {
    color: 'rgba(0, 0, 0, .5)'
  },
  image: {
    width: 20,
    height: 20,
  }
})