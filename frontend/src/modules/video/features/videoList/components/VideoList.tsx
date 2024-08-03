import * as React from "react";
import {Card, Col, List, Space} from "antd";
import VideoListItem from "./VideoListItem";

interface VideoListProps {
    videoList: any[];
    layout: string;
    handleSelectVideo: any;
}

const VideoList: React.FC<VideoListProps> = (props: VideoListProps) => {
    const {videoList, layout, handleSelectVideo} = props;

    const onVideoSelected = (video: any) => {
        if (handleSelectVideo) {
            handleSelectVideo(video);
        }
    };

    const renderList = () => {
        switch (layout) {
            case 'list':
                return (
                    <Card title="All Videos">
                        <div style={{minHeight: '500px', maxHeight: '900px', overflowY: "auto"}}>
                            <Space
                                direction="vertical"
                                size="small"
                                style={{ display: 'flex', justifyItems: 'center' }}
                            >
                                {videoList.map((vid: any, key: number) => {
                                    return (
                                        <div key={key} style={{ cursor: "pointer" }} onClick={(evt) => {
                                            evt.preventDefault();
                                            onVideoSelected(vid);
                                        }}>
                                            <VideoListItem videoData={vid} />
                                        </div>
                                    );
                                })}
                            </Space>
                        </div>
                    </Card>
                );
            case 'grid':
            default:
                return videoList.map((vid, key) => {
                    return (
                        <Col key={key} span={6}>
                            <VideoListItem videoData={vid} />
                        </Col>
                    );
                });
        }
    };

    return renderList();
};

export default VideoList;