/* eslint-disable react/no-danger */
/* eslint-disable react/require-default-props */
import React from 'react';
import { useContent } from 'fusion:content';
import Static from 'fusion:static';
import { PreHeader } from '@ln/contenidos-ui-preheader';
import filterSubHeader from '../../../../../content/filters/LN/home/subHeaderFilter';
import useTermica from '../../../../private/common/hooks/useTermica';
import { setWeatherData, getTopicsFromCustomFields } from './__helper';
import PreHeaderEventsScript from '../../../../private/common/scriptManager/PreHeaderEventsScript';

const PreHeaderLN = () => {
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

    const weatherValue = useTermica('weather', weather);
    const weatherData = setWeatherData(weatherValue);

    // const topics = getTopicsFromCustomFields(customFields);

    const objBrands = [
        {
            text: 'CLUB LN',
            link: '/first-topic',
            dataEvent: 'e_linkclick',
            dataSection: 'MenuLN'
        },
        {
            text: 'LN+ EN VIVO',
            link: '/first-topic',
            dataEvent: 'e_linkclick',
            dataSection: 'MenuLN'
        },
        {
            text: 'FOODIT',
            link: '/first-topic',
            dataEvent: 'e_linkclick',
            dataSection: 'MenuLN'
        },
        {
            text: 'CANCHALLENA',
            link: '/first-topic',
            dataEvent: 'e_linkclick',
            dataSection: 'MenuLN'
        },
        {
            text: 'BONVIVIR',
            link: '/first-topic',
            dataEvent: 'e_linkclick',
            dataSection: 'MenuLN'
        }
    ];

    return (
        <Static id="clima-Ln10">
            <PreHeader>
                <PreHeader.Weather weatherData={weatherData} />
                {/* {topics.length && <PreHeader.Topics tags={topics} />} */}
                {objBrands.map((brand, index) => (
                    <a
                        key={index}
                        href={brand.link}
                        data-event={brand.dataEvent}
                        data-section={brand.dataSection}
                    >
                        {brand.text}
                    </a>
                ))}
            </PreHeader>
            <PreHeaderEventsScript />
        </Static>
    );
};

export default PreHeaderLN;
