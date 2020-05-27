/* React */
import React from 'react';
import PropTypes from 'fusion:prop-types';

const trim = (text = '') => {
    return text.replace(/\s\s+/g, ' ').trim();
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

const RawHTML = ({ data }) => {
    const {
        classes = '',
        raw_oembed: { html = '' },
        subtype
    } = data;
    const modifier = getModifier(subtype);
    return (
        <div
            className={trim(`com-embed ${modifier} ${classes}`)}
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
