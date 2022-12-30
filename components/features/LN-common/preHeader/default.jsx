import React from 'react';
import { useContent } from 'fusion:content';
import { Header, PreHeader } from '@ln/contenidos-ui-header/index';
import ComWeather from '../../../private/common/com-weather';
import filterSubHeader from '../../../../content/filters/LN/home/subHeaderFilter';
import useTermica from '../../../private/common/hooks/useTermica';
import StaticContent from '../../../private/common/staticContent';
import '../../../../resources/dist/css/ln/modules/mod-subheader.css';
import '../../../../resources/packages/css/@ln/contenidos-ui-header/index.css';

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

    return (
        <StaticContent tag="section" className="mod-subheader">
            <Header userType="mariana">
                <PreHeader
                    tags={[
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
                        }
                    ]}
                >
                    <PreHeader.Weather
                        weatherData={{
                            place: 'Capital federal',
                            temperature: '14.4º',
                            dataEvent: 'LinkClick',
                            dataSection: 'MenuLN',
                            link: '/clima',
                            callback: () => {
                                console.log('click');
                            }
                        }}
                    />
                </PreHeader>
            </Header>
        </StaticContent>
    );
};

PreHeaderFeature.label = 'LN10 PreHeader';

export default PreHeaderFeature;
