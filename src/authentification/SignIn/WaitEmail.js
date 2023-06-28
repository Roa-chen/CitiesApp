import { useEffect } from 'react';
import { View } from 'react-native';
import auth from '@react-native-firebase/auth';
import CustomButton from '../../components/CustomButton';

export default WaitEmail = ({navigation}) => {

  useEffect(() => {
    auth().currentUser.sendEmailVerification();
  }, [])

  const sendAgain = () => {
    auth().currentUser.sendEmailVerification();
  }

  const handleDone = () => {
    const user = auth().currentUser;
    console.log(user)
    if (user.emailVerified) {
      navigation.navigate("App")
    }
  }

  return(
    <View style={{flex: 1, alignItems: 'center'}}>
      <CustomButton title="send again" onPress={sendAgain} />
      <CustomButton title="done" onPress={handleDone} />
    </View>
  )
}