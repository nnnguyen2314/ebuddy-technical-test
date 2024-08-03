import {useAppDispatch, useAppSelector} from "@modules/shared/hooks";
import {shallowEqual} from "react-redux";
import {useCallback} from "react";
import {saveVideo, getVideoState} from "@modules/video/store/videoSlice";

const useVideoSharingService = () => {
    const dispatch = useAppDispatch();
    const selector = {videoState: useAppSelector(getVideoState, shallowEqual)};

    const handleSaveVideo = useCallback((data: any) => {
        return dispatch(saveVideo(data));
    }, [dispatch]);

    return {
        selector,
        handleSaveVideo
    }
};

export default useVideoSharingService;