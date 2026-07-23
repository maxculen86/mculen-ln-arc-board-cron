import React from 'react';
import '../../../../../resources/dist/css/foodit/components/com-embed.css';
import { addPropertyLoading, getModifier, trim } from './helper';

function RawHTML({
    data: {
        raw_oembed: { html = '' },
        subtype
    }
}) {
    const modifier = subtype ? getModifier(subtype) : '';

    return (
        <div
            className={trim(`com-embed flex jc-center ${modifier}`)}
            dangerouslySetInnerHTML={addPropertyLoading({
                subtype,
                tagHtml: html
            })}
        />
    );
}

export default RawHTML;
