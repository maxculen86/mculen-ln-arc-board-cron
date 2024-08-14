import React from 'react';
import Consumer from 'fusion:consumer';
import Static from 'fusion:static';
import AuthorAndDate from '../../private/LN/nota/author/authorAndDate';

const authorNota = props => {
    return (
        <Static id="LN-autor-nota" htmlOnly>
            <AuthorAndDate {...props} author />
        </Static>
    );
};

authorNota.label = 'LN-Nota-AutorNota';

export default Consumer(authorNota);
