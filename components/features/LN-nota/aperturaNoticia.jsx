// TODO: unificar aperturas decidiendo cual agarrar segun subtype
import React from 'react';
import Consumer from 'fusion:consumer';
import AperturaNoticia from '../../private/LN/nota/apertura/aperturaNoticia';

const aperturaNoticia = ({ id: featureId, globalContent = {} }) => {
    const { promo_items: promoItems = {} } = globalContent;
    const { basic } = promoItems;

    return promoItems && <AperturaNoticia basic={basic} />;
};

aperturaNoticia.label = 'LN-Nota-AperturaNoticia';

export default Consumer(aperturaNoticia);
