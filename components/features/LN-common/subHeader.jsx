import React from 'react';
import { useContent } from 'fusion:content';
import SubHeather from '../../private/LN/common/header/subHeather';

const SubHeader = () => {
    const { data: dolar } = useContent({ source: 'dolarSource' }) || {};
    const { weather } = useContent({ source: 'weatherSource' }) || {};

    return <SubHeather dolar={dolar} weather={weather} />;
};

SubHeader.label = 'LN Subheader Home';

export default SubHeader;
