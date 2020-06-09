/* eslint-disable react/no-danger */

import React from 'react';
import PropTypes from 'fusion:prop-types';
import '../../../../../resources/dist/css/ln/components/com-embed.css';

const Html = ({ data }) => {
    const { content } = data || { content: null };
    if (!content) return null;
    return (
        <div
            className="com-embed --html"
            dangerouslySetInnerHTML={{ __html: content }}
        />
    );
};

Html.arcType = 'raw_html';

Html.propTypes = {
    data: PropTypes.shape({
        content: PropTypes.string
    }).isRequired
};

export default Html;
