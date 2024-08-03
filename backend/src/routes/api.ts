import express, { Express, Request, Response } from 'express';

import {doAuthCheck, doAuth, fetchProfile} from '../controllers/auth.controller';
import {fetchVideos, postVideo, fetchVideoInfo} from '../controllers/video.controller';

const authRoute = express.Router();
const videoRoute = express.Router();

authRoute.post('/api/checkAuth', doAuthCheck);
authRoute.post('/api/auth', doAuth);
authRoute.get('/api/profile', doAuthCheck, fetchProfile);

videoRoute.get('/api/videos', fetchVideos);
videoRoute.get('/api/videoInfo/:videoUrl', fetchVideoInfo);
videoRoute.post('/api/video', doAuthCheck, postVideo);

export default {
    authRoute,
    videoRoute
}