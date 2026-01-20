import React from 'react';
import PropTypes from 'fusion:prop-types';
import Consumer from 'fusion:consumer';
import ItemCarrusel from '../itemCarrusel/default';

function ItemCarruselVertical(props) {
    return <ItemCarrusel {...props} variant="horizontal" />;
}

ItemCarruselVertical.label = 'LN10 Item Carrusel Horizontal';
ItemCarruselVertical.propTypes = {
    customFields: PropTypes.shape({
        title: PropTypes.string.tag({
            name: 'Título',
            description:
                'Ingrese el texto del título. Máx: 100 caracteres incluyendo volanta.',
            default: ''
        }),
        video: PropTypes.string.tag({
            name: 'Video',
            description: 'Ingrese aquí el ID del video de JW',
            default: ''
        }),
        chapita: PropTypes.string.tag({
            name: 'Chapita',
            description: 'Ingrese aquí el texto de la chapita',
            default: ''
        })
    }).isRequired
};

export default Consumer(ItemCarruselVertical);
