import {useCallback} from "react";
import api from "@modules/video/misc/api";
import {extractYoutubeVideoIdFromURL} from "@modules/video/misc/helpers";
import {getVideoState} from "@modules/video/store/videoSlice";
import {useAppSelector} from "@modules/shared/hooks";
import {shallowEqual} from "react-redux";
import {getUserState} from "@modules/user/store/userSlice";

const useVideoDetailService = () => {
    const selector = {videoState: useAppSelector(getVideoState, shallowEqual)};
    const userSelector = {userState: useAppSelector(getUserState, shallowEqual)};
    const handleFetchVideoInfoFromYoutube = useCallback((videoUrl: string) => {
        const videoId = extractYoutubeVideoIdFromURL(videoUrl) || '';

        return new Promise((resolve) => {
            api.fetchVideoInfoFromYoutube(videoId)
                .then((res: any) => {
                    resolve({isError: false, video: {id: videoId, info: res.data.items[0]}});
                })
                .catch((err) => {
                    resolve({isError: true, error: err.message});
                })
        });
    }, []);

    return {
        selector,
        userSelector,
        handleFetchVideoInfoFromYoutube
    }
};

export default useVideoDetailService;