import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Transfer from '../screens/Topup';

const HomeNavigator = () => {
    const Stack = createNativeStackNavigator();
    return (
      <Stack.Navigator>
        <Stack.Screen name='Transfer' component={Transfer}/>
      </Stack.Navigator>
    );
}

export default HomeNavigator