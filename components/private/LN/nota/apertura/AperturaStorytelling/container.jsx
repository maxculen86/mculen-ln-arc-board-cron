/* eslint-disable react/require-default-props */
import React from 'react';
import Context from 'fusion:context';
import {
    FOTOAL100,
    STORYTELLING
} from '../../../../common/utils/subtypes/subtypeHelper';
import AperturaComponent from './component';

// TODO: Evaluar si es posible unificar esta apertura con el resto de aperturas.

function AperturaStorytelling(props) {
    const { globalContent } = props || {};
    const { subtype } = globalContent;

    if (subtype === STORYTELLING || subtype === FOTOAL100)
        return <AperturaComponent {...props} />;
    return null;
}

export default Context(AperturaStorytelling);
