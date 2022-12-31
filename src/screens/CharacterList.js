import { Heading, HStack, Pressable, Switch, Text, useColorMode, useColorModeValue, View } from 'native-base'
import React from 'react'
import SearchBar from '../components/SearchBar'
import ListingView from '../components/ListingView';
import COLORS from '../assets/Colors';
import { myColors } from '../theme/theme';
import { checkPermission, checkPermissionForStorage } from '../services/Permissions';
import { openDocumentPicker } from '../services/documentPicker';
//   const {
//     toggleColorMode
//   } = useColorMode();
//   const text = useColorModeValue("Light", "Dark");
const CharacterList = () => {
  const { toggleColorMode, colorMode } = useColorMode();
  const text = useColorModeValue("Light", "Dark ")
  const [name, setname] = React.useState("")
  let isDark = colorMode === "dark"
  console.log("colorMode", colorMode)
  const ontoggle = () => {
    // alert("d")
    toggleColorMode()
  }
  const imagepicker = async () => {
    let res = await openDocumentPicker();
    console.log(res)
  }
  return (
    <View flex={1} >
      <HStack style={{ justifyContent: "space-between", paddingHorizontal: 20 }}>
        <Pressable onPress={toggleColorMode}>
          <Text >{text} Mode</Text>
        </Pressable>

        <Switch
          defaultIsChecked={isDark}
          offTrackColor={myColors.primary[500]}
          onTrackColor={myColors.secondary[900]}
          onThumbColor={myColors.primary[100]}
          offThumbColor={myColors.secondary[700]}
          value={isDark}
          onToggle={() => ontoggle()}
        />
      </HStack>
      <Pressable onPress={checkPermission} >
        <Text>check permission for camera</Text>
      </Pressable>
      <Pressable onPress={() => imagepicker()} >
        <Text>pick document</Text>
      </Pressable>
      <SearchBar setname={setname} />
      <ListingView name={name} />
    </View>
  )
}

export default CharacterList