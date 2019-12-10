// TODO: unificar aperturas decidiendo cual agarrar segun subtype

import React from 'react';
import Static from 'fusion:static';
import Imagen from '../../private/LN/nota/cuerpo/image';

export default function aperturaNoticia(props) {
    const { id: featureId } = props;
    return (
        <Static id={featureId}>
            <Imagen />
        </Static>
    );
}
