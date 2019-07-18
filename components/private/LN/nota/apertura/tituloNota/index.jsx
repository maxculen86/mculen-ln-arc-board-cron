import React from 'react';
//import './index.css'

export const TituloNota = props => {
    //console.log(props);
    const {
        globalContent: {
            headlines: { basic }
        }
    } = props;
    return <h1 className="titleSpecial">{basic}</h1>;
};

export default TituloNota;
