import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState, useContext, useEffect} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {UserContext} from '../../../../App';

type BalanceProp = {
  balance: any;
};

const delimiter = (value: number) => {
  return value.toLocaleString();
};

const Balance = () => {
  const navigation = useNavigation();
  const [balance, setBalance] = useState({balance: 0});
  const user: any = useContext(UserContext);

  const getBalance = (token: string) => {
    axios
      .get('https://tht-api.nutech-integrasi.app/balance', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Beared ${token}`,
        },
      })
      .then(function (response) {
        if (response.data.data) {
          setBalance(response.data.data);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    let contextData = user.user;
    console.log('context',user.user);
    getBalance(contextData.token);
  },[user]);


  return (
    <View style={[styles.shadowProp, styles.saldo]}>
      <View>
        <Text style={styles.yourBalance}>Your Balance</Text>
      </View>
      <View>
        <Text style={styles.balance}>
          Rp.{!balance.balance ? 0 : delimiter(balance.balance)}
        </Text>
      </View>
      <View style={styles.transferContainer}>
        <View style={styles.transferCard}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Transfer');
            }}>
            <Text style={styles.action}>
              <Icon name="paper-plane" /> Transfer
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.transferCard}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Topup');
            }}>
            <Text style={styles.action}>
              <Icon name="plus-circle" /> TopUp
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Balance;

const styles = StyleSheet.create({
  shadowProp: {
    backgroundColor: '#ee6f14',
    shadowOffset: {width: -2, height: 4},
    shadowColor: '#171717',
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  saldo: {
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  yourBalance: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  balance: {
    color: 'white',
    fontSize: 24,
    fontWeight: '900',
  },
  transferContainer: {
    justifyContent: 'space-evenly',
    alignContent: 'center',
    flexDirection: 'row',
    marginTop: 10,
  },
  transferCard: {
    borderRadius: 20,
    backgroundColor: 'white',
    paddingHorizontal: 25,
    paddingVertical: 10,
  },
  action: {
    color: '#171717',
    fontSize: 14,
  },
});
