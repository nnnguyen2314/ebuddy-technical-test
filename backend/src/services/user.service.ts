import firebase from 'firebase';
import firebaseConfigs from '../config/firebaseConfigs';
import admin from "firebase-admin";

const { firebaseAppAdmin, db } = firebaseConfigs;

export const getAllUsers = () => {
    return new Promise((resolve) => {
        admin
            .auth()
            .listUsers()
            .then((listUsers) => {
                return listUsers.users.map((usr) => {
                    const customClaims = (usr.customClaims || { role: '' });
                    const role = customClaims.role ? customClaims.role : '';
                    if (role === 'employee' || role === '') {
                        return {
                            uid: usr.uid,
                            email: usr.email || '',
                            phoneNumber: usr.phoneNumber || '',
                            displayName: usr.displayName || '',
                            status: usr.disabled,
                            role
                        }
                    }
                });
            })
            .then((users) => {
                resolve({isError: false, data: users});
            })
            .catch((err) => {
                resolve({isError: true, error: err.code});
            });
    });
};
export const getUserDetails = ({ uid }) => {
    return new Promise((resolve) => {
        admin
            .auth()
            .getUser(uid)
            .then((userRecord) => {
                const user = {
                    uid: userRecord.uid,
                    displayName: userRecord.displayName,
                    email: userRecord.email,
                    phoneNumber: userRecord.phoneNumber
                };
                resolve({isError: false, user});
            })
            .catch((err) => {
                resolve({isError: true, error: err.code});
            });
    });
};

export const createUser = async ({ displayName, phoneNumber, email, status }) => {
    let uid;
    return new Promise((resolve) => {
        admin
            .auth()
            .createUser({
                displayName,
                email,
                phoneNumber,
                emailVerified: true,
                disabled: status || false
            })
            .then((userRecord) => {
                uid = userRecord.uid;
                firebase.auth().sendPasswordResetEmail(userRecord.email);
                return admin.auth().getUser(uid);
            })
            .then((user) => {
                resolve({isError: false, data: user});
            })
            .catch((err) => {
                resolve({isError: true, error: err.code});
            });
    });
};
export const deleteUser = async ({ uid }) => {
    return new Promise((resolve) => {
        admin
            .auth()
            .deleteUser(uid)
            .then(() => {
                resolve({isError: false, message: 'successfully!'});
            })
            .catch((err) => {
                resolve({isError: true, error: err.code});
            });
    });
};
export const updateUser = async (user) => {
    const { uid } = user;
    const existingUser = await admin.auth().getUser(uid);
    return new Promise((resolve) => {
        admin
            .auth()
            .updateUser(user.uid, {
                ...existingUser,
                ...user
            })
            .then(() => {
                resolve({isError: false, data: user});
            })
            .catch((err) => {
                resolve({isError: true, error: err.code});
            });
    });
};