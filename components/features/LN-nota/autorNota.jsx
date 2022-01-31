import React from 'react';
import Consumer from 'fusion:consumer';
import PropTypes from 'fusion:prop-types';
import StaticValidation from '../../private/common/staticValidation';

import AuthorAndDate from '../../private/LN/nota/author/authorAndDate';

const authorNota = props => {
    const { id: featureId } = props;
    return (
        <StaticValidation id={featureId}>
            <AuthorAndDate {...props} author />
        </StaticValidation>
    );
};

authorNota.propTypes = {
    id: PropTypes.string.isRequired
};

authorNota.label = 'LN-Nota-AutorNota';

export default Consumer(authorNota);
