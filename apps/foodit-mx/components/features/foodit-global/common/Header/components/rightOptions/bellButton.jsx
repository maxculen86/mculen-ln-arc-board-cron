import React, { useEffect, useState } from 'react';
import { NotificationsCentre } from '@ln/lib-personalizacion';
import { getPropsBellEvents, getPropsBellFoodit } from './_helpers';
import useAuthManager from '../../../../../../private/common/auth/hooks/useAuthManager';

export function BellButton({ className = '' }) {
    const isCSR = typeof window !== 'undefined';
    const { token, accessToken } = useAuthManager();
    const [props, setProps] = useState();

    const propsDefault = {
        ...getPropsBellFoodit(),
        ...getPropsBellEvents()
    };

    useEffect(() => {
        if (token && accessToken) {
            setProps({
                userIdToken: token,
                userAccessToken: accessToken,
                ...propsDefault
            });
        }
    }, [token, accessToken]);

    if (!isCSR) {
        return null;
    }

    const propsNotification = token && accessToken ? props : propsDefault;
    return (
        <div className={className}>
            <NotificationsCentre {...propsNotification} />
        </div>
    );
}
export default BellButton;
