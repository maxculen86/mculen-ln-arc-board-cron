import React from 'react';
import PropTypes from 'fusion:prop-types';
import Media from '../../common/media';

// TODO: name destacadoEnApertura
const destacado = props => {
    const {
        globalContent: {
            promo_items: { basic }
        }
    } = props;
    return <Media mediaData={basic} colNumber={8} />;
};

destacado.propTypes = {
    globalContent: PropTypes.shape({
        promo_items: PropTypes.shape({
            basic: PropTypes.object
        })
    }).isRequired
};

export default destacado;
