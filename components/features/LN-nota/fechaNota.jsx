import React from 'react';
import Consumer from 'fusion:consumer';
import Static from 'fusion:static';
import AuthorAndDate from '../../private/LN/nota/author/authorAndDate';

// TODO agregar Unit test

const dateNota = props => {
    return (
        <Static id="LN-fecha-nota" htmlOnly>
            <AuthorAndDate {...props} date />
        </Static>
    );
};

dateNota.label = 'LN-Nota-FechaNota';

export default Consumer(dateNota);
