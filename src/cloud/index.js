import firestore from "@react-native-firebase/firestore";
import auth from '@react-native-firebase/auth'
import { v4 as uuidV4 } from 'uuid';

export const createUserCloud = async () => {
  const userRef = await firestore().collection("Users").doc(auth().currentUser.uid).set({userName: auth().currentUser.displayName})

  const city = {
    city: 'Your first City',
    country: 'The Country displays here',
    id: uuidV4(),
    locations: [
      {
        name: 'You can also set Location you visited',
        info: 'And even info about them'
      }
    ]
  }

  const cityRef = await firestore().collection("Users").doc(auth().currentUser.uid).collection('Cities').doc(city.id).set(city)

  return cityRef;
}