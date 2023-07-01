import React, { useEffect } from 'react';
import { View, Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import CustomButton from '../../components/CustomButton';
import { navigateToApp } from '../../navigation';
import { createUserCloud } from '../../cloud';

export default WaitEmail = (props) => {

  const {navigation} = props;
  const {params} = props.route;
  const {updateEmail} = params;

  useEffect(() => {

    console.log('Waiting Email. updateEmail : ', updateEmail)

    let foundUser = false;

    navigation.addListener('beforeRemove', (e) => {
      if (foundUser) {
        return
      }

      e.preventDefault()

      Alert.alert(
        'Leave waiting screen?',
        'Quit this screen will stop the email verification process. Once verification is complete, you\'ll need to re-enter your information.',
        [
          { text: "Don't leave", style: 'cancel', onPress: () => {} },
          {
            text: 'Leave',
            style: 'destructive',
            // If the user confirmed, then we dispatch the action we blocked earlier
            // This will continue the action that had triggered the removal of the screen
            onPress: () => {
              unsubscribe();
              clearInterval(unsubscribeInterval);
              navigation.dispatch(e.data.action);
            },
          },
        ]
      );

    })

    if (!updateEmail) {
      auth().currentUser.sendEmailVerification().then(() => {
        const unsubscribe = auth().onUserChanged(() => {
  
          const unsubscribeInterval = setInterval(() => {
            if (foundUser) {
              console.log('clear : ', unsubscribeInterval)
              clearInterval(unsubscribeInterval)
            }
            console.log('reload')
            auth().currentUser.reload()
          }, 10000);
          console.log("interval: ", unsubscribeInterval)
          if (auth().currentUser.emailVerified) {
            
            console.log("clear: ", unsubscribeInterval)
            clearInterval(unsubscribeInterval);
  
            if (!foundUser){
              createUserCloud().then(() => {
                foundUser = true;
                clearInterval(unsubscribeInterval);
                navigateToApp();
              });
            } else {
              clearInterval(unsubscribeInterval);
            }
            return unsubscribe();
          }
  
  
        })
      });
    } else {
      const unsubscribeInterval = setInterval(() => {
        auth().signInWithEmailAndPassword(params.email, params.password).then(() => {
          console.log('findUser')
          foundUser = true;
          clearInterval(unsubscribeInterval);
          navigateToApp()
        }).catch(err => {
          console.log('waiting')
        })
      }, 5000);
      return clearInterval(unsubscribeInterval);
    }
  }, [])

  const sendAgain = () => {
    auth().currentUser.sendEmailVerification();
  }

  const handleDone = () => {
    auth().currentUser.reload().then(() => {
        const user = auth().currentUser;
        console.log(user)
        if (user.emailVerified) {
          navigateToApp()
        }
    })
    
  }

  return(
    <View style={{flex: 1, alignItems: 'center'}}>
      <View style={{width: '80%', alignItems: 'center'}}>
        <CustomButton title="send again" onPress={sendAgain} style={{marginTop: 20}} />
        <CustomButton title="done" onPress={handleDone} style={{marginTop: 20}} />
      </View>
    </View>
  )
}