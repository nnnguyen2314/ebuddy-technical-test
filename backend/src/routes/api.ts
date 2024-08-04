import express from 'express';

import {doAuthCheck, doAuth, fetchProfile} from '../controllers/auth.controller';
import { doGetListAllUsers, doUpdateUser } from '../controllers/user.controller';

const authRoute = express.Router();
const userRoute = express.Router();

authRoute.post('/api/checkAuth', doAuthCheck);
authRoute.post('/api/auth', doAuth);
authRoute.get('/api/profile', doAuthCheck, fetchProfile);

userRoute.get('/api/users', doGetListAllUsers);
userRoute.put('/api/user/:id', doAuthCheck, doUpdateUser);

export default {
    authRoute,
    userRoute
}