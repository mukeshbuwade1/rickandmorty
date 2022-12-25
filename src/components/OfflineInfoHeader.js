import { StatusBar,  Text, View } from 'react-native'
import React from 'react'
import NetInfo from "@react-native-community/netinfo";
import Colors from '../assets/Colors';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';

const OfflineInfoHeader = () => {
    const [netInfo, setNetInfo] = React.useState({isConnected:true})

    console.log("Network Status--> Is connected:", netInfo.isConnected, ", Connection type:", netInfo.type, ", MaxSpeed:", netInfo?.details?.rxLinkSpeed, "Mbps");

    // const {network}=useSelector(state=> state)
    // console.log("network check",network)

    React.useEffect(() => {
        // Subscribe
        const unsubscribe = NetInfo.addEventListener(state => setNetInfo(state));

        // Unsubscribe
        return () => unsubscribe();
    }, [])


    return (
        <View>
            <StatusBar backgroundColor={!netInfo?.isConnected ? Colors.danger : Colors.cardBg} />
            {
                !netInfo?.isConnected && <View style={{
                    backgroundColor: Colors.danger,
                    flexDirection: "row",
                    justifyContent: "center", alignItems: "center",
                    paddingBottom: 2
                }} >
                    <Text style={{ color: Colors.white,fontWeight:"600", marginRight: 5,  fontSize:12 }} >You are not connected to internet</Text>
                    <Icon name="wifi-off" size={15} color={Colors.white} />
                </View>
            }
        </View>
    )
}

export default OfflineInfoHeader