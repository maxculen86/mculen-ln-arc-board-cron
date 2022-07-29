/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import Static from 'fusion:static';
import Subheader from '../../private/LN/common/header/subHeader';
import useTermica from '../../private/LN/common/hooks/useTermica';

const SubHeader = () => {
    const dollar = useTermica({ name: 'dolar', responseKey: 'data' });
    const weather = useTermica({ name: 'weather' });

    return (
        <Static id="StaticSubHeader" htmlOnly persistent>
            <Subheader dollar={dollar} weather={weather} />
        </Static>
    );
};

SubHeader.label = 'LN Subheader Home';

export default SubHeader;
