import { useEffect } from 'react';
import { View } from 'react-native';
import auth from '@react-native-firebase/auth';
import CustomButton from '../../components/CustomButton';

export default WaitEmail = ({navigation}) => {

  useEffect(() => {
    auth().currentUser.sendEmailVerification();
    const unsubscribe = auth().onUserChanged(() => {
      const unsubscribeInterval = setInterval(() => {
        console.log('reload');
        auth().currentUser.reload()
        if (auth().currentUser.emailVerified) {
          unsubscribe();
          clearInterval(unsubscribeInterval);
          navigation.navigate("App")
        }
      }, 1000);
    })
    return unsubscribe();
  }, [])

  const sendAgain = () => {
    auth().currentUser.sendEmailVerification();
  }

  const handleDone = () => {
    auth().currentUser.reload().then(() => {
        const user = auth().currentUser;
        console.log(user)
        if (user.emailVerified) {
          navigation.navigate("App")
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