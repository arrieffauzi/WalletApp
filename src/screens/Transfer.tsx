import {StyleSheet, Text, View, TextInput} from 'react-native';
import React, {useState, useContext} from 'react';
import TitleHeader from '../components/TitleHeader';
import Button from '../components/Button';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import {UserContext} from '../../App';

const Transfer = () => {
  const [isValid, setIsValid] = useState(false);
  const [transferData, setTransferData] = useState({});
  const user: any = useContext(UserContext);
  const navigation = useNavigation();

  const checkAmount = (value: string) => {
    if (parseInt(value) < 10000 || !value || value == '') {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  };

  const handleOnchangeText = (value: string, fieldName: string) => {
    if (fieldName == 'amount') {
      checkAmount(value);
    }
    setTransferData({...transferData, [fieldName]: parseInt(value)});
  };

  const onSubmit = () => {
    let contextData = user.user;
    axios
      .post('https://tht-api.nutech-integrasi.app/transfer', transferData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Beared ${contextData.token}`,
        },
      })
      .then(function (response) {
        if (response.data.status == 0) {
          navigation.navigate('Dashboard');
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <View style={styles.background}>
      <View style={styles.page}>
        <TitleHeader title="Transfer" backButton={true} />
        <View style={styles.container}>
          <View style={styles.wrapperInput}>
            <TextInput
              placeholder="Nominal"
              style={styles.input}
              keyboardType="numeric"
              onChangeText={(value: string) =>
                handleOnchangeText(value, 'amount')
              }
            />
          </View>
          {!isValid && (
            <Text style={styles.errorMsg}>Minimum Transfer is Rp.10.000</Text>
          )}
        </View>
        <Button textButton="Transfer" onPress={onSubmit} disabled={!isValid} />
      </View>
    </View>
  );
};

export default Transfer;

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    marginBottom: 40,
  },
  background: {
    backgroundColor: '#f57921',
    flex: 1,
  },
  page: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: '20%',
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  wrapperInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F2F2',
    borderRadius: 20,
    paddingHorizontal: 10,
  },
  input: {
    borderStyle: 'solid',
    flex: 1,
  },
  errorMsg: {
    fontStyle: 'italic',
    fontSize: 12,
    color: '#DB0000',
    marginTop: 5,
    marginLeft: 5,
  },
});
