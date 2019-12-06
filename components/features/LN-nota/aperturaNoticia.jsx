// TODO: unificar aperturas decidiendo cual agarrar segun subtype

import React from 'react';
import Static from 'fusion:static';
import Imagen from '../../private/LN/nota/cuerpo/image';

export default function aperturaNoticia() {
    return (
        <Static id="apertura-noticia">
            <Imagen />
        </Static>
    );
}
