import React, { Fragment } from 'react';
import Consumer from 'fusion:consumer';

const tituloNota = props => {
    const {
        globalContent: {
            headlines: { basic }
        }
    } = props;

    return (
        <Fragment>
            <h1 className="titulo">{basic}</h1>
        </Fragment>
    );
};

export default Consumer(tituloNota);
