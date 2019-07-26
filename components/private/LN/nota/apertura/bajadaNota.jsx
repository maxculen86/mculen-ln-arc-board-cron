import React from 'react';
import PropTypes from 'fusion:prop-types';

const BajadaNota = props => {
    const {
        subheadlines: { basic }
    } = props;
    return <h1 className="BajadaSpecial">{basic}</h1>;
};

BajadaNota.propTypes = {
    subheadlines: PropTypes.shape({
        basic: PropTypes.string.isRequired
    }).isRequired
};

export default BajadaNota;
