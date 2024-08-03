import type { NextPage } from "next";
import VideoListContainerWithPlaying from "@modules/video/features/videoList/containers/VideoListContainerWithPlaying";
import {useEffect} from "react";
import useUserService from "@modules/user/hooks/useUserService";
import MainLayout from "@modules/shared/features/layout/MainLayout";
import {useRouter} from "next/router";

const IndexPage: NextPage = () => {
    const router = useRouter();
    const { selector } = useUserService();

    useEffect(() => {
        if(!selector.userState.isAuthenticated) {
            router.push('/login');
        }
    }, [selector.userState.isAuthenticated]);

    return (
        <MainLayout>
            <VideoListContainerWithPlaying />
        </MainLayout>
    );
};

export default IndexPage;