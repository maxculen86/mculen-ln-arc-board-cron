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

    return (
        <Media
            mediaData={basic}
            imageResizePresets={imageResizePresets}
            colNumber={8}
        />
    );
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
