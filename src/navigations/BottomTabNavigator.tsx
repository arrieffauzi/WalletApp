import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Home from '../screens/home/Home';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Profile from '../screens/profile/Profile';
import Icon from 'react-native-vector-icons/Ionicons';

const BottomTabNavigator = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
        screenOptions={({route}) => ({
          headerShown: false,
          tabBarActiveTintColor:'#f57921',
          tabBarIcon: ({color, size, focused}) => {
              let iconName = '';
              if (route.name === 'Home') {
                  iconName = focused ? 'home-sharp' : 'home-outline';
              } else if (route.name === 'Profile') {
                  iconName = focused ? 'person' : 'person-outline';
              }
              return <Icon name={iconName} size={size} color={color}/>
          },
        })}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;

const styles = StyleSheet.create({});
