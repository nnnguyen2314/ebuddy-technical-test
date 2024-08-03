import {useAppDispatch, useAppSelector} from "@modules/shared/hooks";
import {shallowEqual} from "react-redux";
import {useCallback} from "react";
import {fetchVideoList, getVideoState} from "@modules/video/store/videoSlice";

const useVideoListService = () => {
    const dispatch = useAppDispatch();
    const selector = useAppSelector(getVideoState, shallowEqual);

    const handleFetchVideoList = useCallback(() => {
        return dispatch(fetchVideoList());
    }, [dispatch]);

    return {
        selector,
        handleFetchVideoList
    }
};

export default useVideoListService;