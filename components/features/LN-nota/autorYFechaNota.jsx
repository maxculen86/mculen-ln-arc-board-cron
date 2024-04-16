import React from 'react';
import Consumer from 'fusion:consumer';
import Static from 'fusion:static';
import AuthorAndDate from '../../private/LN/nota/author/authorAndDate';

const authorAndDate = props => {
    return (
        <Static id="LN-autor-fecha-nota" htmlOnly>
            <AuthorAndDate {...props} authorDate />
        </Static>
    );
};

authorAndDate.label = 'LN-Nota-AutorYFecha';

export default Consumer(authorAndDate);
