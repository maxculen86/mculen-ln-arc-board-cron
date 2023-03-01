/* eslint-disable react/no-danger */
/* eslint-disable react/require-default-props */
import React from 'react';
import { useContent } from 'fusion:content';
import PropTypes from 'fusion:prop-types';
import { PreHeader } from '@ln/contenidos-ui-preheader';
import filterSubHeader from '../../../../content/filters/LN/home/subHeaderFilter';
import useTermica from '../../../private/common/hooks/useTermica';
import {
    setWeatherData,
    getTopicsFromCustomFields,
    setTopicsCustomFields
} from './_helper';

import '../../../../resources/packages/css/@ln/contenidos-ui-preheader/index.css';
import '../../../../resources/packages/css/@ln/common-ui-icon/index.css';
import PreHeaderEventsScript from '../../../private/common/scriptManager/PreHeaderEventsScript';
import StaticContent from '../../../private/common/staticContent';

const PreHeaderFeature = ({ customFields = {} }) => {
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

    const topics = getTopicsFromCustomFields(customFields);

    return (
        <StaticContent>
            <PreHeader>
                <PreHeader.Weather weatherData={weatherData} />
                <PreHeader.Topics tags={topics} />
            </PreHeader>
            <PreHeaderEventsScript />
        </StaticContent>
    );
};

PreHeaderFeature.label = 'LN10 PreHeader';

PreHeaderFeature.propTypes = {
    customFields: PropTypes.shape({
        ...(setTopicsCustomFields() || {})
    }).isRequired
};

export default PreHeaderFeature;
