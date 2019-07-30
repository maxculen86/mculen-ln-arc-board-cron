import React from 'react';
import PropTypes from 'fusion:prop-types';
import ArticleImage from '../articleImage';

const destacado = props => {
    const {
        globalContent: {
            imageResizePresets,
            promo_items: { basic }
        }
    } = props;

    console.log('Destacado: ', basic);
    switch (basic.type) {
        case 'image':
            return (
                <ArticleImage
                    image={basic}
                    imageResizePresets={imageResizePresets}
                    zoom
                />
            );
        case 'video':
            return <p>Soy un videito</p>;
        default:
            return null;
    }
};

export default destacado;
