import React from 'react';
import { notification } from 'antd';

const asyncActionMessages = ({ getState }: any) => {
    return (next: any) => {
        return (action: any) => {
            const { payload } = action;
            if (payload?.data?.isError) {
                notification.error({
                    message: payload?.data?.message || payload?.data?.error,
                    duration: 10,
                    className: 'notification-error'
                });
            }
            return next(action);
        };
    }
}

export default asyncActionMessages;