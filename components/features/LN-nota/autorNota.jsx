import React from 'react';
import Consumer from 'fusion:consumer';
import AuthorAndDate from '../../private/LN/nota/author/authorAndDate';
import StaticContent from '../../private/common/staticContent';

// TODO hacer unit test

const authorNota = props => {
    return (
        <StaticContent>
            <AuthorAndDate {...props} author />
        </StaticContent>
    );
};

authorNota.label = 'LN-Nota-AutorNota';

export default Consumer(authorNota);
