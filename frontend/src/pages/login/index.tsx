import type { NextPage } from "next";
import useUserService from "@modules/user/hooks/useUserService";
import {useEffect} from "react";
import {useRouter} from "next/router";
import LoginContainer from "@modules/user/features/containers/LoginContainer";

const LoginPage: NextPage  = () => {
    const router = useRouter();
    const { selector } = useUserService();

    useEffect(() => {
        if(selector.userState.isAuthenticated) {
            router.push('/')
        }
    }, [selector.userState.isAuthenticated]);

    return (
        <LoginContainer />
    )
};

export default LoginPage;