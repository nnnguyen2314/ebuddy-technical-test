import React from "react";
import styled from 'styled-components';
import {Button, Space} from "antd";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

interface UserInfoPropType {
    userInfo: any,
    handleDoLogout: any
}

const settings = ['Profile', 'Account', 'Logout'];

const UserInfo: React.FC<UserInfoPropType> = (props: UserInfoPropType) => {
    const { userInfo, handleDoLogout } = props;

    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end' }}>
            <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography sx={{mr: '10px'}}>Hello, {userInfo?.email}</Typography>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
            </Box>
            <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
            >
                <MenuItem onClick={() => {
                    handleDoLogout();
                    handleCloseUserMenu();
                }}>
                    <Button><Typography textAlign="center">Logout</Typography></Button>
                </MenuItem>
            </Menu>
        </Box>
    );
};

export default UserInfo;