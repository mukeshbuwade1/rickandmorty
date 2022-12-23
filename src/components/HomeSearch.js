import { Box, Button, Heading, HStack, Image, Input, Pressable, Text, View, VStack } from 'native-base'
import React from 'react';
// import img from "../assets/image/login-bg.png"
import Icon from 'react-native-vector-icons/dist/Ionicons';
import  COLORS  from '../assets/Colors';

const HomeSearch = () => {
    return (
        <HStack
            w={"100%"} bg={COLORS.primary}
            px={3} py={3}
            pt={5}
        >
            <Input
                placeholder='Search Product...'
                variant={"filled"}
                borderBottomColor={"green.600"}
                color={"green"}
                bg={COLORS.white}
                w={"85%"}
                pl={3}
                _focus={{
                    bg: COLORS.white
                }}
            />
            <Pressable ml={3} justifyContent={"center"} >
                <Icon name="basket" size={33} color={COLORS.white} />
                <Box
                    px={1}
                    position={"absolute"}
                    top={-2}
                    right={-2}
                    rounded={"full"}
                    bg={"red.800"}
                    borderRadius={20}
                    _text={{
                        color: COLORS.white, fontSize: "11px"
                    }}
                >
                    5
                </Box>
            </Pressable>
        </HStack>
    )
}

export default HomeSearch