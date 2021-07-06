import React from 'react';
import { useContent } from 'fusion:content';
import Subheader from '../../private/LN/common/header/subHeader';
import withStatic from '../../private/common/hocs/withStatic';

const SubHeader = () => {
    const { data: dolar } = useContent({ source: 'dolarSource' }) || {};
    const { weather } = useContent({ source: 'weatherSource' }) || {};

    return <Subheader dolar={dolar} weather={weather} />;
};

SubHeader.label = 'LN Subheader Home';

export default withStatic(SubHeader);
