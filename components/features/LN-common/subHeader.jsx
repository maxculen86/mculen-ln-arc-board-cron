import React from 'react';
import { useContent } from 'fusion:content';
import Subheader from '../../private/LN/common/header/subHeader';
import useTermica from '../../private/common/hooks/useTermica';
import filterSubHeader from '../../../content/filters/LN/home/subHeaderFilter';
import filterDolar from '../../../content/filters/LN/services/dolar';

const SubHeader = () => {
    const { data: dollar = [] } =
        useContent({
            source: 'dolarSource',
            filter: filterDolar,
            staticMode: true
        }) || {};

    const weather =
        useContent({
            source: 'servicesSource',
            query: {
                id: '/clima',
                service: 'clima'
            },
            staticMode: true,
            filter: filterSubHeader
        }) || {};

    const dollarValue = useTermica('dolar', dollar);
    const weatherValue = useTermica('weather', weather);

    return <Subheader dollar={dollarValue} weather={weatherValue} />;
};

SubHeader.static = true;

SubHeader.label = 'LN Subheader Home';

export default SubHeader;
