import {StyleSheet, View, TouchableOpacity, Text} from 'react-native'
import { colors } from '../theme'

export default CustomButton = ({title, onPress, style={}}) => {
  return (
    <View style={[styles.buttonContainer, style]}>
      <TouchableOpacity onPress={onPress} style={styles.button}>
        <Text style={styles.text} >{title}</Text>
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
    width: "80%",
    height: 50,
    marginTop: 20,
    borderRadius: 10,
  },
  button: {
    width: "100%",
    height: "100%",
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold'
  }
})