import {  View } from 'native-base'
import React from 'react'
import SearchBar from '../components/SearchBar'
import ListingView from '../components/ListingView';
import COLORS from '../assets/Colors';
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