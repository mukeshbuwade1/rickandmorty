import axios from 'axios';
import Constants from '../assets/Constants';
// import AsyncStorageService from "./AsyncStorageService";
// import RNRestart from 'react-native-restart';
// import Alert from '../Components/Alert'

const APIService =
{
    getData: async (endPoint) => {
        let url = Constants.base_url + endPoint;

        try {
            let response = await axios.get(url);
            if (response?.results) {
                return response;
            } else {
                response['data'] = response;
                response['errorMsg'] = "Something went wrong !!"
                return response;
            }
        }
        catch (error) {
            console.log("error",error)
            response['data'] = error?.response?.data;
            response['errorMsg'] = error?.response?.data?.message ?? Constants.labels_for_non_react_files.something_went_wrong

            return response;
        }
    },



}

export default APIService;

