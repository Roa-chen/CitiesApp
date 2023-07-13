import React, { useState} from "react";

import auth from '@react-native-firebase/auth';


export default useUser = () => {

  const [user, setUser] = useState(auth().currentUser);

  auth().onUserChanged(user => {
    setUser(user)
  })

  return user;

}