import React from 'react';
import withNewsLetterData from '../hocs/withNewsLetterData';
import NewsLetterComponent from './newsLetterComponent';

// TODO: debe utilizar consumer. Pensar como hacer para que sea reutilizable por otra secciones donde primarySecion no exista.
// Otro container por encima que resuelva eso o una logica.
const newLetter = props => {
    const {
        service: { titulo, servicioId, suscripto },
        logueado,
        subscriptionsCallBack
    } = props;
    console.log('props :::::', props);
    return (
        <>
            <NewsLetterComponent
                logueado={logueado}
                titulo={titulo}
                subscriptionsCallBack={subscriptionsCallBack}
            />
        </>
    );
};

export default withNewsLetterData(newLetter);
