import React from "react";

import firestore from "@react-native-firebase/firestore";
import auth from '@react-native-firebase/auth'

import { v4 as uuidV4 } from 'uuid';

import { getUserUid } from "../auth";

export const createUserCloud = async () => {

  const userUid = getUserUid();

  const city = {
    city: 'Your first City',
    country: 'The Country displays here',
    id: uuidV4(),
    locations: [
      {
        name: 'You can also set Location you visited',
        info: 'And even info about them',
        id: uuidV4(),
      }
    ]
  }

  await firestore().collection("Users").doc(userUid).set({userName: auth().currentUser.displayName})
    .catch((error) => {
      console.error('error while creating user document : ', error)
    })

  // const cityRef = await firestore().collection("Users").doc(auth().currentUser.uid).collection('Cities').doc(city.id).set(city)
  const cityRef = await firestore().doc(`Users/${userUid}/Cities/${city.id}`).set(city)
    .catch((error) => {
      console.error('error while creating first city document : ', error)
    })
  
  return cityRef;
}

export const deleteUserToFirestore = async () => {
  const userUid = getUserUid()
  firestore().collection('Users').doc(`Users/${userUid}`).delete()
    .catch((error) => {
      console.error('error white deleting account : ', error)
    })
}

export const addCityToFirestore = (city) => {
  const userUid = getUserUid();
  firestore().doc(`Users/${userUid}/Cities/${city.id}`).set(city)
}

export const delCityToFirestore = (city) => {
  const userUid = getUserUid();
  firestore().doc(`Users/${userUid}/Cities/${city.id}`).delete()
}

export const addLocationToFirestore = ({city, location}) => {
  const userUid = getUserUid();
  firestore().doc(`Users/${userUid}/Cities/${city.id}`).update({locations: firestore.FieldValue.arrayUnion(location)})
}

export const delLocationToFirestore = ({city, location}) => {
  const userUid = getUserUid();
  firestore().doc(`Users/${userUid}/Cities/${city.id}`).update({locations: firestore.FieldValue.arrayRemove(location)})
}


