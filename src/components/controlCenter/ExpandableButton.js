import React, { useRef, useState, useEffect } from "react";
import { View, Animated, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import CustomButton from "../general/CustomButton";
import CustomTextInput from "../general/CustomTextInput";

import { colors } from "../../theme";
import { DefaultTheme, DarkTheme } from '@react-navigation/native'
import { useSelector } from "react-redux";



export default ExpandableButton = ({style, headerName, expanded=null, setExpanded, buttonText, buttonOnPress, buttonStyle, firstInputPlaceholder, firstInputMode="text", firstInputValue, firstInputOnChange, firstInputSecureTextEntry, secondInputPlaceholder, secondInputMode="text",secondtInputValue, secondInputOnChange, secondInputSecureTextEntry, loading }) => {

  const secondInput = (secondInputOnChange || secondInputPlaceholder || secondInputSecureTextEntry || secondtInputValue)

  const darkMode = useSelector((state) => state.theme.darkMode)
  const ButtonWidth = Dimensions.get("screen").width * 80 / 100

  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (expanded??isExpanded) {
      open();
    } else {
      close()
    }
  }, [expanded??isExpanded]);

  const paddingValue = useRef(new Animated.Value(10)).current;
  const elevationValue = paddingValue.interpolate({
    inputRange: [10, secondInput ? 150 : 80],
    outputRange: [0, 10],
  })
  const firstInputPosition = paddingValue.interpolate({
    inputRange: [10, secondInput ? 150 : 80],
    outputRange: [10, 80]
  })
  const secondInputPosition = paddingValue.interpolate({
    inputRange: [10, secondInput ? 150 : 80],
    outputRange: [10, 150]
  })

  const open = () => {
    Animated.timing(paddingValue, { toValue: secondInput ? 150 : 80, duration: 100, useNativeDriver: false }).start()
  }
  
  const close = () => {
    Animated.timing(paddingValue, { toValue: 10, duration: 100, useNativeDriver: false }).start()
  }

  return (
    <Animated.View style={[styles.detailContainer, { paddingBottom: paddingValue, elevation: elevationValue, backgroundColor: (darkMode ? DarkTheme : DefaultTheme).colors.background }, style]}>
      <CustomButton title={headerName} onPress={() => {if (expanded !== null) {setExpanded(expanded => !expanded)} else {setIsExpanded(expanded => !expanded)}}} style={[{ width: ButtonWidth, zIndex: 2 }, buttonStyle]} isLoading={(!secondInput) ? loading : false} />
      <Animated.View style={{ width: ButtonWidth, position: 'absolute', top: firstInputPosition, flexDirection: "row", justifyContent: 'space-between' }}>
        <CustomTextInput text={firstInputPlaceholder} style={{ width: '70%' }} inputMode={firstInputMode} value={firstInputValue} onChange={firstInputOnChange} secureTextEntry={firstInputSecureTextEntry} />
        <CustomButton title={buttonText} style={{ width: '25%' }} onPress={buttonOnPress} />
      </Animated.View>
      {secondInputOnChange && (
        <Animated.View style={{ width: ButtonWidth, position: 'absolute', top: secondInputPosition, flexDirection: "row", justifyContent: 'space-between' }}>
          <CustomTextInput text={secondInputPlaceholder} secureTextEntry={secondInputSecureTextEntry} style={{ width: '70%' }} inputMode={secondInputMode} value={secondtInputValue} onChange={secondInputOnChange} />
          <View style={{ width: '25%', justifyContent: 'center', alignItems: 'center' }}>
            {loading && <ActivityIndicator size={'large'} />}
          </View>
        </Animated.View>
      )}
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  detailContainer: {
    backgroundColor: DefaultTheme.colors.background,
    padding: 10,
    alignItems: 'center',
    elevation: 20,
    borderRadius: 10,
  },
})