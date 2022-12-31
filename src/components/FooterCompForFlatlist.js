import { ActivityIndicator,  } from 'react-native'
import React from 'react'
import { Text, View,Pressable, Heading, useColorMode } from 'native-base'
import COLOR from '../assets/Colors'
import font from '../assets/font'
import { myColors } from '../theme/theme'

const FooterCompForFlatlist = (props) => {
const {colorMode}=useColorMode()
  return (
    <View style={{ height: 100, width: "100%", alignItems: "center", paddingTop: 20 }}    >
      {
        props?.paginationLoading
          ? <ActivityIndicator size={"large"} color={colorMode === 'dark' ? myColors.primary["700"] : myColors.secondary["500"]} />
          : <Pressable
            onPress={props?.getData ? () => props.getData() : () => { }}
            bg={colorMode === 'dark' ? myColors.primary["700"] : myColors.secondary["500"]}
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