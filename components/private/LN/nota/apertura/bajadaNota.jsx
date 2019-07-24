import React from 'react';
//import './index.css'

const BajadaNota = props => {
    const {
        globalContent: {
            subheadlines: { basic }
        }
    } = props;
    return <h1 className="BajadaSpecial">{basic}</h1>;
};

export default BajadaNota;
