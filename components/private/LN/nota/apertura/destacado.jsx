import React from 'react';
import PropTypes from 'fusion:prop-types';
import Media from '../../common/media';

// TODO: name destacadoEnApertura
const destacado = ({ basic }) => {
    return <Media mediaData={basic} colNumber={8} />;
};

destacado.propTypes = {
    basic: PropTypes.shape({
        subtitle: PropTypes.string,
        type: PropTypes.string,
        url: PropTypes.string,
        _id: PropTypes.string
    })
};

export default destacado;
