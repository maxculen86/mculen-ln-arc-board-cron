import React from 'react';
import PropTypes from 'fusion:prop-types';
import Media from '../../common/media';

// TODO: name destacadoEnApertura
const destacado = props => {
    const {
        globalContent: {
            imageResizePresets,
            promo_items: { basic }
        }
    } = props;

    if (basic) {
        return (
            <Media
                mediaItem={basic}
                imageResizePresets={imageResizePresets}
                colNumber={8}
            />
        );
    }
    return null;
};

destacado.propTypes = {
    globalContent: PropTypes.shape({
        imageResizePresets: PropTypes.object,
        promo_items: PropTypes.shape({
            basic: PropTypes.object
        })
    }).isRequired
};

export default destacado;
