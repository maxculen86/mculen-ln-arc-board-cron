// TODO: unificar aperturas decidiendo cual agarrar segun subtype
import React from 'react';
import Consumer from 'fusion:consumer';
import AperturaNoticia from '../../private/LN/nota/apertura/aperturaNoticia';

const aperturaNoticia = props => {
    const { globalContent, outputType } = props;
    const { promo_items: promoItems = {} } = globalContent;
    const { basic } = promoItems;

    return (
        JSON.stringify(promoItems) !== JSON.stringify({}) && (
            <AperturaNoticia basic={basic} outputType={outputType} />
        )
    );
};

aperturaNoticia.label = 'LN-Nota-AperturaNoticia';

export default Consumer(aperturaNoticia);
