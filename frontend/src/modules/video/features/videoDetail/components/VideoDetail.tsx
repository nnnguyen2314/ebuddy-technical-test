import React from "react";
import {Card, Col, Collapse, Image, Row, Space, Tag, Typography} from "antd";
import styled from "styled-components";
import {CaretRightOutlined, DislikeFilled, DislikeOutlined, LikeFilled, LikeOutlined} from "@ant-design/icons";
import Link from "next/link";

const { Meta } = Card;
const { Title, Paragraph } = Typography;

interface VideoDetailProps {
    videoInfo: any;
}

const VideoDetail = (props: VideoDetailProps) => {
    const { videoInfo } = props;
    return (
        <Space
            direction="vertical"
            size="small"
            style={{ display: 'flex', margin: '10px', justifyItems: 'center'}}
        >
            <div>
                <iframe
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    src={`https://youtube.com/embed/${videoInfo?.video?.id}`}
                    width='100%'
                    height='400px'
                    allowFullScreen
                    title={videoInfo?.video?.snippet?.title} />
            </div>
            <div>
                <Link href={`https://youtube.com/embed/${videoInfo?.video?.id}`}>
                    <Title ellipsis={{ rows: 1, tooltip: videoInfo?.video?.snippet?.title }} type="secondary" style={{ margin: 'auto' }} level={5}>
                        {videoInfo?.video?.snippet?.title}
                    </Title>
                </Link>
                {videoInfo?.user && <Typography color="textSecondary">Shared by: {videoInfo?.user}</Typography>}
            </div>
            <div>
                {videoInfo?.video?.statistics && (
                    <Space size="small">
                        <Tag color="#3b5999" icon={videoInfo?.video?.statistics?.likeCount ? <LikeFilled color="#ffffff"/> : <LikeOutlined color="#ffffff" />}>
                            {videoInfo?.video?.statistics?.likeCount || ''}
                        </Tag>
                        <Tag icon={videoInfo?.video?.statistics?.dislikeCount ? <DislikeFilled color="#ffffff"/> : <DislikeOutlined color="#ffffff" />}>
                            {videoInfo?.video?.statistics?.dislikeCount || ''}
                        </Tag>
                    </Space>
                )}
            </div>
            <div>
                <Space size="small" direction="vertical">
                    <Title level={4} style={{margin: 0}}>Description</Title>
                    <div style={{minHeight: '300px', maxHeight: '400px', overflowY: "auto"}}>
                        <Paragraph style={{textAlign: 'justify'}} ellipsis={{ rows: 2, expandable: true, symbol: 'more' }}>
                            {videoInfo?.video?.snippet?.description}
                        </Paragraph>
                    </div>
                </Space>
            </div>
        </Space>
    );
};

export default VideoDetail;