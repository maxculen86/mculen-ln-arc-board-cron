import React from 'react';
import Consumer from 'fusion:consumer';
import PropTypes from 'fusion:prop-types';
import useNotaSegment from '../../private/LN/common/hooks/useNotaSegment';
import WebComponentRenderer from '../../private/common/webComponentRenderer';
import WarningMessage from '../../private/common/warningMessage/warningMessage';
import {
    BOX_LOCATIONS,
    ENCUESTA_COMPONENT_NAME,
    ENCUESTA_HOME_EXPERIMENT_NAME,
    ENCUESTA_SCRIPT_ID,
    ENCUESTA_SCRIPT_URL,
    SEGMENTATION_GROUP
} from './constants';
import { hasSingleEncuestaPostId, shouldRenderEncuesta } from './helpers';
import useEncuestaRenderState from './hooks/useEncuestaRenderState';
import useEncuestaViewportTracking from './hooks/useEncuestaViewportTracking';

function CajaEncuesta({ customFields = {}, renderables = [], isAdmin }) {
    const {
        testDigits = [],
        controlDigits = [],
        boxLocation = BOX_LOCATIONS.CAJA_1,
        encuestaPostId = 0,
        isHidden = false
    } = customFields;

    if (isHidden) return null;

    const { segment, ready } = useNotaSegment({
        experimentName: ENCUESTA_HOME_EXPERIMENT_NAME,
        testDigits,
        controlDigits,
        syncStorage: false
    });
    if (
        !hasSingleEncuestaPostId({
            renderables,
            encuestaPostId,
            boxLocation
        }) &&
        isAdmin
    )
        return (
            <WarningMessage
                type="warning"
                message="El ID de encuesta no coincide con el definido en la otra instancia del feature"
            />
        );

    const { targetBoxLocation } = useEncuestaRenderState({ encuestaPostId });

    const shouldRender = shouldRenderEncuesta({
        ready,
        segment,
        boxLocation,
        targetBoxLocation,
        encuestaPostId
    });
    const wrapperRef = useEncuestaViewportTracking({
        boxLocation,
        segment,
        shouldRender,
        encuestaPostId
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
                attributes={{ 'post-id': encuestaPostId }}
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
        isHidden: PropTypes.boolean.tag({
            name: 'Ocultar Caja',
            description: 'Marque para ocultar la caja',
            defaultValue: false
        }),
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
        }),
        encuestaPostId: PropTypes.number.tag({
            label: 'ID de Post',
            defaultValue: 0,
            group: SEGMENTATION_GROUP
        })
    })
};

export default Consumer(CajaEncuesta);
