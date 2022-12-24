import { Box, Button, Heading, HStack, Image, Input, Pressable, Text, View, VStack } from 'native-base'
import React from 'react'
import SearchBar from '../components/SearchBar'
import ListingView from '../components/ListingView';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import COLORS from '../assets/Colors';
import font from '../assets/font';
const CharacterList = () => {
  const [name, setname] = React.useState("")

  return (
    <View bg={COLORS.black} flex={1} >    
      <SearchBar  setname={setname} />
      <ListingView name={name} />
    </View>
  )
}

export default CharacterList