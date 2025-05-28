import {FETCH_INFO_DETAIL, FETCH_YOUTUBE_FIND} from "./types";

export const fetchYoutubeFind = (fd) => async dispatch => {
        try {
            const response = await fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=28&q=${fd}&type=video&key=AIzaSyAKQ2OSuixBSrVCUorVhH8ObJYAnOM-rwY`)

            const result = await response.json();
            const action={
                type:FETCH_YOUTUBE_FIND,
                payload:result.items
            }
            console.log(result.items);
            dispatch(action)
        } catch (error) {
            console.log(error);
        }


}