/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'fusion:prop-types';
import WarningMessage from '../../private/common/warningMessage/warningMessage';
import StaticContent from '../../private/common/staticContent';
import { LAYOUTS } from '../utils/common/_helpers-WebApi';

const { FOCAL_LEFT, FOCAL_CENTER, FOCAL_70, BN_OPENING_4 } = LAYOUTS;

export const setCustomFields = () => {
    const CUSTOM_FIELDS_CONFIG = {
        layout: {
            label: 'Diagramación',
            defaultValue: 'left-focal',
            description: 'Cambiar el diseño de la caja',
            group: 'Ajuste Apertura',
            labels: {
                [FOCAL_LEFT]: 'Focal Izquierdo',
                [FOCAL_CENTER]: 'Focal Central',
                [FOCAL_70]: 'Focal al 70',
                [BN_OPENING_4]: 'Apertura x 4'
            }
        },
        hideCaja: {
            name: 'Ocultar Caja',
            defaultValue: false,
            description: 'Marque para ocultar la caja',
            group: 'Ajuste Apertura',
            hidden: false
        }
    };

    const labelsKeys = Object.keys(CUSTOM_FIELDS_CONFIG.layout.labels);

    return PropTypes.shape({
        layout: PropTypes.oneOf(labelsKeys).tag(CUSTOM_FIELDS_CONFIG.layout),
        hideCaja: PropTypes.boolean.tag(CUSTOM_FIELDS_CONFIG.hideCaja)
    });
};
// TODO: Evaluar usar el setRender que esta en /components/chains/utils/setRender.js
export const setRender = ({
    isAdmin,
    error = {},
    hideBox,
    Component,
    extraOptsDiv
}) => {
    const options = {
        isWarning: isAdmin && error && (
            <WarningMessage type={error.type} message={error.message} />
        ),
        isEmpty: (hideBox || error) && <></>,
        default: isAdmin ? (
            Component
        ) : (
            <StaticContent {...extraOptsDiv}>{Component}</StaticContent>
        )
    };

    return Object.values(options).find(Boolean);
};
