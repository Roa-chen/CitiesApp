import {StyleSheet, View, TextInput, TouchableWithoutFeedback} from 'react-native'
import { colors } from '../theme'
import { useState } from 'react';
import Icon from 'react-native-vector-icons/AntDesign'


export default CustomButton = (props) => {
  const {text, onChange, style={}, value, inputMode='text', secureTextEntry=false} = props;

  const [visible, setVisible] = useState(secureTextEntry);
  
  return (
    <View style={[styles.container, style]}>
      <TextInput 
        secureTextEntry={secureTextEntry && visible} 
        placeholder={text} 
        placeholderTextColor={colors.text} 
        onChangeText={onChange} value={value} 
        style={styles.TextInput} 
        inputMode={inputMode}
      />
      {secureTextEntry && <TouchableWithoutFeedback onPress={() => setVisible(!visible)} >
        <Icon name={visible ? "eye" : "eyeo"} style={{paddingBottom: 5}} size={30} color={colors.text} />
      </TouchableWithoutFeedback>}
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  TextInput: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
  },
})
