import React from 'react';
import Static from 'fusion:static';
import { useContent } from 'fusion:content';
import Subheader from '../../private/LN/common/header/subHeader';

const SubHeader = () => {
    const { data: dolar } = useContent({ source: 'dolarSource' }) || {};
    const { weather } = useContent({ source: 'weatherSource' }) || {};

    return (
        <Static id="StaticSubHeader" htmlOnly persistent>
            <Subheader dolar={dolar} weather={weather} />
        </Static>
    );
};

SubHeader.label = 'LN Subheader Home';

export default SubHeader;
