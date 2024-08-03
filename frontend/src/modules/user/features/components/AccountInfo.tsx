import React from "react";
import styled from 'styled-components';
import {Button, Space, Typography} from "antd";

const AccountInfoWrapper = styled(Space)`
`;

const { Text, Link, Title } = Typography;

interface AccountInfoPropType {
    userInfo: any,
    handleDoLogout: any
}

const AccountInfo: React.FC<AccountInfoPropType> = (props: AccountInfoPropType) => {
    const { userInfo, handleDoLogout } = props;

    return (
        <AccountInfoWrapper align="center" size="middle">
            <div className="user-info">
                <Space align="center" size="small">
                    <Text>Welcome</Text>
                    <Title level={5} style={{margin: '0'}}>{userInfo?.email}</Title>
                </Space>
            </div>
            <div className="user-actions">
                <Space align="center" size="small">
                    <Link href="/videos/share">Share Video</Link>
                    <Button type="primary" onClick={handleDoLogout}>Logout</Button>
                </Space>
            </div>
        </AccountInfoWrapper>
    );
};

export default AccountInfo;