import {  Text, View } from 'native-base'
import React from 'react'
import HomeSearch from '../components/HomeSearch'
import Product from '../components/Product'

const UserList = () => {
  return (
    <View  >
     <HomeSearch/>
     <Product/>
    </View>
  )
}

export default UserList