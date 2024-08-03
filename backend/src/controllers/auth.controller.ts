import { validateLoginData } from '../utils/validators';
import { checkAuth, checkUserExistByEmail, doLogin, doSignUp, doFetchProfile } from '../services/auth.service';
import admin from "firebase-admin";
import UserRecord = admin.auth.UserRecord;

export const doAuth = async (request: any, response: any): Promise<any> => {
    const user = {
        email: request.body.email,
        password: request.body.password
    };

    const {valid, errors} = validateLoginData(user);
    if (!valid) {
        return response.status(400).json(errors);
    }

    const existing = await checkUserExistByEmail(user.email);

    let authResult = await (existing && existing.doesExist ? doLogin(user.email, user.password) : doSignUp(user.email, user.password));
        if (!authResult?.isError) {
        return response.status(200).json({ isError: authResult.isError, token: authResult.token });
    }

    switch(authResult.error) {
        case 'auth/invalid-credential':
        case 'auth/id-token-expired':
        case 'auth/id-token-revoked':
        case 'auth/invalid-email':
        case 'auth/invalid-email-verified':
        case 'auth/invalid-id-token':
        case 'auth/invalid-password':
        case 'auth/invalid-password-hash':
        case 'auth/invalid-password-salt':
        case 'auth/invalid-uid':
        case 'auth/user-not-found':
            return response.status(403).json({ isError: authResult.isError, error: 'wrong credentials, please try again'});
        case 'auth/internal-error':
        default:
            console.log(authResult.error);
            return response.status(500).json({ isError: authResult.isError, error: 'Something went wrong!' });
    }
};
export const doAuthCheck = async (request: any, response: any, next: any) => {
    const headerToken = request.headers.authorization;
    if (!headerToken) {
        return response.json({ isError: true, message: "No token provided" }).status(401);
    }
    if (headerToken && headerToken.split(" ")[0] !== "Bearer") {
        response.json({ isError: true, message: "Invalid token" }).status(401);
    }
    const token = headerToken.split(' ')[1];
    const authCheckingResult = await checkAuth(token);

    if (authCheckingResult.isError) {
        return response.status(403).json({isError: authCheckingResult.isError, error: authCheckingResult.error});
    }
    request['user'] = {
        email: authCheckingResult?.user?.email,
        uid: authCheckingResult?.user?.uid
    };

    return next();
};
export const fetchProfile = (request: any, response: any) => {
    doFetchProfile(request.user.uid)
        .then((userRecord: any) => {
            if(userRecord) {
                return response.status(200).json({isError: false, user: userRecord?.user });
            }
            return response.status(204).json({});
        })
        .catch((error) => {
            console.error(error);
            return response.status(500).json({ isError: true, error: error });
        });
};