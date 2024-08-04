import React, {useEffect, useState} from 'react';
import Container from '@mui/material/Container';
import AppBar from "@mui/material/AppBar";
import useUserService from "@modules/user/hooks/useUserService";
import {useRouter} from "next/router";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import AdbIcon from "@mui/icons-material/Adb";
import Typography from "@mui/material/Typography";
import UserContainer from "@modules/user/features/containers/UserContainer";
import TopNav from "@modules/shared/features/nav/TopNav";

const MainLayout = ({children}: { children: React.ReactNode }) => {
    const { selector, handleFetchProfile } = useUserService();
    useEffect(() => {
        if(selector.userState.isAuthenticated) {
            handleFetchProfile();
        }
    }, [handleFetchProfile, selector.userState.isAuthenticated]);

    return (
        <Container maxWidth="lg">
            <AppBar position="static" color="default" >
                <Toolbar sx={{ display: 'flex', flex: 1 }}>
                    <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                        <AdbIcon sx={{ display: 'flex', mr: 1 }} />
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href="/"
                            sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            EBUDDY
                        </Typography>
                        <TopNav />
                    </Box>
                    <UserContainer />
                </Toolbar>
            </AppBar>
            <main>
                {children}
            </main>
        </Container>
    )
};

export default MainLayout;