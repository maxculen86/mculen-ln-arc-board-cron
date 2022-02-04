/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/require-default-props */

import React from 'react';
import Consumer from 'fusion:consumer';
import PropTypes from 'fusion:prop-types';
import groupBannerConfig from './_utils/groupBannerConfig';
import buildBodyCustomFields from './_utils/buildBodyCustomFields';
import { bodyElementRules } from './_children/_bodyElementRules';
import addEventListener from '../../../private/common/hooks/useEventListener';
import handleScrollForNota from '../../../private/LN/nota/dataLayer/handleScrollForNota';

import Cuerpo from '../../../private/LN/nota/cuerpo';

const body = props => {
    const bannerConfig = groupBannerConfig(props);
    // borrar
    const properties = {
        ...props,
        bannerConfig
    };

    const { bannerConfig: banners, outputType, globalContent } = props;
    const {
        _id,
        headlines: { basic: tituloNota },
        content_elements: contentElements,
        subtype,
        website_url: websiteUrl
    } = globalContent || {};
    const capitalIndex = contentElements.findIndex(v => v.type === 'text');

    console.log(
        '🚀 ~ file: default.jsx ~ line 30 ~ globalContent',
        globalContent
    );

    const renderComponents = contentElements.map((element, currentIndex) => {
        const Component = bodyElementRules({ element, outputType, subtype });

        const extraProps = {
            image: { withZoom: '--zoom' },
            gallery: { withZoom: '--zoom' },
            video: {
                tituloNota,
                primerParrafo:
                    (capitalIndex && contentElements[capitalIndex]) || ''
            }
        };

        const { arcType = '' } = Component || {};

        const _BaseComp = (Component && (
            <Component
                data={element}
                capital={currentIndex === capitalIndex}
                outputType={outputType}
                {...(extraProps[arcType] || {})}
            />
        )) || <></>;

        return _BaseComp;
    });

    console.log('xxxxxxxxccc RESULTS', renderComponents);

    if (typeof window !== 'undefined') {
        addEventListener('scroll', handleScrollForNota, window);
    }

    return (
        <>
            ======== hola soy el cuerpo333 ===========
            {/* <Cuerpo {...properties} /> */}
            {renderComponents}
            ++++++++ hola soy el fin del cuerpo +++++++++++++++
        </>
    );
};

body.propTypes = {
    customFields: PropTypes.shape(buildBodyCustomFields())
};

body.lazy = true;

export default Consumer(body);
