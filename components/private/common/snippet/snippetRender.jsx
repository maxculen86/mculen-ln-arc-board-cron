/* eslint-disable react/no-danger */
/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'fusion:prop-types';

const snippetRender = ({ data = {}, id = null }) => {
    const stringData = JSON.stringify(data, null, 2);

    return (
        <script
            id={id}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: stringData }}
        />
    );
};

snippetRender.propTypes = {
    data: PropTypes.shape({
        '@context': PropTypes.string,
        '@type': PropTypes.string
    }),
    id: PropTypes.string
};

export default snippetRender;
