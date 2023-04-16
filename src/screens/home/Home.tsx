import {StyleSheet, Text, View} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import Greeting from './components/Greeting';
import Balance from './components/Balance';
import {UserContext} from '../../../App';
import ListHistory from './components/ListHistory';

const Home = () => {
  const user: any = useContext(UserContext);

  return (
    <View style={styles.background}>
      <View style={styles.greetContainer}>
        <Greeting />
      </View>
      <View style={styles.page}>
        <Balance />
        <ListHistory />
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  background: {
    backgroundColor: 'white',
    flex: 1,
  },
  page: {
    backgroundColor: 'white',
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  greetContainer: {
    flex: 0.2,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
