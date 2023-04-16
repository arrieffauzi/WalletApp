import React, {useState, createContext} from 'react';
import {View, Text, StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AuthNavigation from './src/navigations/AuthNavigation';

const Stack = createNativeStackNavigator();
export const UserContext = createContext({})

function App() {
  const [user, setUser] = useState({});
  return (
    <UserContext.Provider value={{user,setUser}}>
      <NavigationContainer>
        <StatusBar backgroundColor="#f57921" />
        <AuthNavigation />
      </NavigationContainer>
    </UserContext.Provider>
  );
}

export default App;
