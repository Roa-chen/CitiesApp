import {StyleSheet, View, TextInput} from 'react-native'
import { colors } from '../theme'

export default CustomButton = ({text, onChange, style={}, value, inputMode='text'}) => {
  return (
    <View style={[styles.container, style]}>
      <TextInput placeholder={text} onChangeText={onChange} value={value} style={styles.TextInput} inputMode={inputMode} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: "80%",
    height: 50,
    marginTop: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 10, 
  },
  TextInput: {
    fontSize: 20,
    fontWeight: 'bold'
  }
})
