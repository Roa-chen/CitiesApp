import React, { useEffect, useState } from 'react';
import { StyleSheet, View, TextInput, TouchableWithoutFeedback } from 'react-native'
import { colors } from '../theme'
import Icon from 'react-native-vector-icons/AntDesign'
import { useSelector } from 'react-redux';


export default CustomButton = ({ text, onChange, style = {}, value, inputMode = 'text', secureTextEntry = false }) => {

  const [visible, setVisible] = useState(secureTextEntry);

  const darkMode = useSelector((state) => state.theme.darkMode)

  return (
    <View style={[styles.container, {backgroundColor: colors.input}, style]}>
      <TextInput
        secureTextEntry={secureTextEntry && visible}
        placeholder={text}
        placeholderTextColor={colors.textDark}
        onChangeText={onChange} value={value}
        style={[styles.TextInput, { width: secureTextEntry ? '80%' : '100%' }]}
        inputMode={inputMode}
      />
      {secureTextEntry &&
        <TouchableWithoutFeedback onPress={() => setVisible(!visible)} style={{ padding: 10 }} >
          <Icon name={visible ? "eye" : "eyeo"} size={30} color={colors.textLight} />
        </TouchableWithoutFeedback>}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 50,
    // marginTop: 20,
    backgroundColor: colors.input,
    borderRadius: 10,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  TextInput: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.textDark,
  },
})
