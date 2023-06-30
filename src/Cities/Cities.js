import React, { useContext, useEffect } from "react";
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

import { delCity, setCities } from "../reducers/CitiesSlice";
import { connect } from 'react-redux';
import store from "../reducers/index" 

class Cities extends React.Component {

  componentDidMount() {
    this.props.setCities()
  }

  static navigationOptions =
    {
      title: 'Cities',
      headerTitleStyle: {
        color: 'pink',
        fontWeight: '400',
        fontSize: 20
      }
    }

  navigate = (itemId) => {
    this.props.navigation.navigate('City', { cityId: itemId });
  }

  render() {

    const { cities } = this.props.cities;

    return (
      <ScrollView contentContainerStyle={[!cities.length && { flex: 1 }]}>
        <View style={[!cities.length && { flex: 1, justifyContent: 'center', backgroundColor: 'white' }]} >
          {!cities.length && <CenterMessage message='No saved cities !' />}
          {
            cities.map((item, index) => (
              <View style={styles.cityContainer} key={index}>
                <TouchableWithoutFeedback onPress={() => (this.navigate(item.id))} >
                  <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', }}>
                    <View style={{ width: '80%' }}>
                      <Text numberOfLines={1} style={[styles.city, {color: this.props.darkMode ? colors.textLight : colors.black}]}>{item.city}</Text>
                      <Text style={[styles.country, {color: this.props.darkMode ? colors.textLightTranslucide : colors.blackTranslucide}]}>{item.country}</Text>
                    </View>
                    <View style={{ alignSelf: 'center' }}>
                      <TouchableWithoutFeedback onPress={() => this.props.delCity(item)}>
                        <View style={{ padding: 10 }}>
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

const mapStateToProps = (state) => ({
  cities: state.cities,
  darkMode: state.theme.darkMode,
})

const mapDispatchToProps = (dispatch) => ({
  delCity: (city) => dispatch(delCity(city)),
  setCities: () => dispatch(setCities()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Cities);

styles = StyleSheet.create({
  cityContainer: {
    padding: 10,
    paddingRight: 20,
    borderBottomWidth: 2,
    borderBottomColor: colors.primary,
  },
  city: {
    fontSize: 20,
    color: store.getState().theme.darkMode ? colors.textLight : colors.black,
  },
  country: {
    color: store.getState().theme.darkMode ? colors.textLightTranslucide : colors.blackTranslucide,
    maxWidth: '90%',
  },
  image: {
    width: 20,
    height: 20,
  }
})