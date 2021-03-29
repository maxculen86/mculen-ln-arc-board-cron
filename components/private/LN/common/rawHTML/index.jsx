/* React */
import React from 'react';
import PropTypes from 'fusion:prop-types';
import '../../../../../resources/dist/css/ln/components/com-embed.css';

const trim = string => {
    return string.replace(/\s{2,}/g, ' ');
};

const getModifier = subtype => {
    switch (subtype) {
        case 'facebook-post':
        case 'facebook-video':
            return '--facebook';
        default:
            return `--${subtype}`;
    }
};

const RawHTML = ({
    data: {
        classes = '',
        raw_oembed: { html = '' },
        subtype
    }
}) => {
    const modifier = subtype ? getModifier(subtype) : '';

    return (
        <div
            className={trim(`com-embed ${classes} ${modifier}`)}
            dangerouslySetInnerHTML={{ __html: html }}
        />
    );
};

RawHTML.arcType = 'oembed_response';
RawHTML.outputType = 'default';
RawHTML.propTypes = {
    data: PropTypes.shape({
        raw_oembed: PropTypes.string,
        classes: PropTypes.string,
        subtype: PropTypes.string
    }).isRequired
};

export default RawHTML;
