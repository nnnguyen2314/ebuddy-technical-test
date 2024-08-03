import React from "react";
import useUserService from "@modules/user/hooks/useUserService";
import AccountInfo from "@modules/user/features/components/AccountInfo";
import LoginForm from "@modules/user/features/components/LoginForm";
import {Spin} from "antd";
import UserInfo from "@modules/user/features/components/UserInfo";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

const UserContainer = () => {
    const { selector, handleDoLogout } = useUserService();

    const render = () => {
        if (selector?.userState?.isAuthenticated) {
            return <UserInfo userInfo={selector.userState.currentUser} handleDoLogout={handleDoLogout} />;
        }
        return <Button href="/login">Login</Button>
    };

    return (
        <Box>
            <Spin spinning={selector.userState.loading}>
                {render()}
            </Spin>
        </Box>
    )
};

export default UserContainer;