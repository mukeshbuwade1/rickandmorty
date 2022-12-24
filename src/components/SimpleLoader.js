import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Colors from '../assets/Colors'

const SimpleLoader = () => {
  return (
    <View style={{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:Colors.black
    }}>
    <ActivityIndicator color={Colors.white} size={"large"} />
    </View>
  )
}

export default SimpleLoader

const styles = StyleSheet.create({})