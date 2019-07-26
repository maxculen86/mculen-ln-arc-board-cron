import React from 'react';
import PropTypes from 'fusion:prop-types';

const TituloNota = props => {
    const {
        titulo: { basic }
    } = props;
    const tituloNota = basic || null;
    return <h1 className="titleSpecial">{tituloNota}</h1>;
};

TituloNota.propTypes = {
    titulo: PropTypes.shape({
        basic: PropTypes.string.isRequired
    }).isRequired
};

export default TituloNota;
