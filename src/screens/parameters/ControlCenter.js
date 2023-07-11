import React, { useState, useRef, useEffect } from "react";
import { View, Dimensions, StyleSheet, Animated, Alert, Text, ScrollView, RefreshControl, ActivityIndicator } from "react-native"

import { useSelector } from "react-redux";

import auth, { firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import CustomButton from "../../components/general/CustomButton";
import CustomTextInput from "../../components/general/CustomTextInput";

import { DefaultTheme, DarkTheme } from "@react-navigation/native";
import { colors } from "../../theme";
import { navigateToAuth, navigateToWaitEmail } from "../../navigation";

const ButtonWidth = Dimensions.get("screen").width * 80 / 100

export default ControlCenter = ({ navigation }) => {

  const darkMode = useSelector((state) => state.theme.darkMode)



  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if (showEmail) {
        setShowEmail(false);
        emailPaddingValue.setValue(10);
      }
    })

    const unsubscribeUser = auth().onUserChanged((user) => {
      console.log('changed')
    })
    return () => {
      unsubscribe();
      unsubscribeUser();
    }
  }, [])

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    console.log(auth().currentUser)

    auth().currentUser.reload()
      .then(setRefreshing(false))
      .catch(err => {
        console.log(err)
        setRefreshing(false)
      })
  }

  const [showEmail, setShowEmail] = useState(false);
  const [emailText, setEmailText] = useState('');
  const [passwordText, setPasswordText] = useState('');
  const [emailLoading, setEmailLoading] = useState(false)

  const logOut = () => {
    auth().signOut();
    navigateToAuth()
  }

  const emailPaddingValue = useRef(new Animated.Value(10)).current;
  const emailElevationValue = emailPaddingValue.interpolate({
    inputRange: [10, 150],
    outputRange: [0, 20]
  })
  const emailEntryPosition = emailPaddingValue.interpolate({
    inputRange: [10, 150],
    outputRange: [10, 80]
  })
  const passwordEntryPosition = emailPaddingValue.interpolate({
    inputRange: [10, 150],
    outputRange: [10, 150]
  })

  const emailAnimationOpen = () => {
    Animated.timing(emailPaddingValue, { toValue: 150, duration: 100, useNativeDriver: false }).start()
    setShowEmail(!showEmail)
  }
  const emailAnimationClose = () => {
    Animated.timing(emailPaddingValue, { toValue: 10, duration: 100, useNativeDriver: false }).start()
    setShowEmail(!showEmail)
  }

  const reauthenticate = (password) => {
    const user = auth().currentUser
    const cred = firebase.auth.EmailAuthProvider.credential(user.email, password);
    return user.reauthenticateWithCredential(cred);
  }

  const handleEmailChange = () => {
    if (emailText == '' || passwordText == '') {
      Alert.alert('Error', 'You must enter your informations before logging in.')
      console.log(auth().currentUser.email)
      return;
    }

    console.log('changing email');

    setEmailLoading(true)

    reauthenticate(passwordText).catch(err => Alert.alert('Error', err));

    auth().currentUser.verifyBeforeUpdateEmail(emailText)
      .then(() => {
        setEmailLoading(false)
        navigateToWaitEmail({ updateEmail: true, email: emailText, password: passwordText })
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        Alert.alert('Error', error.toString())
        console.error(error);
        setEmailLoading(false)
      });
  }

  const deleteAccount = () => {
    Alert.alert(
      'Delete Account?',
      'Deleting your account is irreversible, all your information will become irretrievable!',
      [
        { text: "Keep", style: 'cancel', onPress: () => { } },
        {
          text: 'Delete',
          style: 'destructive',
          // If the user confirmed, then we dispatch the action we blocked earlier
          // This will continue the action that had triggered the removal of the screen
          onPress: () => {
            firestore().collection('Users').doc(auth().currentUser.uid).delete()
            auth().currentUser.delete().then(console.log('deleted'));
            navigateToAuth();
          },
        },
      ]
    );
  }

  const [showDisplayName, setShowDisplayName] = useState(false);
  const [displayName, setDisplayName] = useState('');

  const displayNamePaddingValue = useRef(new Animated.Value(10)).current;
  const displayNameElevationValue = displayNamePaddingValue.interpolate({
    inputRange: [10, 150],
    outputRange: [0, 20]
  })
  // const displayNameEntryPosition = displayNamePaddingValue.interpolate({
  //   inputRange: [10, 150],
  //   outputRange: [10, 80]
  // })

  const displayNameAnimationOpen = () => {
    Animated.timing(displayNamePaddingValue, { toValue: 80, duration: 100, useNativeDriver: false }).start()
    setShowDisplayName(!showDisplayName)
  }
  const displayNameAnimationClose = () => {
    Animated.timing(displayNamePaddingValue, { toValue: 10, duration: 100, useNativeDriver: false }).start()
    setShowDisplayName(!showDisplayName)
  }


  const updateDisplayName = () => {
    auth().currentUser.updateProfile({ displayName: displayName })
      .catch(
        err => {
          Alert.alert('Error', err)
        }
      );
    displayNameAnimationClose();
    setDisplayName('');
  }

  return (
    <ScrollView contentContainerStyle={styles.container} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
      <View style={{ width: '80%', alignItems: 'center' }}>
        {/* Log out Part */}
        <CustomButton title="Log Out" onPress={logOut} style={{ marginTop: 20 }} />
        {/* Info Text */}
        <Text style={styles.displayText} >Email : {"\n"}{auth().currentUser.email}</Text>
        <Text style={styles.displayText} >Name : {"\n"}{auth().currentUser.displayName}</Text>
        {/* Change Email Part */}
        <Animated.View style={[styles.detailContainer, { paddingBottom: emailPaddingValue, elevation: emailElevationValue, backgroundColor: (darkMode ? DarkTheme : DefaultTheme).colors.background }]}>
          <CustomButton title="Change Email" onPress={!showEmail ? emailAnimationOpen : emailAnimationClose} style={{ width: ButtonWidth, zIndex: 2 }} />
          <Animated.View style={{ width: ButtonWidth, position: 'absolute', top: emailEntryPosition, flexDirection: "row", justifyContent: 'space-between' }}>
            <CustomTextInput text="new Email..." style={{ width: '70%' }} inputMode="email" value={emailText} onChange={setEmailText} />
            <CustomButton title="change" style={{ width: '25%' }} onPress={handleEmailChange} />
          </Animated.View>
          <Animated.View style={{ width: ButtonWidth, position: 'absolute', top: passwordEntryPosition, flexDirection: "row", justifyContent: 'space-between' }}>
            <CustomTextInput text="your password..." secureTextEntry style={{ width: '70%' }} inputMode="none" value={passwordText} onChange={setPasswordText} />
            <View style={{ width: '25%', justifyContent: 'center', alignItems: 'center' }}>
              {emailLoading && <ActivityIndicator size={'large'} />}
            </View>
          </Animated.View>
        </Animated.View>
        {/* Delete Account Part */}
        <CustomButton title="Delete Account" onPress={deleteAccount} style={{ marginTop: 20 }} />
        {/* Change Display Name Part */}
        <Animated.View style={[styles.detailContainer, { paddingBottom: displayNamePaddingValue, elevation: displayNameElevationValue, backgroundColor: (darkMode ? DarkTheme : DefaultTheme).colors.background }]}>
          <CustomButton title="Change Name" onPress={!showDisplayName ? displayNameAnimationOpen : displayNameAnimationClose} style={{ width: ButtonWidth, zIndex: 2 }} />
          <Animated.View style={{ width: ButtonWidth, position: 'absolute', top: displayNamePaddingValue, flexDirection: "row", justifyContent: 'space-between' }}>
            <CustomTextInput text="new Name..." style={{ width: '70%' }} inputMode="text" value={displayName} onChange={setDisplayName} />
            <CustomButton title="change" style={{ width: '25%' }} onPress={updateDisplayName} />
          </Animated.View>
        </Animated.View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingBottom: 40,
  },
  detailContainer: {
    marginTop: 20,
    backgroundColor: DefaultTheme.colors.background,
    padding: 10,
    alignItems: 'center',
    elevation: 20,
    borderRadius: 10,
  },
  displayText: {
    color: colors.textLight,
    alignSelf: "flex-start",
    fontSize: 20,
    marginTop: 20,
    fontWeight: 'bold',
  }
})
