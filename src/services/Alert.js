import { Alert, ToastAndroid, Platform, Image } from 'react-native';
import Colors from '../assets/Colors';
import Constants from '../assets/Constants';
import { Popup, Toast } from 'popup-ui' 
//to use popup ui we need to change index file(node_modules\popup-ui\src\basic\Popup\index.js)
// import { ViewPropTypes } from 'deprecated-react-native-prop-types' <----add this line 

export default {
   
    showAlert: (type, msg, callBackFunction) => {
        // console.log('showAlert')
        Popup.show({
            type: type,
            title:  "Alert",
            //button: tue,
            textBody: msg,
            buttonText: "Ok",
            callback: () => {
                if (callBackFunction) { callBackFunction(); Popup.hide() } else Popup.hide()
            }
        })
    },

   
    showToast: (msg, type) => {

        if (Platform.OS === 'ios') {
            Toast.show({
                //title: 'Alert',
                text: msg,
                color: type == Constants.success ? Colors.primary : type == Constants.warning ? Colors.yellow : type == Constants.danger ? Colors.red : Colors.white,
                //type: 'Success',
                timing: 3000,
            })
        }
        else {
            ToastAndroid.show(msg, ToastAndroid.SHORT);
        }
    },


}