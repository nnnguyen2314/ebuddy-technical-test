import {NextPage} from "next";
import MainLayout from "@modules/shared/features/layout/MainLayout";
import VideoSharingContainer from "@modules/video/features/videoSharing/containers/VideoSharingContainer";
import useUserService from "@modules/user/hooks/useUserService";
import {useEffect} from "react";
import {useRouter} from "next/router";

const VideoSharePage: NextPage = () => {
    const router = useRouter();
    const { selector } = useUserService();

    useEffect(() => {
        if(!selector.userState.isAuthenticated) {
            router.push('/login');
        }
    }, [selector.userState.isAuthenticated]);
    return (
        <MainLayout>
            <VideoSharingContainer />
        </MainLayout>
    );
};

export default VideoSharePage;