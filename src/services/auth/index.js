import React from 'react';
import auth from '@react-native-firebase/auth';

export const getUser = () => (auth().currentUser);

export const getUserUid = () => (auth().currentUser.uid)

export const deleteAccount = () => {
  
  auth().currentUser.delete().then(console.log('User Was Deleted'));
}