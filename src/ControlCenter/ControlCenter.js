import React from "react";
import { View, Button, StyleSheet } from "react-native"

import auth from '@react-native-firebase/auth';
import CustomButton from "../components/CustomButton";

export default ControlCenter = () => {

  const logOut = () => {
    auth().signOut()
  }

  return (
    <View style={styles.container}>
      <CustomButton title="Log Out" onPress={logOut} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  }
})