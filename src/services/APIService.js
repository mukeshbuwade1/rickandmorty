// import Constants from "../Constants/Constants";
import axios from 'axios';
// import AsyncStorageService from "./AsyncStorageService";
// import RNRestart from 'react-native-restart';
// import Alert from '../Components/Alert'

const APIService =
{

    getData: async (endPoint) => {
        let url = Constants.base_url + endPoint;
       
        try {
            response = await axios.get(url);
            if (response?.data?.success) {
                return response;
            } else {
                response['data'] = response;
                response['errorMsg'] = (Constants.labels_for_non_react_files.something_went_wrong ? Constants.labels_for_non_react_files.something_went_wrong : "Something went wrong !!")
                return response;
            }
        }
        catch (error) {

            response['data'] = error?.response?.data;
            response['errorMsg'] = error?.response?.data?.message ?? Constants.labels_for_non_react_files.something_went_wrong
          
            return response;
        }
    },


   
}

export default APIService;

