/* eslint-disable react/no-danger */
/* eslint-disable react/require-default-props */
import React from 'react';
import { useContent } from 'fusion:content';
import Static from 'fusion:static';
import { Brands } from './components/brands';
import { Weather } from './components/weather';
import IconSprite from '../../../private-global/common/iconSprite/IconSprite';
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
            title: 'CLUB LN',
            link: '/first-topic',
            dataEvent: 'e_linkclick',
            dataSection: 'MenuLN',
            icon: <IconSprite name="clubLnDefault" critical fill="#333333" />
        },
        {
            title: 'LN+ EN VIVO',
            link: '/first-topic',
            dataEvent: 'e_linkclick',
            dataSection: 'MenuLN',
            icon: <IconSprite name="lnMas" critical fill="#333333" />
        },
        {
            title: 'FOODIT',
            link: '/first-topic',
            dataEvent: 'e_linkclick',
            dataSection: 'MenuLN',
            icon: <IconSprite name="foodit" critical fill="#333333" />
        },
        {
            title: 'CANCHALLENA',
            link: '/first-topic',
            dataEvent: 'e_linkclick',
            dataSection: 'MenuLN',
            icon: <IconSprite name="canchallena" critical fill="#333333" />
        },
        {
            title: 'BONVIVIR',
            link: '/first-topic',
            dataEvent: 'e_linkclick',
            dataSection: 'MenuLN',
            icon: <IconSprite name="bonvivir" critical fill="#333333" />
        }
    ];

    return (
        <Static id="clima-Ln10">
            <div className="ln-pre-header flex ai-center h-48 bg-neutral-light-50 relative --tablet-none">
                <div className="lay-container">
                    <div className="flex ai-center">
                        <Weather weatherData={weatherData} />
                        {objBrands.length && <Brands brands={objBrands} />}
                    </div>
                </div>
            </div>
            <PreHeaderEventsScript />
        </Static>
    );
};

export default PreHeaderLN;
