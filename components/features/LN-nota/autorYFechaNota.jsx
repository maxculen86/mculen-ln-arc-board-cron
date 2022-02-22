import React from 'react';
import Consumer from 'fusion:consumer';
import PropTypes from 'fusion:prop-types';
import StaticValidation from '../../private/common/staticValidation';

import AuthorAndDate from '../../private/LN/nota/author/authorAndDate';

const authorAndDate = props => {
    const { id: featureId } = props;
    return (
        <StaticValidation id={featureId} htmlOnly persistent>
            <AuthorAndDate {...props} authorDate />
        </StaticValidation>
    );
};

authorAndDate.propTypes = {
    id: PropTypes.string.isRequired
};

authorAndDate.label = 'LN-Nota-AutorYFecha';

export default Consumer(authorAndDate);
