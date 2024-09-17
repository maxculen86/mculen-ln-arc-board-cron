import React, { useEffect, useState } from 'react';
import { NotificationsCentre } from '@ln/lib-personalizacion';
import { getPropsBellDefault, getPropsBellEvents } from './_helpers';
import { useGetPropsBellAuth } from '../../hooks/useGetPropsBellAuth';

export const BellButton = () => {
    const isCSR = typeof window !== 'undefined';
    const tooltipStorage = isCSR && localStorage?.getItem('tooltip');
    const initialTooltip = tooltipStorage === 'hide' ? tooltipStorage : 'show';
    const [tooltip, setTooltip] = useState(initialTooltip);

    useEffect(() => {
        setTimeout(() => {
            hideTooltip();
        }, 3000);
    }, []);

    const hideTooltip = () => {
        setTooltip('hide');
        localStorage?.setItem('tooltip', 'hide');
    };

    const props = {
        ...getPropsBellDefault(),
        ...useGetPropsBellAuth(),
        ...getPropsBellEvents({ hideTooltip }),
        showTooltip: tooltip === 'show'
    };

    if (!isCSR) {
        return <></>;
    }
    return <NotificationsCentre {...props} />;
};
export default BellButton;
