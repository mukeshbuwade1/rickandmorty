import Constants from '../assets/Constants';

const APIService =
{
    getData: async (endPoint) => {
        let url = Constants.base_url + endPoint
        console.log("url", url)
        let res = await fetch(url)
            .then(res => res.json())
            .then(json => {
                return json
            })
            .catch(e => {              
                return { error: true, errMsg: e }
            })
        return res
    }
}

export default APIService;

