import axios from "axios";

const { REACT_APP_YOUTUBE_API_KEY } = process.env
const API_URL = "https://www.googleapis.com/youtube/v3/search"
const searchByKeyword = (keyword) => {
        return axios({
            "method": "GET",
            "url": API_URL,
            "params":{
                'part':'snippet',
                'maxResults':'1',
                'key':REACT_APP_YOUTUBE_API_KEY,
                'q':keyword
            }
        })
}
const YoutubeService = {
    searchByKeyword
}
export default YoutubeService;