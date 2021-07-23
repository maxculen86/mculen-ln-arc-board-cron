import React from 'react';
import Consumer from 'fusion:consumer';
import Static from 'fusion:static';

import AuthorAndDate from '../../private/LN/nota/author/authorAndDate';

const authorAndDate = props => {
    const { id: featureId } = props;
    return (
        <Static id={featureId}>
            <AuthorAndDate {...props} authorDate />
        </Static>
    );
};

authorAndDate.label = 'LN-Nota-AutorYFecha';

authorAndDate.lazy = ['default', 'amp'];

export default Consumer(authorAndDate);
