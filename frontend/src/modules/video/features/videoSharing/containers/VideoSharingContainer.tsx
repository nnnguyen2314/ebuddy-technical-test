import React, {useState} from "react";
import {Card, Col, notification, Row, Space, Spin, Typography} from "antd";
import VideoSharingForm from "@modules/video/features/videoSharing/components/VideoSharingForm";
import useVideoDetailService from "@modules/video/hooks/useVideoDetailService";
import VideoDetail from "@modules/video/features/videoDetail/components/VideoDetail";
import styled from "styled-components";
import useVideoSharingService from "@modules/video/hooks/useVideoSharingService";
import {useRouter} from "next/router";

const { Title } = Typography;

const VideoSharingWrapper = styled(Row)`
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  padding: 10px 0;
  
  .video-sharing-title-wrapper {
    display: flex;
    justify-content: center;
    
  }
  .video-sharing-form-wrapper {
    display: flex;
    justify-content: center;
    margin: 0 auto 30px auto;
  }
`;

const VideoSharingContainer = () => {
    const router = useRouter();
    const [isLoadingYoutubeVideo, setIsLoadingYoutubeVideo] = useState(false);
    const [youtubeUrl, setYoutubeUrl] = useState('');
    const [youtubeVideoInfo, setYoutubeVideoInfo] = useState(null) as any;
    const {handleFetchVideoInfoFromYoutube, selector, userSelector} = useVideoDetailService();
    const {handleSaveVideo} = useVideoSharingService();

    const handleLoadingYoutubeUrl = async (youtubeVideoUrl: string) => {
        setIsLoadingYoutubeVideo(true);
        if (youtubeVideoUrl) {
            handleFetchVideoInfoFromYoutube(youtubeVideoUrl)
                .then((res: any) => {
                    setIsLoadingYoutubeVideo(false);
                    if (!res?.isError) {
                        const info: any = {
                            user: userSelector.userState?.currentUser?.email,
                            videUrl: youtubeUrl,
                            video: res?.video?.info
                        }
                        setYoutubeUrl(youtubeVideoUrl);
                        setYoutubeVideoInfo(info);
                    } else {
                        notification.error({
                            message: res?.error,
                            duration: 10,
                            className: 'notification-error'
                        });
                    }
                })
                .catch((err) => {
                    setIsLoadingYoutubeVideo(false);
                    notification.error({
                        message: err.message,
                        duration: 10,
                        className: 'notification-error'
                    });
                })
        } else {
            setIsLoadingYoutubeVideo(false);
            setYoutubeVideoInfo(null);
        }
    };

    const handleSharing = () => {
        handleSaveVideo({
            user: userSelector?.userState?.currentUser?.email,
            videoUrl: youtubeUrl,
            video: youtubeVideoInfo,
        }).then((res: any) => {
            if (!res?.payload?.data?.isError) {
                notification.success({
                    message: res?.payload?.data?.message || 'Successfully!',
                    duration: 10,
                    description: (<div>The video {youtubeVideoInfo?.video?.snippet?.title} was shared success fully by {userSelector?.userState?.currentUser?.email}</div>),
                    className: 'notification-success'
                });
                router.push('/');
            }
        }).catch((err) => {
            notification.error({
                message: err.message,
                duration: 10,
                className: 'notification-error'
            });
        });
    };

    return (
        <VideoSharingWrapper>
            <Col xs={24} sm={18} md={16} lg={12}>
                <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
                    <div className="video-sharing-title-wrapper">
                        <Title level={5}>Share your favourite video</Title>
                    </div>
                    <div className="video-sharing-form-wrapper">
                        <Spin spinning={selector.videoState.loading}>
                            <VideoSharingForm handleSharing={handleSharing} handleLoadingYoutubeUrl={handleLoadingYoutubeUrl} />
                        </Spin>
                    </div>
                </Space>
                <Row>
                    <Col span={24}>
                        <div className="video-preview-wrapper">
                            <Spin spinning={isLoadingYoutubeVideo}>
                                {youtubeVideoInfo && <VideoDetail videoInfo={youtubeVideoInfo} />}
                            </Spin>
                        </div>
                    </Col>
                </Row>
            </Col>
        </VideoSharingWrapper>
    );
};

export default VideoSharingContainer;