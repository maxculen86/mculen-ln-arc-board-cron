import React from 'react';
import HtmlPym from '../../../../private/LN/nota/cuerpo/htmlPym';
import hasIframeWithPYM from '../utils/hasIframeWithPYM';

function RawHtml(props) {
    const { data = {} } = props;
    const { content, _id: idMedia } = data;

    if (!content) return null;

    if (hasIframeWithPYM(content)) {
        return <HtmlPym data={data} />;
    }

    return (
        <div
            id={`anexo-${idMedia}`}
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: content }}
        />
    );
}

RawHtml.arcType = 'raw_html';
RawHtml.outputType = 'default';

export default RawHtml;
