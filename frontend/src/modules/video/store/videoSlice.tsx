import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import api from "@modules/video/misc/api";
import {get} from "lodash";

export interface VideoState {
    videoList: any[];
    loading: boolean;
    message: string;
};

export const stateKey = 'video';

const initialState = {
    videoList: [],
    loading: false,
    message: ''
};

export const fetchVideoList = createAsyncThunk(
    'VIDEO/FETCH_VIDEO_LIST',
    async () => {
        return await api.fetchVideos();
    });

export const saveVideo = createAsyncThunk(
    'VIDEO/SAVE_VIDEO',
    async (data: any) => {
        return await api.addVideo(data);
    });

export const videoSlice = createSlice({
    name: stateKey,
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder.addCase(fetchVideoList.pending, (state: VideoState, action):void => {state.loading = true})
        builder.addCase(fetchVideoList.fulfilled, (state: VideoState, action):void => {
            const videoListData = action?.payload?.data;
            state.videoList = videoListData?.data || [];
            state.loading = false;
            state.message = 'Request Successfully!';
        })
        builder.addCase(fetchVideoList.rejected, (state: VideoState, action):void => {
            state.loading = false;
            state.message = 'Request Failed!';
        })
        builder.addCase(saveVideo.pending, (state: VideoState, action):void => {state.loading = true})
        builder.addCase(saveVideo.fulfilled, (state: VideoState, action):void => {
            state.loading = false;
            state.message = 'Request Successfully!';
        })
        builder.addCase(saveVideo.rejected, (state: VideoState, action):void => {
            state.loading = false;
            state.message = 'Request Failed!';
        })
    }
});

export const getVideoState = (state: VideoState) => {
    const videoState = get(state, stateKey, initialState);
    const videoList = get(videoState, 'videoList', initialState.videoList || []);
    const loading = get(videoState, 'loading', initialState.loading);
    const message = get(videoState, 'message', initialState.message);

    return {
        videoList,
        loading,
        message
    };
};

export default videoSlice.reducer;