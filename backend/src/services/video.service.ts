import firebaseConfigs from '../config/firebaseConfigs';
import {AxiosResponse} from "axios";
import {YOUTUBE_VIDEO_KEY, FETCH_VIDEO_INFO_API_URL} from '../misc/constants';
import axios from 'axios';

const { db } = firebaseConfigs;
const getAllVideos = () => {
    return new Promise((resolve: any) => {
        db
            .collection('videos')
            .get()
            .then((res) => {
                if (res && res.size > 0) {
                    let videos: any[] = [];
                    res.forEach((doc) => {
                        let item = {
                            id: doc.id
                        };
                        videos.push({
                            ...item,
                            ...doc.data()
                        });

                    });
                    resolve({isError: false, data: videos});
                } else {
                    resolve({isError: false, data: []});
                }
            })
            .catch((error) => {
                resolve({isError: true, error: error.code});
            })
    });
};

const getVideoById = (vid: any) => {
    return new Promise((resolve) => {
        db
            .doc(`/videos/${vid}`)
            .get()
            .then((res) => {
                resolve({isError: true, data: res});
            })
            .catch((error: any) => {
                resolve({isError: true, error: error.code});
            });
    });
};

const addVideo = (video: any) => {
    return new Promise((resolve) => {
        db
            .collection('videos')
            .add(video)
            .then((doc) => {
                resolve({isError: false, message: "Video is shared successfully!"});
            })
            .catch((error: any) => {
                resolve({isError: true, error: error.code});
            });
    });
};

const fetchVideoInfoFromYoutube = (videoId: any) => {
    // const videoId = extractYoutubeVideoIdFromURL(url);
    const params = {
        id: videoId,
        key: YOUTUBE_VIDEO_KEY,
        part: 'snippet,contentDetails,statistics,status',
    };

    return new Promise((resolve: any) => {
        axios.get(FETCH_VIDEO_INFO_API_URL, {params})
            .then((res: AxiosResponse<any>) => {
                resolve({isError: false, video: {id: videoId, info: res.data.items[0]}});
            })
            .catch((err: any) => {
                resolve({isError: true, error: err.message});
            })
    })
};

export default { getAllVideos, getVideoById, addVideo, fetchVideoInfoFromYoutube };