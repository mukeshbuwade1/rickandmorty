import { Center,  Text } from 'native-base'
import React from 'react';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import Colors from '../assets/Colors';
import font from '../assets/font';

const EmptyList = () => {
  return (
    <Center mt={20}>
      <Text fontSize={20} style={{ fontFamily: font.Lacquer }} color={Colors.white}>Nothing To Show </Text>
      <Text style={{ fontFamily: font.Lacquer }} color={Colors.white}>try again</Text>
    </Center>
  )
}

export default EmptyList