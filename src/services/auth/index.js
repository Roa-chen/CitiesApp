import React from 'react';
import auth from '@react-native-firebase/auth';
import { navigateToAuth } from '../../navigation';

export const getUser = () => (auth().currentUser);

export const getUserUid = () => (auth().currentUser.uid)

export const deleteAccount = () => {
  
  auth().currentUser.delete().then(console.log('User Was Deleted'));
}

export const logOut = (navigate=false) => {
  auth().signOut().then(() => {
    if (navigate) navigateToAuth();
  });
}