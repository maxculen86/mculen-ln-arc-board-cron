// TODO: unificar aperturas decidiendo cual agarrar segun subtype
import React from 'react';
import Consumer from 'fusion:consumer';
import AperturaNoticia from '../../private/LN/nota/apertura/aperturaNoticia';

const aperturaNoticia = props => {
    const { globalContent, outputType } = props;
    const {
        promo_items: promoItems = {},
        headlines: { basic: tituloNota },
        content_elements: contentElements
    } = globalContent;
    const { basic } = promoItems;
    const firstText = contentElements.find(element => element.type === 'text');

    return (
        JSON.stringify(promoItems) !== JSON.stringify({}) && (
            <AperturaNoticia
                tituloNota={tituloNota}
                primerParrafo={firstText}
                basic={basic}
                outputType={outputType}
            />
        )
    );
};

aperturaNoticia.label = 'LN-Nota-AperturaNoticia';

export default Consumer(aperturaNoticia);
