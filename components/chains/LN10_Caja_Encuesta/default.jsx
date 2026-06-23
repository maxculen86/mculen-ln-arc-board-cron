import React from 'react';
import Consumer from 'fusion:consumer';
import PropTypes from 'fusion:prop-types';
import useNotaSegment from '../../private/LN/common/hooks/useNotaSegment';
import WebComponentRenderer from '../../private/common/webComponentRenderer';
import {
    BOX_LOCATIONS,
    ENCUESTA_COMPONENT_NAME,
    ENCUESTA_HOME_EXPERIMENT_NAME,
    ENCUESTA_POST_ID,
    ENCUESTA_SCRIPT_ID,
    ENCUESTA_SCRIPT_URL,
    SEGMENTATION_GROUP
} from './constants';
import { shouldRenderEncuesta } from './helpers';
import useEncuestaRenderState from './hooks/useEncuestaRenderState';
import useEncuestaViewportTracking from './hooks/useEncuestaViewportTracking';

function CajaEncuesta({ customFields = {} }) {
    const {
        testDigits = [],
        controlDigits = [],
        boxLocation = BOX_LOCATIONS.CAJA_1
    } = customFields;
    const { segment, ready } = useNotaSegment({
        experimentName: ENCUESTA_HOME_EXPERIMENT_NAME,
        testDigits,
        controlDigits,
        syncStorage: false
    });
    const { targetBoxLocation } = useEncuestaRenderState();

    const shouldRender = shouldRenderEncuesta({
        ready,
        segment,
        boxLocation,
        targetBoxLocation
    });
    const wrapperRef = useEncuestaViewportTracking({
        boxLocation,
        segment,
        shouldRender
    });

    if (!shouldRender) return null;

    return (
        <section
            ref={wrapperRef}
            data-testid="encuesta-wrapper"
            data-component="nd-encuesta-home"
            data-box-location={boxLocation}
            data-skip-impression="true"
        >
            <WebComponentRenderer
                tagName={ENCUESTA_COMPONENT_NAME}
                scriptId={ENCUESTA_SCRIPT_ID}
                scriptUrl={ENCUESTA_SCRIPT_URL}
                attributes={{ 'post-id': ENCUESTA_POST_ID }}
            />
        </section>
    );
}

CajaEncuesta.label = 'LN10-Caja_encuesta';
CajaEncuesta.lazy = false;

CajaEncuesta.defaultProps = {
    customFields: {}
};

CajaEncuesta.propTypes = {
    customFields: PropTypes.shape({
        testDigits: PropTypes.list.tag({
            label: 'Ultimo digito del Client ID - TEST',
            defaultValue: [],
            group: SEGMENTATION_GROUP
        }),
        controlDigits: PropTypes.list.tag({
            label: 'Ultimo digito del Client ID - CONTROL',
            defaultValue: [],
            group: SEGMENTATION_GROUP
        }),
        boxLocation: PropTypes.oneOf(Object.values(BOX_LOCATIONS)).tag({
            label: 'Ubicacion de la caja',
            labels: {
                [BOX_LOCATIONS.CAJA_1]: 'Caja 1',
                [BOX_LOCATIONS.CAJA_2]: 'Caja 2'
            },
            defaultValue: BOX_LOCATIONS.CAJA_1,
            group: SEGMENTATION_GROUP
        })
    })
};

export default Consumer(CajaEncuesta);
