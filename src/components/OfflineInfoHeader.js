import { NativeBaseProvider, Box, StatusBar, Text, View, Center, HStack } from "native-base";
import React from 'react'
import Colors from "../assets/Colors";
// import Icon from 'react-native-vector-icons/dist/MaterialIcons';

const OfflineInfoHeader = () => {
    return (
        <Center bg={Colors.danger}>
            <HStack space={2} alignItems={"center"}>
                <Text fontWeight={"500"} fontSize={12} pb={0.5} color={Colors.white}>You Are Offline</Text>
                {/* <Icon name="wifi-off" size={15} color={COLORS.white} /> */}
            </HStack>
        </Center>
    )
}

export default OfflineInfoHeader