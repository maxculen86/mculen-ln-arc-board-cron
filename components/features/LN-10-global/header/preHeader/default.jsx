import React from 'react';
import { useContent } from 'fusion:content';
import Static from 'fusion:static';
import { Brands } from './components/brands';
import { Weather } from './components/weather';
import filterSubHeader from '../../../../../content/filters/LN/home/subHeaderFilter';
import useTermica from '../../../../private/common/hooks/useTermica';
import { setWeatherData } from './__helper';
import PreHeaderEventsScript from '../../../../private/common/scriptManager/PreHeaderEventsScript';
import preHeader from './preHeader.json';

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

    return (
        <Static id="clima-Ln10">
            <div className="ln-pre-header flex ai-center h-48 bg-neutral-light-50 relative --tablet-none">
                <div className="lay-container">
                    <div className="flex ai-center">
                        <Weather weatherData={weatherData} />
                        {preHeader.length > 0 && <Brands brands={preHeader} />}
                    </div>
                </div>
            </div>
            <PreHeaderEventsScript />
        </Static>
    );
};

export default PreHeaderLN;
