/* eslint-disable react/no-danger */
import React from 'react';
import ensureIframeLazyLoading from '../../../../features/LN/common/oEmbed/helpers/ensureIframeLazyLoading';
import '../../../../../resources/dist/css/ln/components/com-embed.css';

const trim = (string = '') => string.replace(/\s{2,}/g, ' ');

const getModifier = subtype => {
    switch (subtype) {
        case 'facebook-post':
        case 'facebook-video':
            return '--facebook';
        default:
            return `--${subtype}`;
    }
};

function OEmbed({
    data: {
        classes = '',
        raw_oembed: { html = '' },
        subtype
    }
}) {
    const modifier = subtype ? getModifier(subtype) : '';

    return (
        <div
            className={trim(
                `com-embed ${classes} ${modifier} container-center-100`
            )}
            dangerouslySetInnerHTML={ensureIframeLazyLoading({
                subtype,
                tagHtml: html
            })}
        />
    );
}

OEmbed.arcType = 'oembed_response';
OEmbed.outputType = 'default';
OEmbed.isStatic = true;

export default OEmbed;
