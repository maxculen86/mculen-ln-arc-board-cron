import React from 'react';
import Consumer from 'fusion:consumer';
import AuthorAndDate from '../../private/LN/nota/author/authorAndDate';
import StaticContent from '../../private/common/staticContent';

const authorAndDate = props => {
    return (
        <StaticContent>
            <AuthorAndDate {...props} authorDate />
        </StaticContent>
    );
};

authorAndDate.label = 'LN-Nota-AutorYFecha';

export default Consumer(authorAndDate);
