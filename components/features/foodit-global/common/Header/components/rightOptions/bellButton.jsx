import React, { useEffect, useState } from 'react';
import { NotificationsCentre } from '@ln/lib-personalizacion';
import PropTypes from 'fusion:prop-types';
import {
    getPropsBellEvents,
    getPropsBellFoodit,
    hideTooltip
} from './_helpers';
import useAuthManager from '../../../../../../private/common/auth/hooks/useAuthManager';

export function BellButton({ className = '' }) {
    const isCSR = typeof window !== 'undefined';
    const tooltipStorage = isCSR && localStorage?.getItem('tooltip');
    const initialTooltip = tooltipStorage === 'hide' ? tooltipStorage : 'show';
    const [tooltip, setTooltip] = useState(initialTooltip);
    const { token, accessToken } = useAuthManager();
    const [props, setProps] = useState();

    const propsDefault = {
        ...getPropsBellFoodit(),
        ...getPropsBellEvents({ setTooltip }),
        showTooltip: tooltip === 'show'
    };

    useEffect(() => {
        setTimeout(() => {
            hideTooltip(setTooltip);
        }, 3000);
    }, []);

    useEffect(() => {
        if (token && accessToken) {
            setProps({
                userIdToken: token,
                userAccessToken: accessToken,
                ...propsDefault
            });
        }
    }, [token, accessToken, tooltip]);

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

BellButton.propTypes = {
    className: PropTypes.string.isRequired
};
