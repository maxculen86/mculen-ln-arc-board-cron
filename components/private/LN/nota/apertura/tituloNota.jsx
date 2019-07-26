import React from 'react';
import PropTypes from 'fusion:prop-types';

const TituloNota = ({
    globalContent: {
        headlines: { basic }
    }
}) => {
    const tituloNota = basic || null;
    return <h1 className="com-title-nota hlp-marginBottom-40">{tituloNota}</h1>;
};

TituloNota.propTypes = {
    globalContent: PropTypes.shape({
        headlines: PropTypes.shape({
            basic: PropTypes.string.isRequired
        }).isRequired
    }).isRequired
};

export default TituloNota;
