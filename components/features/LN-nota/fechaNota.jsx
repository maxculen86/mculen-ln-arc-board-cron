import React from 'react';
import Consumer from 'fusion:consumer';
import AuthorAndDate from '../../private/LN/nota/author/authorAndDate';
import StaticContent from '../../private/common/staticContent';

// TODO agregar Unit test

const dateNota = props => {
    return (
        <StaticContent>
            <AuthorAndDate {...props} date />
        </StaticContent>
    );
};

dateNota.label = 'LN-Nota-FechaNota';

export default Consumer(dateNota);
