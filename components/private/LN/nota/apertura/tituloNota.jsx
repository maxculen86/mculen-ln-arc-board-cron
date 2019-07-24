import React from 'react';
//import './index.css'

const TituloNota = props => {
    const { titulo } = props;
    return <h1 className="titleSpecial">{titulo}</h1>;
};

export default TituloNota;
