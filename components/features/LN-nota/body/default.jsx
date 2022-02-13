/* eslint-disable react/require-default-props */
import React, { useEffect } from 'react';
import Consumer from 'fusion:consumer';
import PropTypes from 'fusion:prop-types';
import groupBannerConfig from './_utils/_groupBannerConfig';
import buildBodyCustomFields from './_utils/_buildBodyCustomFields';
import BuildBody from './_children/_buildBody';
// import { bodyElementRules } from './_utils/_bodyElementRules';
import addEventListener from '../../../private/common/hooks/useEventListener';
import handleScrollForNota from '../../../private/LN/nota/dataLayer/handleScrollForNota';
// import { buildBanners } from './_children/_buildBanners';
import { setStorageConfiguration } from '../../../private/common/utils/storage';

const body = props => {
    const { outputType, globalContent = {} } = props;
    const banners = groupBannerConfig(props);
    const {
        _id,
        headlines: { basic: tituloNota },
        content_elements: contentElements,
        subtype: globalSubType
    } = globalContent || {};

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        try {
            setStorageConfiguration(_id);
        } catch (e) {
            // eslint-disable-next-line no-console
            console.error('Error en setear Local Storage, CuerpoDefault', {
                error: e,
                outputType,
                IdNota: _id
            });
        }
    }, [_id, outputType]);

    if (typeof window !== 'undefined') {
        addEventListener('scroll', handleScrollForNota, window);
    }

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
            ======== hola soy el cuerpo outputType Default ===========
            {/* <Cuerpo {...properties} /> */}
            {renderComponents}
            ++++++++ hola soy el fin del cuerpo +++++++++++++++
        </>
    );
};

body.label = 'LN-Nota-Body';

body.lazy = true;

body.propTypes = {
    // eslint-disable-next-line react/no-unused-prop-types
    customFields: PropTypes.shape(buildBodyCustomFields()),
    outputType: PropTypes.string,
    globalContent: PropTypes.shape({
        subtype: PropTypes.string,
        content_elements: PropTypes.arrayOf(PropTypes.shape())
    })
};

export default Consumer(body);
