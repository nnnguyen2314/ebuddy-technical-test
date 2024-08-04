import firebase from 'firebase';
import firebaseConfigs from '../config/firebaseConfigs';
import UserCredential = firebase.auth.UserCredential;
import admin from "firebase-admin";
import UserRecord = admin.auth.UserRecord;
import DecodedIdToken = admin.auth.DecodedIdToken;
import AuthResponse from "../entities/AuthResponse";

const { firebaseAppAdmin, db } = firebaseConfigs;


export const checkAuth = async (token: any): Promise<AuthResponse> => {
    return new Promise((resolve) => {
        firebaseAppAdmin
            .auth()
            .verifyIdToken(token)
            .then((decodedToken: DecodedIdToken) => {
                return firebaseAppAdmin.auth().getUser(decodedToken.uid);
            })
            .then((user: UserRecord) => {
                resolve({isError: false, user: user});
            })
            .catch((err: any) => {
                resolve({isError: true, error: err.code});
            });
    });
};
export const doLogin = async (email: string, password: string): Promise<AuthResponse> => {
    return new Promise((resolve) => {
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then((data: UserCredential) => {
                console.log(data);
                return data.user?.getIdToken();
            })
            .then((token) => {
                resolve({isError: false, token});
            })
            .catch((err) => {
                resolve({ isError: true, error: err.code });
            });
    });
};
export const doSignUp = async (email: string, password: string): Promise<AuthResponse> => {
    let userId: string | undefined, token: string | undefined;
    return new Promise((resolve) => {
        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then((data: UserCredential) => {
                userId = data.user?.uid;
                return data.user?.getIdToken();
            })
            .then((idtoken: string | undefined) => {
                token = idtoken;
                const userCredentials = {
                    email: email,
                    createdAt: new Date().toISOString(),
                    userId
                };
                return db
                    .doc(`/users/${userId}`)
                    .set(userCredentials);
            })
            .then(()=>{
                resolve({isError: false, token});
            })
            .catch((err) => {
                resolve({ isError: true, error: err.code });
            });
    });
};
export const doFetchProfile = async (uid: string) => {
    return new Promise((resolve) => {
        firebaseAppAdmin
            .auth()
            .getUser(uid)
            .then((userRecord: UserRecord) => {
                resolve({isError: false, user: userRecord});
            })
            .catch((err: any) => {
                resolve({ isError: true, error: err.code });
            });
    });
};
export const checkUserExistByEmail = async (email: string): Promise<AuthResponse> => {
    return new Promise((resolve) => {
        firebaseAppAdmin.auth().getUserByEmail(email)
            .then((user) => {
                resolve({ isError: false, doesExist: true, user });
            })
            .catch((err) => {
                resolve({ isError: true, error: err.code });
            });
    });
};
