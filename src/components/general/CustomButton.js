import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text, ActivityIndicator } from 'react-native'
import { colors } from '../../theme'

export default CustomButton = ({ title, onPress, style = {}, isLoading = false }) => {
  return (
    <View style={[styles.buttonContainer, style]}>
      <TouchableOpacity onPress={onPress} style={styles.button}>
        <Text style={styles.text} >{title}</Text>
        {isLoading && <ActivityIndicator style={styles.loadingIndicator} size={'large'} />}
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  buttonContainer: {
    backgroundColor: colors.primary,
    width: "100%",
    height: 50,
    borderRadius: 10,
  },
  button: {
    width: "100%",
    height: "100%",
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  loadingIndicator: {
    position: 'absolute',
    alignSelf: 'center',
    right: '10%'
  },
  text: {
    fontSize: 20,
    color: colors.textDark,
    fontWeight: 'bold'
  }
})
