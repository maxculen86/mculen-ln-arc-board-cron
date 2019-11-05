import React from 'react';
import PropTypes from 'fusion:prop-types';

const snippetRender = ({ data }) => {
    const stringData = JSON.stringify(data, null, 2);
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: stringData }}
        />
    );
};

snippetRender.propTypes = {
    data: PropTypes.shape({
        '@context': PropTypes.string,
        '@type': PropTypes.string
    }).isRequired
};

export default snippetRender;
