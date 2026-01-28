/* eslint-disable react/no-danger */
import React from 'react';
import HtmlPym from '../../../../private/LN/nota/cuerpo/htmlPym';
import hasIframeWithPYM from '../../../LN/common/utils/hasIframeWithPYM';
import '../../../../../resources/dist/css/ln/components/com-embed.css';

function Html({ data }) {
    const { content, _id: idMedia } = data || {};

    if (!content) return null;

    return hasIframeWithPYM(content) ? (
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
}

export default Html;
