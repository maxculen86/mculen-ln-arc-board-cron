/* eslint-disable react/require-default-props */
/* eslint-disable react/no-danger             */

import React, { useRef } from 'react';
import PropTypes from 'fusion:prop-types';
import '../../../../../resources/dist/css/ln/components/com-embed.css';

const Html = props => {
    const { data } = props;
    const { content } = data || { content: null };
    const parser = useRef();

    if (!parser.current) {
        parser.current = new DOMParser();
    }

    if (!content) return null;
    return (
        <div
            className="com-embed --html"
            dangerouslySetInnerHTML={{
                __html: parser.current.parseFromString(content, 'text/html')
                    .documentElement.innerHTML
            }}
        />
    );
};

Html.arcType = 'raw_html';

Html.propTypes = {
    data: PropTypes.shape({
        content: PropTypes.string
    })
};

export default Html;
