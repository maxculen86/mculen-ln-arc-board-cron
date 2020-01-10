// TODO: unificar aperturas decidiendo cual agarrar segun subtype

import React from 'react';
import Consumer from 'fusion:consumer';
import Static from 'fusion:static';
import AperturaNoticia from '../../private/LN/nota/apertura/aperturaNoticia';

const aperturaNoticia = ({ id: featureId, globalContent }) => {
    return (
        <Static id={featureId}>
            <AperturaNoticia basic={globalContent.promo_items.basic} />
        </Static>
    );
};

aperturaNoticia.label = 'LN-Nota-AperturaNoticia';

export default Consumer(aperturaNoticia);
