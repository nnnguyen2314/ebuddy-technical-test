import * as React from "react";
import useVideoListService from "@modules/video/hooks/useVideoListService";
import {Avatar, Col, List, Row, Spin, Typography} from "antd";
import {useEffect} from "react";
import VideoList from "@modules/video/features/videoList/components/VideoList";

const { Title } = Typography;

const VideoListContainer = () => {
    const { selector, handleFetchVideoList } = useVideoListService();

    const handleSelectVideo = () => {};

    useEffect(() => {
        handleFetchVideoList();
    }, [handleFetchVideoList]);

    return (
        <div>
            <Row>
                <Col span={24}>
                    <Title level={3}>All Videos</Title>
                </Col>
            </Row>
            <Row>
                <Spin spinning={selector.loading}>
                    <VideoList handleSelectVideo={handleSelectVideo} videoList={selector.videoList} layout="grid" />
                </Spin>
            </Row>
        </div>
    );
};

export default VideoListContainer;