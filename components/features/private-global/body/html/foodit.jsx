/* eslint-disable react/no-danger */
import React from 'react';
import '../../../../../resources/dist/css/ln/components/com-embed.css';
import HtmlPym from '../../../../private/LN/nota/cuerpo/htmlPym';

const hasIframeWithPYM = (domParser, content) => {
    if (!domParser && !domParser.parseFromString) return false;
    return domParser
        .parseFromString(content, 'text/html')
        .querySelectorAll('iframe.pym').length;
};

const Html = ({ data }) => {
    const { content, _id: idMedia } = data || {};
    const domParser = typeof DOMParser === 'function' && new DOMParser();

    if (!content) return null;

    return hasIframeWithPYM(domParser, content) ? (
        <HtmlPym data={data} />
    ) : (
        <div
            id={`anexo-${idMedia}`}
            className="com-embed --html"
            dangerouslySetInnerHTML={{
                __html: content
            }}
        />
    );
};

export default Html;
