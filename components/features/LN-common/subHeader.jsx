import React from 'react';
import { useContent } from 'fusion:content';
import Static from 'fusion:static';
import Subheader from '../../private/LN/common/header/subHeader';
import useTermica from '../../private/common/hooks/useTermica';

const SubHeader = () => {
    const { data: dollar = [] } = useContent({ source: 'dolarSource' }) || {};
    const weather =
        useContent({
            source: 'servicesSource',
            query: {
                id: '/clima',
                service: 'clima'
            }
        }) || {};

    const dollarValue = useTermica('dolar', dollar);
    const weatherValue = useTermica('weather', weather);

    return (
        <Static id="StaticSubHeader" htmlOnly persistent>
            <Subheader dollar={dollarValue} weather={weatherValue} />
        </Static>
    );
};

SubHeader.label = 'LN Subheader Home';

export default SubHeader;
