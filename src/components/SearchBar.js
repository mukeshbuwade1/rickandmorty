import { Box, Button, Heading, HStack, Image, Input, Pressable, Text, View, VStack } from 'native-base'
import React from 'react';
import { Keyboard } from 'react-native';
// import img from "../assets/image/login-bg.png"
import Icon from 'react-native-vector-icons/dist/Ionicons';
import COLORS from '../assets/Colors';

const SearchBar = (props) => {
    const [text, setText] = React.useState("");
    const { setname } = props
    return (
        <HStack
            w={"100%"} bg={COLORS.primary}
            px={3} py={3}
            pt={5}
            flexDirection={"row"}
            justifyContent={"space-between"}
        >
            <Input
                value={text}
                onChangeText={(text) => setText(text)}
                placeholder='Search by name..'
                variant={"filled"}
                rounded={5}
                borderColor={COLORS.black}
                color={COLORS.white}
                bg={COLORS.cardBg}
                w={"85%"}
                pl={3}
                _focus={{
                    borderColor: COLORS.black,
                    bg: COLORS.cardBg,
                    color: COLORS.white
                }}
            />
            <Pressable onPress={() => {
                setname(text)
                Keyboard.dismiss()
            }} rounded={5} justifyContent={"center"} bg={COLORS.cardBg} px={3} >
                <Icon name={"search"} size={25} color={COLORS.gray} />
            </Pressable>
        </HStack>
    )
}

export default SearchBar