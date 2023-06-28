import React from "react";
import { View, Button, StyleSheet } from "react-native"

import auth from '@react-native-firebase/auth';

export default ControlCenter = () => {

  const logOut = () => {
    auth().signOut()
  }

  return (
    <View style={{flex: 1}}>
      <Button title="Log Out" onPress={logOut} style={styles.button} />
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    margin: 20,
  }
})