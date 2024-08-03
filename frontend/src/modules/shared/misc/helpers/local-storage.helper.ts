import jsCookie from 'js-cookie';
import _ from "lodash";
import {ACCESS_TOKEN_KEY, USER_PROFILE_KEY} from "@modules/shared/misc/constants";

export enum StorageKey {
    AccessToken = "access_token",
    UserInfo = "user_info"
}

export class LocalStorage {
    static getAccessToken() {
        return jsCookie.get(ACCESS_TOKEN_KEY) || null;
    }

    static setAuthentication(token: string) {
        return jsCookie.set(ACCESS_TOKEN_KEY, token);
    }

    static setUserProfile(user: object) {
        return jsCookie.set(USER_PROFILE_KEY, JSON.stringify(user));
    }

    static getUserProfile() {
        return jsCookie.get(USER_PROFILE_KEY)
            ? JSON.parse(jsCookie.get(USER_PROFILE_KEY) || '')
            : null;
    }

    static getAuthenticationInfo() {
        return {
            access_token: this.getAccessToken() || null,
            user: jsCookie.get(USER_PROFILE_KEY)
                ? JSON.parse(jsCookie.get(USER_PROFILE_KEY) || '')
                : null,
        };
    }

    static isAuthenticated() {
        return !_.isEmpty(this.getAccessToken());
    }

    static revokeAuthentication() {
        jsCookie.remove(ACCESS_TOKEN_KEY);
        jsCookie.remove(USER_PROFILE_KEY);
    }
};