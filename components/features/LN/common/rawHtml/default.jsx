import React from 'react';
import HtmlPym from '../../../../private/LN/nota/cuerpo/htmlPym';
import hasIframeWithPYM from '../utils/hasIframeWithPYM';
import { WrapperBody } from '../wrapperBody/default';

function RawHtml(props) {
    const { data = {} } = props;
    const { content, _id: idMedia } = data;

    if (!content) return null;

    if (hasIframeWithPYM(content)) {
        return (
            <WrapperBody>
                <HtmlPym data={data} />
            </WrapperBody>
        );
    }

    return (
        <WrapperBody>
            <div
                id={`anexo-${idMedia}`}
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{ __html: content }}
            />
        </WrapperBody>
    );
}

RawHtml.arcType = 'raw_html';
RawHtml.outputType = 'default';

export default RawHtml;
