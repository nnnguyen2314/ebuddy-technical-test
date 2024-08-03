const { getAllVideos, addVideo, fetchVideoInfoFromYoutube } = require('../services/video.service');

export const fetchVideos = (request: any, response: any, next: any) => {
    getAllVideos()
        .then((data: any) => {
            return response.status(200).json(data);
        })
        .catch((err: any) => {
            return response.status(500).json({ error: err});
        });
};

export const postVideo = (request: any, response: any, next: any) => {
    addVideo(request.body)
        .then((data: any) => {
            return response.status(200).json(data);
        })
        .catch((err: any) => {
            return response.status(500).json({ error: err});
        });
};

export const fetchVideoInfo = (request: any, response: any, next: any) => {
    const videoId = request.params.Id;
    fetchVideoInfoFromYoutube(videoId)
        .then((data: any) => {
            return response.status(200).json(data);
        })
        .catch((err: any) => {
            return response.status(500).json({ error: err});
        });
};
