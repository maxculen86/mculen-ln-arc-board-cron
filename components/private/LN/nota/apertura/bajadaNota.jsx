import React from 'react';
import PropTypes from 'fusion:prop-types';

const BajadaNota = props => {
    const {
        globalContent: {
            subheadlines: { basic }
        }
    } = props;

    const subtitulo = basic || null;
    return <h1 className="BajadaSpecial">{subtitulo}</h1>;
};

BajadaNota.propTypes = {
    globalContent: PropTypes.shape({
        subheadlines: PropTypes.shape({
            basic: PropTypes.string.isRequired
        }).isRequired
    }).isRequired
};

export default BajadaNota;
