import React from 'react';
//import './index.css'

const PorcionesTiempoNota = props => {
    const {
        globalContent: {
            headlines: { basic }
        }
    } = props;
    return <h1 className="titleSpecial">{basic}</h1>;
};

export default PorcionesTiempoNota;
