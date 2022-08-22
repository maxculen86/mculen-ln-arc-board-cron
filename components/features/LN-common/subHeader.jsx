import React from 'react';
import { useContent } from 'fusion:content';
import Subheader from '../../private/LN/common/header/subHeader';
import useTermica from '../../private/common/hooks/useTermica';

const SubHeader = () => {
    const { data: dollar = [] } =
        useContent({ source: 'dolarSource', staticMode: true }) || {};
    const { weather = {} } =
        useContent({ source: 'weatherSource', staticMode: true }) || {};

    const dollarValue = useTermica('dolar', dollar);
    const weatherValue = useTermica('weather', weather);

    return <Subheader dollar={dollarValue} weather={weatherValue} />;
};

SubHeader.static = true;

SubHeader.label = 'LN Subheader Home';

export default SubHeader;
