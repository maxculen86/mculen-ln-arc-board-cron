/* eslint-disable react/no-danger */
import React from 'react';
import HtmlPym from './htmlPym';
import hasIframeWithPYM from '../../../../features/LN/common/utils/hasIframeWithPYM';
import '../../../../../resources/dist/css/ln/components/com-embed.css';

function Html(props) {
    const { data } = props;
    const { content, _id: idMedia } = data || { content: null };

    if (!content) return null;

    return hasIframeWithPYM(content) ? (
        <HtmlPym data={data} />
    ) : (
        <div
            id={`anexo-${idMedia}`}
            className="com-embed --html container-center-100"
            dangerouslySetInnerHTML={{
                __html: content
            }}
        />
    );
}

Html.arcType = 'raw_html';
Html.outputType = 'default';

export default Html;
