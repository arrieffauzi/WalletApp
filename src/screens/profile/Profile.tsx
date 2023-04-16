import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React, {useEffect, useContext, useState} from 'react';
import TitleHeader from '../../components/TitleHeader';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {UserContext} from '../../../App';
import Icon from 'react-native-vector-icons/Ionicons';

export interface Profile {
  email: string;
  first_name: string;
  last_name: string;
}

const Profile = () => {
  const navigation = useNavigation();
  const user: any = useContext(UserContext);
  const [profile, setProfile] = useState<Profile>({
    email: '',
    first_name: '',
    last_name: '',
  });

  useEffect(() => {
    let contextData = user.user;
    getProfile(contextData.token);
  }, []);

  const getProfile = (token: string) => {
    axios
      .get('https://tht-api.nutech-integrasi.app/getProfile', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Beared ${token}`,
        },
      })
      .then(function (response) {
        if (response.data.data) {
          setProfile(response.data.data);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <View style={styles.background}>
      <View style={styles.page}>
        <View style={[styles.profileContainer,styles.boxWithShadow]}>
          <Image
            style={styles.image}
            source={require('../../assets/images/person.png')}
          />
          <View>
            <Text style={styles.text}>{profile.first_name} {profile.last_name}</Text>
            <Text style={styles.text}>{profile.email}</Text>
          </View>
        </View>
        <View style={[styles.list]}>
          <TouchableOpacity onPress={()=>{navigation.navigate('UpdateProfile')}}>
            <Text style={styles.text}><Icon size={18} name='person'/> Update Profile</Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.list]}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Login');
            }}>
            <Text style={styles.text}><Icon size={18} name='exit'/> Logut</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#f57921',
    flex: 1,
  },
  page: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: '30%',
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  boxWithShadow: {
    shadowOffset: {width: -2, height: 4},  
    shadowColor: '#171717',  
    shadowOpacity: 0.2,  
    shadowRadius: 3,  
    elevation: 3,
  },
  profileContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    flexDirection:'row',
    alignItems:'center',
    marginTop:-60
  },
  image: {
    width: 70,
    height: 70,
  },
  nameContainer:{
    marginLeft:10
  },
  text:{
    color:'#4c4d4f',
    fontSize:14,
    fontWeight:'600',
  },
  list:{
    borderRadius:10,
    marginTop:10,
    padding:10,
    backgroundColor:'white',
  }
});
