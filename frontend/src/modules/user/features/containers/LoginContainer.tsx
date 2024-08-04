import React from "react";
import LoginForm from "@modules/user/features/components/LoginForm";
import useUserService from "@modules/user/hooks/useUserService";
import {useRouter} from "next/router";

const LoginContainer = () => {
    const router = useRouter();
    const { handleDoAuth } = useUserService();

    const handleLogin = (data: any) => {
        handleDoAuth(data).then((res: any) => {
            if (!res?.payload?.data?.isError) {
                router.push('/');
            }
        })
    };

    return <LoginForm handleLogin={handleLogin} />;
};

export default LoginContainer;