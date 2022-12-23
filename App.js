import React, { useEffect, useState } from "react";
import { NativeBaseProvider, Box, StatusBar, Text } from "native-base";
import Colors from "./src/assets/Colors";
import NetInfo from "@react-native-community/netinfo";
import OfflineInfoHeader from "./src/components/OfflineInfoHeader";


import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import UserList from "./src/screens/UserList";
const Stack = createStackNavigator();

export default function App() {
  const [isConnected, setIsConnected] = useState(false)
  useEffect(() => {
    // Subscribe
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected)
    });

    // Unsubscribe
    return () => unsubscribe();
  }, [])

  function RootNavigation() {
    return (
      <NavigationContainer  >
        <Stack.Navigator screenOptions={{headerShown:false}}>
          <Stack.Screen name="UserList" component={UserList} />
       
       {/*  <Stack.Screen name="Settings" component={SettingsScreen} /> */}
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

  return (
    <NativeBaseProvider>
      <StatusBar backgroundColor={isConnected ? Colors.primary : Colors.danger} />
      {isConnected ? null : <OfflineInfoHeader />}
      <RootNavigation />
    </NativeBaseProvider>
  );
}