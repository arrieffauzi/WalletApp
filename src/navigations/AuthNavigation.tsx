import {View, Text} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../screens/auth/Login';
import Register from '../screens/auth/Register';
import BottomTabNavigator from './BottomTabNavigator';
import HomeNavigator from './HomeNavigator';
import Topup from '../screens/Topup';
import Transfer from '../screens/Transfer';
import UpdateProfile from '../screens/profile/UpdateProfile';

const AuthNavigation = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{headerShown:false}} initialRouteName='Login'>
      <Stack.Screen name='Login' component={Login}/>
      <Stack.Screen name='Register' component={Register}/>
      <Stack.Screen name='Dashboard' component={BottomTabNavigator}/>
      <Stack.Screen name='Topup' component={Topup}/>
      <Stack.Screen name='Transfer' component={Transfer}/>
      <Stack.Screen name='UpdateProfile' component={UpdateProfile}/>
    </Stack.Navigator>
  );
};

export default AuthNavigation;
