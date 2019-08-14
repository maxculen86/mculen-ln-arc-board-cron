import React from 'react';
import withNewsLetterData from '../hocs/withNewsLetterData';
import NewsLetterComponent from './newsLetterComponent';

const newLetter = props => {
    console.log('NewsLetter Json ::::: ', props);
    const {
        service: { titulo, servicioId, suscripto },
        logueado,
        subscriptionsCallBack
    } = props;
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
