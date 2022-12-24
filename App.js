import React, { useEffect, useState } from "react";
import { NativeBaseProvider, Box, StatusBar, Text } from "native-base";
import Colors from "./src/assets/Colors";
import NetInfo from "@react-native-community/netinfo";
import OfflineInfoHeader from "./src/components/OfflineInfoHeader";

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CharacterList from "./src/screens/CharacterList";
import theme from "./src/theme/theme";
import CharacterDetailScreen from "./src/screens/CharacterDetailScreen";
import SplashScreen from "./src/screens/SplashScreen";

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
        <Stack.Navigator screenOptions={{headerShown:false}} initialRouteName={"SplashScreen"}>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
          <Stack.Screen name="CharacterList" component={CharacterList} />
          <Stack.Screen name="CharacterDetailScreen" component={CharacterDetailScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

  return (
    <NativeBaseProvider theme={theme}>
     <OfflineInfoHeader />
      <RootNavigation />
    </NativeBaseProvider>
  );
}