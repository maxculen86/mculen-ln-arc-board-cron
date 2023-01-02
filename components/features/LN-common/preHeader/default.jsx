import React from 'react';
import { useContent } from 'fusion:content';
import { PreHeader } from '@ln/contenidos-ui-preheader';
import filterSubHeader from '../../../../content/filters/LN/home/subHeaderFilter';
import useTermica from '../../../private/common/hooks/useTermica';
import StaticContent from '../../../private/common/staticContent';

import '../../../../resources/packages/css/@ln/contenidos-ui-preheader/index.css';
import '../../../../resources/packages/css/@ln/common-ui-icon/index.css';

const PreHeaderFeature = () => {
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

    const getWeatherInfo = (weatherData = {}) => {
        const { dataService: { locations = [] } = {} } = weatherData;

        const { current_temp: temperature = '', weather: weatherInfo = {} } =
            locations.find(
                ({ location_id: locationId = '' }) =>
                    locationId === 'ciudad-de-buenos-aires'
            ) || {};

        return {
            iconName: weatherInfo.id || '',
            temperature
        };
    };

    const { temperature, iconName } = getWeatherInfo(weatherValue);
    const mock = {
        weather: {
            place: 'Capital federal',
            temperature: '14.4º',
            dataEvent: 'LinkClick',
            dataSection: 'MenuLN',
            link: '/clima',
            callback: e => {
                e.preventDefault();
                console.log('click');
            }
        },
        topics: [
            {
                title: 'esto es un titulo 1',
                link: '/',
                dataEvent: 'LinkClick',
                dataSection: 'MenuLN',
                callback: () => {
                    console.log('click');
                }
            },
            {
                title: 'esto es un titulo 2',
                link: '/',
                dataEvent: 'LinkClick',
                dataSection: 'MenuLN',
                callback: () => {
                    console.log('click');
                }
            },
            {
                title: 'esto es un titulo 3',
                link: '/',
                dataEvent: 'LinkClick',
                dataSection: 'MenuLN',
                callback: () => {
                    console.log('click');
                }
            },
            {
                title: 'esto es un titulo 4',
                link: '/',
                dataEvent: 'LinkClick',
                dataSection: 'MenuLN',
                callback: () => {
                    console.log('click');
                }
            },
            {
                title: 'esto es un titulo 5',
                link: '/',
                dataEvent: 'LinkClick',
                dataSection: 'MenuLN',
                callback: () => {
                    console.log('click');
                }
            }
        ]
    };

    return (
        <StaticContent tag="section">
            <PreHeader>
                <PreHeader.Weather weatherData={mock.weather} />
                <PreHeader.Topics tags={mock.topics} />
            </PreHeader>
        </StaticContent>
    );
};

PreHeaderFeature.label = 'LN10 PreHeader';

export default PreHeaderFeature;
