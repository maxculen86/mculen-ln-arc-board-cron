import React from 'react';
import PropTypes from 'fusion:prop-types';
//import './index.css'

const BajadaNota = props => {
    const { subheadlines } = props;
    return <h1 className="BajadaSpecial">{subheadlines}</h1>;
};

BajadaNota.propTypes = {
    subheadlines: PropTypes.string
};

export default BajadaNota;
