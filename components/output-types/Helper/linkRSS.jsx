import React from 'react';
import { SITE_LANACION } from 'fusion:environment';
import get from '../../private/common/utils/get';

function LinkRSS({ globalContent, _nodeType }) {
    const sectionId = get(globalContent, 'taxonomy.primary_section._id', '');

    if (!sectionId || _nodeType !== 'nota') {
        return null;
    }
    return (
        <link
            rel="alternate"
            type="application/rss+xml"
            href={`${SITE_LANACION}/arc/outboundfeeds/rss/category${sectionId}/`}
        />
    );
}

export default LinkRSS;
