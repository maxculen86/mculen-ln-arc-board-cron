import React from 'react';
import PropTypes from 'fusion:prop-types';
//import './index.css'

const TituloNota = props => {
    const { titulo } = props;
    return <h1 className="titleSpecial">{titulo}</h1>;
};

TituloNota.propTypes = {
    titulo: PropTypes.string
};

export default TituloNota;
