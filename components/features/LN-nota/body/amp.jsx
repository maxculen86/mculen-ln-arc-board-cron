/* eslint-disable react/require-default-props */
import React from 'react';
import Consumer from 'fusion:consumer';
import PropTypes from 'fusion:prop-types';
import BuildBody from './_children/_buildBody';
import groupBannerConfig from './_utils/_groupBannerConfig';
import buildBodyCustomFields from './_utils/_buildBodyCustomFields';

const BodyAmp = props => {
    const { outputType, globalContent = {} } = props;
    const banners = groupBannerConfig(props);
    const {
        headlines: { basic: tituloNota },
        content_elements: contentElements,
        subtype: globalSubType,
        website_url: websiteUrl
    } = globalContent || {};

    const renderComponents = BuildBody({
        banners,
        tituloNota,
        contentElements,
        globalSubType,
        outputType,
        globalContent
    });

    return (
        <>
            ======= Soy body en amp ===========
            {renderComponents}
            ++++++++ hola soy el fin del cuerpo AMP +++++++++++++++
        </>
    );
};

export default Consumer(BodyAmp);

BodyAmp.propTypes = {
    // eslint-disable-next-line react/no-unused-prop-types
    customFields: PropTypes.shape(buildBodyCustomFields()),
    outputType: PropTypes.string,
    globalContent: PropTypes.shape({
        subtype: PropTypes.string,
        content_elements: PropTypes.arrayOf(PropTypes.shape())
    })
};
