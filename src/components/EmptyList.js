import { Center, FlatList, HStack, Image, Pressable, Text, View, VStack } from 'native-base'
import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import COLORS from '../assets/Colors';
import { Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FooterCompForFlatlist from './FooterCompForFlatlist';
import Colors from '../assets/Colors';

const EmptyList = () => {
  return (
    <Center>
      <Text color={Colors.white}>Nothing to show </Text>
    </Center>
  )
}

export default EmptyList