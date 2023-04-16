import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  ScrollView,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import axios from 'axios';
import {UserContext} from '../../../../App';
import Icon from 'react-native-vector-icons/FontAwesome5';

const ListHistory = () => {
  const user: any = useContext(UserContext);
  const [data, setData] = useState([]);

  useEffect(() => {
    getHistory();
  }, []);

  const delimiter = (value: number) => {
    return value.toLocaleString();
  };

  const getHistory = () => {
    let contextData = user.user;
    axios
      .get('https://tht-api.nutech-integrasi.app/transactionHistory', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Beared ${contextData.token}`,
        },
      })
      .then(function (response) {
        if (response.data.status == 0) {
          setData(response.data.data);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Last Transaction</Text>
        <Text style={styles.viewAll}>View All</Text>
      </View>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={data}
          keyExtractor={(item: any) => item.transaction_id}
          renderItem={({item}) => (
            <ScrollView>
              <View style={styles.listContainer}>
                <Text style={styles.icon}>
                  {item.transaction_type == 'topup' ? (
                    <Icon name="plus-circle" size={16} />
                  ) : (
                    <Icon name="paper-plane" size={16} />
                  )}{' '}
                  {item.transaction_type}
                </Text>
                <Text style={styles.icon}>
                  Rp.{delimiter(parseInt(item.amount))}
                </Text>
              </View>
            </ScrollView>
          )}
        />
      </SafeAreaView>
    </View>
  );
};

export default ListHistory;

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '400',
    color: '#4c4d4f',
  },
  viewAll: {
    fontSize: 14,
    fontWeight: '400',
    color: '#4c4d4f',
  },
  container: {
    marginTop: 20,
    flex: 1,
  },
  listContainer: {
    flexDirection: 'row',
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#ebe7e7',
    marginBottom: 10,
    alignContent: 'center',
    justifyContent: 'space-between',
  },
  icon: {
    fontSize: 16,
  },
});
