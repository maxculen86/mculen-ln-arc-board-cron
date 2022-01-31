import React from 'react';
import PropTypes from 'fusion:prop-types';
import Consumer from 'fusion:consumer';
import StaticValidation from '../../private/common/staticValidation';
import AuthorAndDate from '../../private/LN/nota/author/authorAndDate';

const dateNota = props => {
    const { id: featureId } = props;
    return (
        <StaticValidation id={featureId}>
            <AuthorAndDate {...props} date />
        </StaticValidation>
    );
};

dateNota.propTypes = {
    id: PropTypes.string.isRequired
};

dateNota.label = 'LN-Nota-FechaNota';

export default Consumer(dateNota);
