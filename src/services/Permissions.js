// import {check, PERMISSIONS,RESULTS,request } from "react-native-permissions"
import { PermissionsAndroid } from "react-native";

export async function checkPermission() {
    let permission = false
    try {
        const androidPermission = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.CAMERA)
        console.log("permission", androidPermission)
        if (androidPermission) {
            console.log("You can use the camera ");
            permission = true
        } else {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                    title: "Cool Photo App Camera Permission",
                    message:
                        "Cool Photo App needs access to your camera " +
                        "so you can take awesome pictures.",
                    buttonNeutral: "Ask Me Later",
                    buttonNegative: "Cancel",
                    buttonPositive: "OK"
                }
            )
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("You can use the camera :)");
                permission = true
            }
            else if (granted === PermissionsAndroid.RESULTS.BLOCKED) {
                console.log("Camera permission blocked");
            } else {
                console.log("Camera permission denied", granted);
            }
        }

    } catch (error) {
        console.log("Camera permission error", error);
    }

    return permission
}

export const checkPermissionForStorage = async () => {
    try {
        const androidPermission = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE)
        console.log("permission", androidPermission);
        if (androidPermission) {
            console.log("you can access internal storage")
            return true
        } else {
            let granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                {
                    title: "Cool Photo App storage Permission",
                    message:
                        "Cool Photo App needs access to your storage " +
                        "so you can store awesome pictures.",
                    buttonNeutral: "Ask Me Later",
                    buttonNegative: "Cancel",
                    buttonPositive: "OK"
                }
            )
            if (granted == PermissionsAndroid.RESULTS.GRANTED) {
                console.log("DONE! now you can access storage")
                return true
            } else {
                console.log("access denied :(")
            }
        }
    } catch (error) {
        console.log("something went to wrong ", error)
    }
}