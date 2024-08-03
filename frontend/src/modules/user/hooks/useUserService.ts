import {useAppDispatch, useAppSelector} from "@modules/shared/hooks";
import {shallowEqual} from "react-redux";
import {useCallback} from "react";
import {logout, doAuth, fetchProfile, getUserState} from "@modules/user/store/userSlice";

const useUserService = () => {
    const dispatch = useAppDispatch();
    const selector = {userState: useAppSelector(getUserState, shallowEqual)};

    const handleDoAuth = useCallback((data: any) => {
        return dispatch(doAuth(data));
    }, [dispatch]);

    const handleFetchProfile = useCallback(() => {
        return dispatch(fetchProfile());
    }, [dispatch]);

    const handleDoLogout = useCallback(() => {
        dispatch(logout());
    }, [dispatch])

    return {
        selector,
        handleDoAuth,
        handleFetchProfile,
        handleDoLogout
    }
};

export default useUserService;