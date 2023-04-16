import {StyleSheet, Text, View, TextInput} from 'react-native';
import React, {useState, useContext} from 'react';
import TitleHeader from '../../components/TitleHeader';
import Gap from '../../components/Gap';
import Button from '../../components/Button';
import {UserContext} from '../../../App';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';

const UpdateProfile = () => {
  const [profile, setProfile] = useState<any>({});
  const user: any = useContext(UserContext);
  const navigation = useNavigation();

  const handleOnchangeText = (value: string, fieldName: string) => {
    setProfile({...profile, [fieldName]: value});
  };

  const onSubmit = () => {
    let contextData = user.user;
    axios
      .post('https://tht-api.nutech-integrasi.app/updateProfile', profile, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Beared ${contextData.token}`,
        },
      })
      .then(function (response) {
        if (response.data.status == 0) {
          navigation.navigate('Profile');
          user.setUser({
            email:user.user.email,
            token:user.user.token,
            first_name: profile.first_name,
            last_name: profile.last_name,
            fetchData: user.user.fetchData ? !user.user.fetchData : true,
          });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <View style={styles.background}>
      <View style={styles.page}>
        <TitleHeader title="Update Profile" backButton={true} />
        <View style={styles.container}>
          <View style={styles.wrapperInput}>
            <TextInput
              placeholder="First Name"
              style={styles.input}
              onChangeText={(value: string) =>
                handleOnchangeText(value, 'first_name')
              }
            />
          </View>
          <Gap />
          <View style={styles.wrapperInput}>
            <TextInput
              placeholder="Last Name"
              style={styles.input}
              onChangeText={(value: string) =>
                handleOnchangeText(value, 'last_name')
              }
            />
          </View>
          <Gap />
        </View>
        <View style={{marginTop: 20}}>
          <Button onPress={onSubmit} textButton="Update Profile" />
        </View>
      </View>
    </View>
  );
};

export default UpdateProfile;

const styles = StyleSheet.create({
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
  container: {
    marginTop: 20,
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
});
