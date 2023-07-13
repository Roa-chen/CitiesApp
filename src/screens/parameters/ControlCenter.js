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
import ExpandableButton from "../../components/controlCenter/ExpandableButton";
import useUser from "../../hooks/auth/useUser";

export default ControlCenter = ({ navigation }) => {

  const darkMode = useSelector((state) => state.theme.darkMode)

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if (showEmail) {
        setShowEmail(false);
        emailPaddingValue.setValue(10);
      }
    })

    return () => {
      unsubscribe();
    }
  }, [])

  const [refreshing, setRefreshing] = useState(false);

  const user = useUser();

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
    navigateToAuth();
  }

  const reauthenticate = (password) => {
    // const user = auth().currentUser
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
  const [displayName, setDisplayName] = useState('test');
  const [displayNameLoading, setDisplayNameLoading] = useState(false);

  const updateDisplayName = () => {
    setDisplayNameLoading(true);
    auth().currentUser.updateProfile({ displayName: displayName })
      .then(() => {
        setDisplayNameLoading(false)
      })
      .catch(
        err => {
          console.log('err: ', err)
          Alert.alert('Error', err.code)
          setDisplayNameLoading(false)
        }
      );
    setShowDisplayName(false);
    setDisplayName('');
  }

  return (
    <ScrollView contentContainerStyle={styles.container} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
      <View style={{ width: '80%', alignItems: 'center' }}>
        {/* Log out Part */}
        <CustomButton title="Log Out" onPress={logOut} style={{ marginTop: 20 }} />
        {/* Info Text */}
        <Text style={styles.displayText} >Email : {"\n"}{user.email}</Text>
        <Text style={styles.displayText} >Name : {"\n"}{user.displayName}</Text>
        {/* Change Email Part */}

        <ExpandableButton
          headerName={'Change Email'} 
          expanded={showEmail}
          setExpanded={setShowEmail}

          buttonText={'Change'}
          buttonOnPress={handleEmailChange}

          firstInputPlaceholder={"new Email..."} 
          firstInputValue={emailText} 
          firstInputOnChange={setEmailText}

          secondInputPlaceholder={"Password..."}
          secondtInputValue={passwordText}
          secondInputOnChange={setPasswordText}
          secondInputSecureTextEntry

          loading={emailLoading}
        />

        {/* Delete Account Part */}
        <CustomButton title="Delete Account" onPress={deleteAccount} style={{ marginTop: 20 }} />
        {/* Change Display Name Part */}
        <ExpandableButton
          headerName={'Change Name'} 
          expanded={showDisplayName}
          setExpanded={setShowDisplayName}

          loading={displayNameLoading}

          buttonText={'Change'}
          buttonOnPress={updateDisplayName}

          firstInputPlaceholder={"new Name..."} 
          firstInputValue={displayName} 
          firstInputOnChange={setDisplayName}
        />
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

