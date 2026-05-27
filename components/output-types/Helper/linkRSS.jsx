import React from 'react';
import { SITE_LANACION } from 'fusion:environment';
import get from '../../private/common/utils/get';

function LinkRSS({ globalContent, _nodeType }) {
    const sectionId = get(globalContent, 'taxonomy.primary_section._id', '');
    const isHome = _nodeType === 'home';
    const isNoteWithSection = _nodeType === 'nota' && sectionId;

    if (!isHome && !isNoteWithSection) {
        return null;
    }

    const href = isHome
        ? `${SITE_LANACION}/arc/outboundfeeds/rss/`
        : `${SITE_LANACION}/arc/outboundfeeds/rss/category${sectionId}/`;

    return <link rel="alternate" type="application/rss+xml" href={href} />;
}

export default LinkRSS;
