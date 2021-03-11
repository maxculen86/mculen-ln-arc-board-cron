import React from 'react';
import PropTypes from 'fusion:prop-types';
/* import addRelatedImage from "../../LN/common/utils/addRelatedImage" */

const snippetRender = ({ data, id = null }) => {
    const stringData = JSON.stringify(data, null, 2);
    //console.log(data)

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
    }).isRequired,
    id: PropTypes.string
};

export default snippetRender;
