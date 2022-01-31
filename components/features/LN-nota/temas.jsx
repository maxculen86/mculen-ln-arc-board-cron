/* eslint-disable react/require-default-props */
import React from 'react';
import Consumer from 'fusion:consumer';
import PropTypes from 'fusion:prop-types';
import StaticValidation from '../../private/common/staticValidation';

import Temas from '../../private/LN/nota/apertura/tags';

const temas = props => {
    const {
        globalContent: { taxonomy },
        id: featureId
    } = props;
    const { tags, sections } = taxonomy || {};

    return (
        <StaticValidation id={featureId}>
            <Temas tags={tags} sections={sections} destacado temas />
        </StaticValidation>
    );
};

temas.label = 'LN-Nota-Temas';

temas.propTypes = {
    id: PropTypes.string,
    globalContent: PropTypes.shape({
        taxonomy: PropTypes.shape({
            tags: PropTypes.arrayOf(PropTypes.shape()),
            sections: PropTypes.arrayOf(PropTypes.shape())
        })
    }).isRequired
};

export default Consumer(temas);
