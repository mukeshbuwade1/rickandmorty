import { ActivityIndicator, StyleSheet,  } from 'react-native'
import React from 'react'
import { Text, View,Pressable, Heading } from 'native-base'
import COLOR from '../assets/Colors'
import font from '../assets/font'

const FooterCompForFlatlist = (props) => {

  return (
    <View style={{ height: 100, width: "100%", alignItems: "center", paddingTop: 20 }}    >
      {
        props?.paginationLoading
          ? <ActivityIndicator size={"large"} color={"#FFF"} />
          : <Pressable
            onPress={props?.getData ? () => props.getData() : () => { }}
            bg={COLOR.lightGray}
            py={2}
            px={3}
            rounded={3}
          >
            <Heading fontSize={14} style={{ fontFamily: font.Lacquer }} bold>Load More</Heading>
          </Pressable>
      }
    </View>
  )
}



export default FooterCompForFlatlist

const styles = StyleSheet.create({})