import OriginalAxios from 'axios';
import CustomAxios from '@modules/shared/middlewares/customAxios';
import {VIDEO_LIST_API_URL, VIDEO_DETAIL_API_URL, VIDEO_CREATE_API_URL, YOUTUBE_VIDEO_KEY, FETCH_VIDEO_INFO_API_URL} from './constants';

const api = {
    fetchVideos: () => CustomAxios.get(VIDEO_LIST_API_URL),
    addVideo: (data: any) => CustomAxios.post(VIDEO_CREATE_API_URL, data),
    fetchVideoInfoFromYoutube: (videoId: string) => {
        const params = {
            id: videoId,
            key: YOUTUBE_VIDEO_KEY,
            part: 'snippet,contentDetails,statistics,status',
        };

        return OriginalAxios.get(FETCH_VIDEO_INFO_API_URL, {params});
    }
};

export default api;
