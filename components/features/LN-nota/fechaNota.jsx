import React from 'react';
import Consumer from 'fusion:consumer';
import Static from 'fusion:static';

import AuthorAndDate from '../../private/LN/nota/author/authorAndDate';

const dateNota = props => {
    const { id: featureId } = props;
    return (
        <Static id={featureId}>
            <AuthorAndDate {...props} date />
        </Static>
    );
};

dateNota.label = 'LN-Nota-FechaNota';

dateNota.lazy = ['default', 'amp'];

export default Consumer(dateNota);
