import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const FooterCompForFlatlist = () => {
  return (
    <View style={{height:150, width:"100%" , alignItems:"center"}} 
    >
      <ActivityIndicator size={"large"} color={"#FFF"} />
    </View>
  )
}

export default FooterCompForFlatlist

const styles = StyleSheet.create({})