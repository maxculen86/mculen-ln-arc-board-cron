import React from 'react';
import '../../../../../resources/dist/css/ln/components/com-embed.css';
import { addPropertyLoading, getModifier, trim } from './helper';

const RawHTML = ({
    data: {
        raw_oembed: { html = '' },
        subtype
    }
}) => {
    const modifier = subtype ? getModifier(subtype) : '';

    return (
        <div
            className={trim(`com-embed mx-auto ${modifier}`)}
            dangerouslySetInnerHTML={addPropertyLoading({
                subtype,
                tagHtml: html
            })}
        />
    );
};

export default RawHTML;
