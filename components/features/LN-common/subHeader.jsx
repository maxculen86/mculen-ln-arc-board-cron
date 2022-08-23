import React from 'react';
import { useContent } from 'fusion:content';
import Subheader from '../../private/LN/common/header/subHeader';
import useTermica from '../../private/common/hooks/useTermica';
import filter from '../../../content/filters/LN/home/subHeaderFilter';

const SubHeader = () => {
    /**
     * TODO Agregar filter
     * Todo useContent debe contener un filter
     */
    const { data: dollar = [] } =
        useContent({
            source: 'dolarSource',
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
            filter
        }) || {};

    const dollarValue = useTermica('dolar', dollar);
    const weatherValue = useTermica('weather', weather);

    return <Subheader dollar={dollarValue} weather={weatherValue} />;
};

SubHeader.static = true;

SubHeader.label = 'LN Subheader Home';

export default SubHeader;
