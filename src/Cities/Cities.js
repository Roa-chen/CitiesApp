import React, { useContext } from "react";
import {
  View,
  Text,
  TouchableWithoutFeedback,
  TouchableHighlight,
  ScrollView,
  StyleSheet,
  Image
} from "react-native";

import CenterMessage from "../components/CenterMessage";
import { colors } from "../theme";
import Context from "../../Context";

import Icon from 'react-native-vector-icons/AntDesign'

export default class Cities extends React.Component {

  static navigationOptions =
    {
      title: 'Cities',
      headerTitleStyle: {
        color: 'pink',
        fontWeight: '400',
        fontSize: 20
      }
    }

  static contextType = Context;

  navigate = (item) => {
    this.props.navigation.navigate('City', { city: item });
  }

  render() {
    const { cities } = this.context;

    return (
      <ScrollView contentContainerStyle={[!cities.length && { flex: 1 }]}>
        <View style={[!cities.length && { flex: 1, justifyContent: 'center', backgroundColor: 'white' }]} >
          {!cities.length && <CenterMessage message='No saved cities !' />}
          {
            cities.map((item, index) => (
              <View style={styles.cityContainer} key={index}>
                <TouchableWithoutFeedback onPress={() => (this.navigate(item))} >
                  <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', }}>
                    <View style={{width: '80%'}}>
                      <Text numberOfLines={1} style={styles.city}>{item.city}</Text>
                      <Text style={styles.country}>{item.country}</Text>
                    </View>
                    <View style={{ alignSelf: 'center' }}>
                      <TouchableWithoutFeedback onPress={() => this.context.delCity(item)}>
                        <View style={{padding: 10}}>
                          <Image source={require("./cancel-button.png")} style={styles.image} />
                        </View>
                      </TouchableWithoutFeedback>
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              </View>
            ))
          }
        </View>
      </ScrollView>
    );
  }
}

styles = StyleSheet.create({
  cityContainer: {
    padding: 10,
    paddingRight: 20,
    borderBottomWidth: 2,
    borderBottomColor: colors.primary,
  },
  city: {
    fontSize: 20,
    color: 'black'
  },
  country: {
    color: "rgba(0, 0, 0, .5)",
    maxWidth: '90%',
  },
  image: {
    width: 20,
    height: 20,
  }
})