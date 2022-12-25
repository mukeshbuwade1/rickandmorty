import { ActivityIndicator, ImageBackground, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Colors from '../assets/Colors'
import font from '../assets/font'
import { CommonActions } from '@react-navigation/native'

const SplashScreen = (props) => {
    React.useEffect(() => {
        setTimeout(() => {
            props.navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [
                        { name: "CharacterList" },
                    ],
                })
            );
        }, 1000)
    }, [])
    return (
        <ImageBackground source={require("../assets/images/splashbg.png")} style={styles.box}  >
            <View style={styles.info}>
                <Text style={styles.tx}>Loading App</Text>
                <ActivityIndicator size={"small"} color={Colors.white} />
            </View>
        </ImageBackground >
    )
}

export default SplashScreen

const styles = StyleSheet.create({
    box: {
        flex: 1,
    },
    info: {
        flexDirection: "row",
        position: "absolute",
        top: 20,
        width: "100%",
        justifyContent: "center"
    }
    ,
    tx: {
        fontFamily: font.Lacquer,
        color: Colors.white,
        marginRight: 10

    }
})