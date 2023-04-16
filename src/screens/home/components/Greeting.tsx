import {StyleSheet, Text, View} from 'react-native';
import React, {useState, useEffect,useContext} from 'react';
import { UserContext } from '../../../../App';

const Greeting = () => {
  const [time, setTime] = useState('');
  const user: any = useContext(UserContext);

  useEffect(() => {
    let hour: any = new Date();
    hour = hour.getHours();
    if (hour < 11) {
      setTime('Good Morning');
    } else if (hour < 18) {
      setTime('Good Afternoon');
    }else if (hour < 22){
      setTime('Good Evening');
    }else{
        setTime('Good Night');
    }
  },[user]);
  return (
    <View style={styles.welcome}>
      <View style={styles.logoContainer}>
        <Text style={styles.nutech}>Nutech</Text>
        <Text style={styles.wallet}>Wallet</Text>
      </View>
      <View>
        <Text style={styles.greetingText}>Hello, {time}</Text>
        <Text style={styles.welcomeText}>{user.user.first_name} {user.user.last_name}</Text>
      </View>
    </View>
  );
};

export default Greeting;

const styles = StyleSheet.create({
  welcome: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  logoContainer: {
    flexDirection: 'row',
    marginRight:30
  },
  nutech: {
    fontSize: 24,
    color: '#f57921',
    fontWeight: '900',
  },
  wallet: {
    fontSize: 24,
    color: '#4c4d4f',
    fontWeight: '900',
  },
  greetingText: {
    fontWeight: '400',
    fontSize: 14,
    color: '#4c4d4f',
  },
  welcomeText: {
    color: '#4c4d4f',
    fontWeight: '800',
    fontSize: 18,
  },
});
