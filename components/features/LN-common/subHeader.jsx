import React from 'react';
import { useContent } from 'fusion:content';
import Subheader from '../../private/LN/common/header/subHeader';
import useTermica from '../../private/common/hooks/useTermica';

const SubHeader = () => {
    const { data: dollar = [] } = useContent({ source: 'dolarSource' }) || {};
    const { weather = {} } = useContent({ source: 'weatherSource' }) || {};

    const dollarValue = useTermica('dolar', dollar);
    const weatherValue = useTermica('weather', weather);

    return <Subheader dollar={dollarValue} weather={weatherValue} />;
};

SubHeader.static = true;

SubHeader.label = 'LN Subheader Home';

export default SubHeader;
