import React, {useEffect, useState} from "react";
import {Button, Form, Input} from "antd";
import styled from "styled-components";

const StyledVideoSharingForm = styled(Form)`
  .ant-input-affix-wrapper {
    width: 500px;
  }
    .ant-input {
      &.youtube-video-url {
        width: 100%;
      }
    }
`;

interface VideoSharingFormProps {
    handleSharing: any;
    handleLoadingYoutubeUrl: any;
}

const VideoSharingForm = (props: VideoSharingFormProps) => {
    const [form] = Form.useForm();
    const { handleSharing, handleLoadingYoutubeUrl } = props;
    const [youtubeVideoUrl, setYoutubeVideoUrl] = useState('');

    const handleYouTubeUrlChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = evt.target;
        setYoutubeVideoUrl(value);
        handleLoadingYoutubeUrl(value);
    }

    const handleDoSharing = () => {
        handleSharing(youtubeVideoUrl);
    };

    return (
        <StyledVideoSharingForm form={form} layout="inline" onFinish={handleDoSharing}>
            <Form.Item
                name="youtubeVideoUrl"
                validateTrigger="onBlur"
                rules={[
                    {
                        type: 'url',
                        message: 'Please enter correct url format!',
                    },
                    {
                        required: true,
                        message: 'Video Url is required!',
                    },
                ]}
            >
                <Input
                    className="youtube-video-url"
                    type="text"
                    placeholder="Enter a video url from Youtube"
                    onChange={handleYouTubeUrlChange}
                    allowClear
                />
            </Form.Item>
            <Form.Item>
                <Button htmlType="submit" type="primary">Share</Button>
            </Form.Item>
        </StyledVideoSharingForm>
    );
};

export default VideoSharingForm;