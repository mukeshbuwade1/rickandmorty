import React, { useEffect, useState } from "react";
import { NativeBaseProvider, Box, StatusBar, Text } from "native-base";
import NetInfo from "@react-native-community/netinfo";
import OfflineInfoHeader from "./src/components/OfflineInfoHeader";

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CharacterList from "./src/screens/CharacterList";
import theme from "./src/theme/theme";
import CharacterDetailScreen from "./src/screens/CharacterDetailScreen";
import SplashScreen from "./src/screens/SplashScreen";
import Form from "./src/screens/Form";

const Stack = createStackNavigator();

export default function App() {

  function RootNavigation() {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={"SplashScreen"}>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="CharacterList" component={CharacterList} />
        <Stack.Screen name="CharacterDetailScreen" component={CharacterDetailScreen} />
      </Stack.Navigator>
    );
  }

  return (<Form/>
    // <NativeBaseProvider theme={theme}>
    //   <NavigationContainer  >
    //     <OfflineInfoHeader />
    //     <RootNavigation />
    //   </NavigationContainer>
    // </NativeBaseProvider>
  );
}

// import { NativeBaseProvider, useColorMode, Text, Button, Center, Box, useColorModeValue, Heading } from "native-base";
// import React from 'react'
// import fonts from "./src/assets/font"
// import theme from "./src/theme/theme";
// const Example = () => {
//   const {
//     toggleColorMode
//   } = useColorMode();
//   const text = useColorModeValue("Light", "Dark");
//   const bg = useColorModeValue("#aaa", "#555");
//   console.log(text)
//   return (
//     <Center>
//       <Button onPress={toggleColorMode} h={10}>
//         Toggle
//       </Button>

//       <Heading>this is Heading(mode:{text})</Heading>
//       <Text>this is text</Text>
//     </Center>
//   )
// }

// const App = () => {

//   return (
//     <NativeBaseProvider theme={theme} >
//       <Center flex={1} >
//         <Example />
//       </Center>
//     </NativeBaseProvider>
//   )
// }

// export default App